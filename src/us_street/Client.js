import {Batch} from "../Batch.js";
import {Lookup} from "./Lookup.js";
import {UndefinedLookupError} from "../Errors.js";
import {sendBatch} from "../util/sendBatch.js";
import {Candidate} from "./Candidate.js";
import {apiToSDKKeyMap} from "../util/apiToSDKKeyMap.js";

/**
 * This client sends lookups to the Smarty US Street API, <br>
 *     and attaches the results to the appropriate Lookup objects.
 */
export class Client {
	constructor(sender) {
		this.sender = sender;
	}

	/**
	 * Sends up to 100 lookups for validation.
	 * @param data may be a Lookup object, or a Batch which must contain between 1 and 100 Lookup objects
	 * @throws SmartyException
	 */
	send(data) {
		const dataIsBatch = data instanceof Batch;
		const dataIsLookup = data instanceof Lookup;

		if (!dataIsLookup && !dataIsBatch) throw new UndefinedLookupError;

		let batch;

		if (dataIsLookup) {
			if (data.maxCandidates == null && data.match === "enhanced")
				data.maxCandidates = 5;
			batch = new Batch();
			batch.add(data);
		} else {
			batch = data;
		}

		return sendBatch(batch, this.sender, Candidate, apiToSDKKeyMap.usStreet);
	}
}
