import {UndefinedLookupError} from "../Errors.js";
import {buildInputData} from "../util/buildInputData.js";
import {apiToSDKKeyMap} from "../util/apiToSDKKeyMap.js";
import {Result} from "./Result.js";
import { Request } from "../Request.js";

/**
 * This client sends lookups to the Smarty US Extract API, <br>
 *     and attaches the results to the Lookup objects.
 */
export class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(lookup) {
		if (typeof lookup === "undefined") throw new UndefinedLookupError();

		let request = new Request(lookup.text, {"Content-Type": "text/plain; charset=utf-8"});
		request.parameters = buildInputData(lookup, apiToSDKKeyMap.usExtract);

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(response => {
					if (response.error) reject(response.error);

					lookup.result = new Result(response.payload);
					resolve(lookup);
				})
				.catch(reject);
		});
	}
}
