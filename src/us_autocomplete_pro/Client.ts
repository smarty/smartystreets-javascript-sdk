import { UndefinedLookupError } from "../Errors.js";
import Request from "../Request.js";
import Suggestion, { RawUsAutocompleteSuggestion } from "./Suggestion.js";
import buildInputData from "../util/buildInputData.js";
import apiToSDKKeyMap from "../util/apiToSDKKeyMap.js";
import { Sender } from "../types.js";
import Lookup from "./Lookup.js";

const keyTranslationFormat = apiToSDKKeyMap.usAutocompletePro;

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

					const payload = response.payload as {
						suggestions: RawUsAutocompleteSuggestion[] | null;
					};
					lookup.result =
						payload.suggestions === null
							? []
							: payload.suggestions.map(
									(suggestion) => new Suggestion(suggestion),
								);
					resolve(lookup);
				})
				.catch(reject);
		});
	}
}
