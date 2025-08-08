import Lookup from "./Lookup";
import Batch from "../Batch";
import { UndefinedLookupError } from "../Errors";
import { Sender } from "../types";
import Request from "../Request";
import { Response, FinancialResponse, GeoResponse } from "./Response";

export default class Client {
	private sender: Sender;

	constructor(sender: Sender) {
		this.sender = sender;
	}

	async send(data: Lookup | Batch): Promise<any> {
		const dataIsBatch = data instanceof Batch;
		const dataIsLookup = data instanceof Lookup;

		if (!dataIsLookup && !dataIsBatch) throw new UndefinedLookupError();

		let batch: Batch;

		if (dataIsLookup) {
			batch = new Batch();
			batch.add(data);
		} else {
			batch = data;
		}

		throw new Error("Use specific sendX methods for US Enrichment");
	}

	private buildRequest(lookup: Lookup): Request {
		const req = new Request();
		req.parameters = {} as any;
		if (lookup.include) (req.parameters as any).include = lookup.include;
		if (lookup.exclude) (req.parameters as any).exclude = lookup.exclude;
		if (lookup.dataset) (req.parameters as any).dataset = lookup.dataset;
		if (lookup.dataSubset) (req.parameters as any).data_subset = lookup.dataSubset;
		return req;
	}

	sendPrincipal(lookup?: Lookup) {
		if (!lookup) throw new (require("../Errors").UndefinedLookupError)();
		const req = this.buildRequest(lookup);
		req.baseUrlParam = `${lookup.smartyKey}/property/principal`;
		const sent = (this.sender as any).send(req);
		if (sent && typeof sent.then === "function") {
			return sent.then((resp: any) => {
				if (resp.error) throw resp.error;
				(lookup as any).response =
					!resp.payload || Object.keys(resp.payload).length === 0 ? {} : new Response(resp.payload);
				return lookup;
			});
		}
		return Promise.resolve(lookup);
	}

	sendFinancial(lookup?: Lookup) {
		if (!lookup) throw new (require("../Errors").UndefinedLookupError)();
		const req = this.buildRequest(lookup);
		req.baseUrlParam = `${lookup.smartyKey}/property/financial`;
		const sent = (this.sender as any).send(req);
		if (sent && typeof sent.then === "function") {
			return sent.then((resp: any) => {
				if (resp.error) throw resp.error;
				(lookup as any).response =
					!resp.payload || Object.keys(resp.payload).length === 0
						? {}
						: new FinancialResponse(resp.payload);
				return lookup;
			});
		}
		return Promise.resolve(lookup);
	}

	sendGeo(lookup?: Lookup) {
		if (!lookup) throw new (require("../Errors").UndefinedLookupError)();
		const req = this.buildRequest(lookup);
		req.baseUrlParam = `${lookup.smartyKey}/geo-reference`;
		const sent = (this.sender as any).send(req);
		if (sent && typeof sent.then === "function") {
			return sent.then((resp: any) => {
				if (resp.error) throw resp.error;
				(lookup as any).response =
					!resp.payload || Object.keys(resp.payload).length === 0
						? {}
						: new GeoResponse(resp.payload);
				return lookup;
			});
		}
		return Promise.resolve(lookup);
	}

	sendSecondary(lookup?: Lookup) {
		if (!lookup) throw new (require("../Errors").UndefinedLookupError)();
		const req = this.buildRequest(lookup);
		req.baseUrlParam = `${lookup.smartyKey}/secondary`;
		const sent = (this.sender as any).send(req);
		if (sent && typeof sent.then === "function") {
			return sent.then((resp: any) => {
				if (resp.error) throw resp.error;
				(lookup as any).response =
					!resp.payload || Object.keys(resp.payload).length === 0 ? {} : new Response(resp.payload);
				return lookup;
			});
		}
		return Promise.resolve(lookup);
	}

	sendSecondaryCount(lookup?: Lookup) {
		if (!lookup) throw new (require("../Errors").UndefinedLookupError)();
		const req = this.buildRequest(lookup);
		req.baseUrlParam = `${lookup.smartyKey}/secondary/count`;
		const sent = (this.sender as any).send(req);
		if (sent && typeof sent.then === "function") {
			return sent.then((resp: any) => {
				if (resp.error) throw resp.error;
				(lookup as any).response =
					!resp.payload || Object.keys(resp.payload).length === 0 ? {} : new Response(resp.payload);
				return lookup;
			});
		}
		return Promise.resolve(lookup);
	}
}
