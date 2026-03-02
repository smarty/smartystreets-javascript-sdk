import { UndefinedLookupError } from "../Errors.js";
import Request from "../Request.js";
import Suggestion from "./Suggestion.js";
import buildInputData from "../util/buildInputData.js";
import apiToSDKKeyMap from "../util/apiToSDKKeyMap.js";
import { Sender } from "../types.js";
import Lookup from "./Lookup.js";

const keyTranslationFormat = apiToSDKKeyMap.internationalAddressAutocomplete;

export default class Client {
	private sender: Sender;

	constructor(sender: Sender) {
		this.sender = sender;
	}

	send(lookup: Lookup): Promise<Lookup> {
		if (typeof lookup === "undefined") throw new UndefinedLookupError();

		const request = new Request();
		request.parameters = buildInputData(lookup, keyTranslationFormat);

		if (lookup.addressId) {
			request.baseUrlParam = lookup.addressId;
		}

		return new Promise((resolve, reject) => {
			this.sender
				.send(request)
				.then((response) => {
					if (response.error) return reject(response.error);

					lookup.result = buildSuggestionsFromResponse(response.payload as any);
					resolve(lookup);
				})
				.catch(reject);
		});

		function buildSuggestionsFromResponse(payload: any): Suggestion[] {
			if (payload && payload.candidates === null) return [];

			return payload.candidates.map(
				(suggestion: Record<string, any>) => new Suggestion(suggestion),
			);
		}
	}
}
