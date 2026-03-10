import Request from "../Request.js";
import Response from "./Response.js";
import { RawReverseGeoResult } from "./Result.js";
import buildInputData from "../util/buildInputData.js";
import apiToSDKKeyMap from "../util/apiToSDKKeyMap.js";
import { UndefinedLookupError } from "../Errors.js";
import { Sender, Response as SdkResponse } from "../types.js";
import Lookup from "./Lookup.js";

const keyTranslationFormat = apiToSDKKeyMap.usReverseGeo;

export default class Client {
	private sender: Sender;

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

		function attachLookupResults(response: SdkResponse, lookup: Lookup): Lookup {
			lookup.response = new Response(response.payload as { results: RawReverseGeoResult[] });

			return lookup;
		}
	}
}
