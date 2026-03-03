import Request from "../Request.js";
import { UndefinedLookupError } from "../Errors.js";
import Candidate, { RawIntlStreetCandidate } from "./Candidate.js";
import buildInputData from "../util/buildInputData.js";
import apiToSDKKeyMap from "../util/apiToSDKKeyMap.js";
import { Sender, Response } from "../types.js";
import Lookup from "./Lookup.js";

const keyTranslationFormat = apiToSDKKeyMap.internationalStreet;

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

					resolve(attachLookupCandidates(response, lookup));
				})
				.catch(reject);
		});

		function attachLookupCandidates(response: Response, lookup: Lookup): Lookup {
			if (response.payload) {
				(response.payload as RawIntlStreetCandidate[]).forEach((rawCandidate) => {
					lookup.result.push(new Candidate(rawCandidate));
				});
			}

			return lookup;
		}
	}
}
