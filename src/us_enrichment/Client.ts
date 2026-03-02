import { UndefinedLookupError } from "../Errors.js";
import Request from "../Request.js";
import buildInputData from "../util/buildInputData.js";
import apiToSDKKeyMap from "../util/apiToSDKKeyMap.js";
import { Sender } from "../types.js";
import Lookup from "./Lookup.js";

const keyTranslationFormat = apiToSDKKeyMap.usEnrichment;

export default class Client {
	private sender: Sender;

	constructor(sender: Sender) {
		this.sender = sender;
	}

	sendPrincipal(lookup: Lookup): Promise<Lookup> {
		if (typeof lookup === "undefined") throw new UndefinedLookupError();

		const request = new Request();
		request.parameters = buildInputData(lookup, keyTranslationFormat);

		request.baseUrlParam = lookup.smartyKey + "/property/principal";

		return new Promise((resolve, reject) => {
			this.sender
				.send(request)
				.then((response) => {
					if (response.error) return reject(response.error);

					lookup.response = response.payload as Record<string, any>;
					resolve(lookup);
				})
				.catch(reject);
		});
	}

	sendFinancial(lookup: Lookup): Promise<Lookup> {
		if (typeof lookup === "undefined") throw new UndefinedLookupError();

		const request = new Request();
		request.parameters = buildInputData(lookup, keyTranslationFormat);

		request.baseUrlParam = lookup.smartyKey + "/property/financial";

		return new Promise((resolve, reject) => {
			this.sender
				.send(request)
				.then((response) => {
					if (response.error) return reject(response.error);

					lookup.response = response.payload as Record<string, any>;
					resolve(lookup);
				})
				.catch(reject);
		});
	}

	sendGeo(lookup: Lookup): Promise<Lookup> {
		if (typeof lookup === "undefined") throw new UndefinedLookupError();

		const request = new Request();
		request.parameters = buildInputData(lookup, keyTranslationFormat);

		request.baseUrlParam = lookup.smartyKey + "/geo-reference";

		return new Promise((resolve, reject) => {
			this.sender
				.send(request)
				.then((response) => {
					if (response.error) return reject(response.error);

					lookup.response = response.payload as Record<string, any>;
					resolve(lookup);
				})
				.catch(reject);
		});
	}

	sendSecondary(lookup: Lookup): Promise<Lookup> {
		if (typeof lookup === "undefined") throw new UndefinedLookupError();

		const request = new Request();
		request.parameters = buildInputData(lookup, keyTranslationFormat);

		request.baseUrlParam = lookup.smartyKey + "/secondary";

		return new Promise((resolve, reject) => {
			this.sender
				.send(request)
				.then((response) => {
					if (response.error) return reject(response.error);

					lookup.response = response.payload as Record<string, any>;
					resolve(lookup);
				})
				.catch(reject);
		});
	}

	sendSecondaryCount(lookup: Lookup): Promise<Lookup> {
		if (typeof lookup === "undefined") throw new UndefinedLookupError();

		const request = new Request();
		request.parameters = buildInputData(lookup, keyTranslationFormat);

		request.baseUrlParam = lookup.smartyKey + "/secondary/count";

		return new Promise((resolve, reject) => {
			this.sender
				.send(request)
				.then((response) => {
					if (response.error) return reject(response.error);

					lookup.response = response.payload as Record<string, any>;
					resolve(lookup);
				})
				.catch(reject);
		});
	}
}
