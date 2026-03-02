import Request from "../Request.js";
import Result from "./Result.js";
import buildInputData from "../util/buildInputData.js";
import apiToSDKKeyMap from "../util/apiToSDKKeyMap.js";
import { UndefinedLookupError } from "../Errors.js";
import { Sender } from "../types.js";
import Lookup from "./Lookup.js";

const keyTranslationFormat = apiToSDKKeyMap.internationalPostalCode;

export default class Client {
	sender: Sender;

	constructor(sender: Sender) {
		this.sender = sender;
	}

	send(lookup: Lookup): Promise<Lookup> {
		if (typeof lookup === "undefined") throw new UndefinedLookupError();

		const request = new Request();
		request.parameters = buildInputData(lookup, keyTranslationFormat);

		return new Promise((resolve, reject) => {
			this.sender
				.send(request)
				.then((response) => {
					if (response.error) return reject(response.error);

					resolve(attachLookupResults(response, lookup));
				})
				.catch(reject);
		});

		function attachLookupResults(response: any, lookup: Lookup): Lookup {
			if (response.payload && Array.isArray(response.payload)) {
				lookup.result = response.payload.map((r: Record<string, any>) => new Result(r));
			} else {
				lookup.result = [];
			}
			return lookup;
		}
	}
}
