import { UndefinedLookupError } from "../Errors.js";
import Request from "../Request.js";
import Result from "./Result.js";
import buildInputData from "../util/buildInputData.js";
import apiToSDKKeyMap from "../util/apiToSDKKeyMap.js";
import { Sender } from "../types.js";
import Lookup from "./Lookup.js";

const keyTranslationFormat = apiToSDKKeyMap.usExtract;

export default class Client {
	private sender: Sender;

	constructor(sender: Sender) {
		this.sender = sender;
	}

	send(lookup: Lookup): Promise<Lookup> {
		if (typeof lookup === "undefined") throw new UndefinedLookupError();

		const request = new Request(lookup.text, { "Content-Type": "text/plain; charset=utf-8" });
		request.parameters = buildInputData(lookup, keyTranslationFormat);

		return new Promise((resolve, reject) => {
			this.sender
				.send(request)
				.then((response) => {
					if (response.error) return reject(response.error);

					lookup.result = new Result(response.payload as any);
					resolve(lookup);
				})
				.catch(reject);
		});
	}
}
