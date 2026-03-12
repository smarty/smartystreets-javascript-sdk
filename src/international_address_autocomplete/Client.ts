import { UndefinedLookupError } from "../Errors.js";
import Request from "../Request.js";
import Suggestion, { RawIntlAutocompleteSuggestion } from "./Suggestion.js";
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

		if (lookup.geolocation) {
			request.parameters["geolocation"] = "on";
		} else {
			delete request.parameters["geolocation"];
		}

		if (lookup.addressId) {
			request.baseUrlParam = lookup.addressId;
		}

		return new Promise((resolve, reject) => {
			this.sender
				.send(request)
				.then((response) => {
					if (response.error) return reject(response.error);

					const payload = response.payload as {
						candidates: RawIntlAutocompleteSuggestion[] | null;
					};
					lookup.result =
						!payload || payload.candidates === null
							? []
							: payload.candidates.map((suggestion) => new Suggestion(suggestion));
					resolve(lookup);
				})
				.catch(reject);
		});
	}
}
