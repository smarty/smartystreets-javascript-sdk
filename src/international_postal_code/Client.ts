import Request from "../Request.js";
import Result, { RawIntlPostalCodeResult } from "./Result.js";
import buildInputData from "../util/buildInputData.js";
import apiToSDKKeyMap from "../util/apiToSDKKeyMap.js";
import { UndefinedLookupError } from "../Errors.js";
import { Sender, Response } from "../types.js";
import Lookup from "./Lookup.js";
import { resolveLanguageMode } from "./LanguageMode.js";

const keyTranslationFormat = apiToSDKKeyMap.internationalPostalCode;

export default class Client {
	private sender: Sender;

	constructor(sender: Sender) {
		this.sender = sender;
	}

	send(lookup: Lookup): Promise<Lookup> {
		if (typeof lookup === "undefined") throw new UndefinedLookupError();

		const request = new Request();
		request.parameters = buildInputData(lookup, keyTranslationFormat);

		const resolvedLanguage = resolveLanguageMode(lookup.language);
		if (resolvedLanguage !== undefined) request.parameters["language"] = resolvedLanguage;

		if (!(typeof lookup.maxResults === "number" && lookup.maxResults > 0))
			delete request.parameters["max_results"];

		return new Promise((resolve, reject) => {
			this.sender
				.send(request)
				.then((response) => {
					if (response.error) return reject(response.error);

					resolve(attachLookupResults(response, lookup));
				})
				.catch(reject);
		});

		function attachLookupResults(response: Response, lookup: Lookup): Lookup {
			if (response.payload && Array.isArray(response.payload)) {
				lookup.result = (response.payload as RawIntlPostalCodeResult[]).map((r) => new Result(r));
			} else {
				lookup.result = [];
			}
			return lookup;
		}
	}
}
