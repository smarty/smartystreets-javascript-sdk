import { SmartyError, UndefinedLookupError } from "../Errors.js";
import Request from "../Request.js";
import buildInputData from "../util/buildInputData.js";
import apiToSDKKeyMap from "../util/apiToSDKKeyMap.js";
import isBlank from "../util/isBlank.js";
import { Sender, Response as IResponse } from "../types.js";
import Lookup from "./Lookup.js";
import EnrichmentLookupBase from "./EnrichmentLookupBase.js";
import { Response, GeoResponse } from "./Response.js";
import SecondaryResponse from "./secondary/SecondaryResponse.js";
import SecondaryCountResponse from "./secondary/SecondaryCountResponse.js";
import SummaryLookup from "./business/SummaryLookup.js";
import SummaryResult from "./business/SummaryResult.js";
import DetailLookup from "./business/DetailLookup.js";
import DetailResult from "./business/DetailResult.js";

const keyTranslationFormat = apiToSDKKeyMap.usEnrichment;

// Core enrichment endpoints return a JSON array containing a single object.
// Unwrap it here so the Response constructors (which expect an object) populate correctly.
function firstOf(payload: Record<string, unknown>): Record<string, unknown> {
	if (Array.isArray(payload)) return (payload[0] ?? {}) as Record<string, unknown>;
	return payload ?? {};
}

export default class Client {
	private sender: Sender;

	constructor(sender: Sender) {
		this.sender = sender;
	}

	sendPrincipal(lookup: Lookup): Promise<Lookup> {
		if (!lookup || isBlank(lookup.smartyKey)) throw new UndefinedLookupError();
		const request = this.buildEnrichmentRequest(lookup, lookup.smartyKey + "/property/principal");
		return this.dispatch(request, lookup, (payload) => {
			lookup.response = new Response(firstOf(payload));
		});
	}

	sendFinancial(lookup: Lookup): Promise<Lookup> {
		if (!lookup || isBlank(lookup.smartyKey)) throw new UndefinedLookupError();
		const request = this.buildEnrichmentRequest(lookup, lookup.smartyKey + "/property/principal");
		// financial_history is returned only when features includes "financial".
		const existing = request.parameters["features"];
		request.parameters["features"] =
			typeof existing === "string" && existing.length > 0 ? `${existing},financial` : "financial";
		return this.dispatch(request, lookup, (payload) => {
			lookup.response = new Response(firstOf(payload));
		});
	}

	sendGeo(lookup: Lookup): Promise<Lookup> {
		if (!lookup || isBlank(lookup.smartyKey)) throw new UndefinedLookupError();
		const request = this.buildEnrichmentRequest(lookup, lookup.smartyKey + "/geo-reference");
		return this.dispatch(request, lookup, (payload) => {
			lookup.response = new GeoResponse(firstOf(payload));
		});
	}

	sendSecondary(lookup: Lookup): Promise<Lookup> {
		if (!lookup || isBlank(lookup.smartyKey)) throw new UndefinedLookupError();
		const request = this.buildEnrichmentRequest(lookup, lookup.smartyKey + "/secondary");
		return this.dispatch(request, lookup, (payload) => {
			lookup.response = new SecondaryResponse(firstOf(payload));
		});
	}

	sendSecondaryCount(lookup: Lookup): Promise<Lookup> {
		if (!lookup || isBlank(lookup.smartyKey)) throw new UndefinedLookupError();
		const request = this.buildEnrichmentRequest(lookup, lookup.smartyKey + "/secondary/count");
		return this.dispatch(request, lookup, (payload) => {
			lookup.response = new SecondaryCountResponse(firstOf(payload));
		});
	}

	sendBusinessSummary(lookup: SummaryLookup): Promise<SummaryLookup> {
		if (!lookup) throw new UndefinedLookupError();
		if (isBlank(lookup.smartyKey) && isBlank(lookup.street) && isBlank(lookup.freeform)) {
			throw new SmartyError(
				"Business.Summary lookup requires one of 'smartyKey', 'street', or 'freeform' to be set",
			);
		}

		const request = new Request();
		if (!isBlank(lookup.smartyKey)) {
			request.baseUrlParam = lookup.smartyKey + "/business";
		} else {
			request.baseUrlParam = "search/business";
			if (!isBlank(lookup.freeform)) request.parameters["freeform"] = lookup.freeform!;
			if (!isBlank(lookup.street)) request.parameters["street"] = lookup.street!;
			if (!isBlank(lookup.city)) request.parameters["city"] = lookup.city!;
			if (!isBlank(lookup.state)) request.parameters["state"] = lookup.state!;
			if (!isBlank(lookup.zipcode)) request.parameters["zipcode"] = lookup.zipcode!;
		}
		this.applyCommonFields(request, lookup);

		return this.dispatch(request, lookup, (payload) => {
			const list = Array.isArray(payload) ? payload : [];
			lookup.results = list.map((item) => new SummaryResult(item as Record<string, unknown>));
		});
	}

	sendBusinessDetail(lookup: DetailLookup): Promise<DetailLookup> {
		if (!lookup || isBlank(lookup.businessId)) {
			throw new SmartyError("Business.Detail lookup requires a non-empty 'businessId'");
		}

		const request = new Request();
		request.baseUrlParam = "business/" + encodeURIComponent(lookup.businessId!);
		this.applyCommonFields(request, lookup);

		return this.dispatch(request, lookup, (payload) => {
			const list = Array.isArray(payload) ? payload : [];
			if (list.length > 1) {
				throw new SmartyError(
					"Business.Detail response contained " + list.length + " results; expected at most 1",
				);
			}
			lookup.result =
				list.length === 0 ? undefined : new DetailResult(list[0] as Record<string, unknown>);
		});
	}

	private applyCommonFields(request: Request, lookup: EnrichmentLookupBase): void {
		if (lookup.include !== undefined) request.parameters["include"] = lookup.include;
		if (lookup.exclude !== undefined) request.parameters["exclude"] = lookup.exclude;
		for (const [k, v] of Object.entries(lookup.customParameters)) {
			request.parameters[k] = v;
		}
		this.applyRequestEtag(request, lookup);
	}

	private buildEnrichmentRequest(lookup: Lookup, baseUrlParam: string): Request {
		const request = new Request();
		request.parameters = buildInputData(lookup, keyTranslationFormat);
		request.baseUrlParam = baseUrlParam;
		this.applyRequestEtag(request, lookup);
		return request;
	}

	private applyRequestEtag(request: Request, lookup: EnrichmentLookupBase): void {
		if (lookup.requestEtag !== undefined) {
			request.headers = { ...request.headers, Etag: lookup.requestEtag };
		}
	}

	private dispatch<L extends EnrichmentLookupBase>(
		request: Request,
		lookup: L,
		onPayload: (payload: Record<string, unknown>) => void,
	): Promise<L> {
		return new Promise((resolve, reject) => {
			this.sender
				.send(request)
				.then((response) => {
					if (response.error) return reject(response.error);
					this.captureResponseEtag(response, lookup);
					onPayload(response.payload as Record<string, unknown>);
					resolve(lookup);
				})
				.catch((err: unknown) => {
					// StatusCodeSender rejects with the Response wrapper (with .error set).
					// Unwrap so consumers can catch SmartyError subclasses like NotModifiedError directly.
					const inner =
						err && typeof err === "object" && "error" in err && (err as { error: unknown }).error;
					reject(inner || err);
				});
		});
	}

	private captureResponseEtag(response: IResponse, lookup: EnrichmentLookupBase): void {
		const headers = response.headers;
		if (!headers) return;
		for (const key of Object.keys(headers)) {
			if (key.toLowerCase() === "etag") {
				lookup.responseEtag = headers[key];
				return;
			}
		}
	}
}
