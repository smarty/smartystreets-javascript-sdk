import Candidate from "./Candidate";
import Lookup from "./Lookup";
import Batch from "../Batch";
import { UndefinedLookupError } from "../Errors";
import sendBatch from "../util/sendBatch";
import apiToSDKKeyMap from "../util/apiToSDKKeyMap";
import { Sender } from "../types";

/**
 * This client sends lookups to the Smarty US Street API, <br>
 *     and attaches the results to the appropriate Lookup objects.
 */
export default class Client {
	private sender: Sender;

	constructor(sender: Sender) {
		this.sender = sender;
	}

	/**
	 * Sends up to 100 lookups for validation.
	 * @param data may be a Lookup object, or a Batch which must contain between 1 and 100 Lookup objects
	 * @throws SmartyException
	 */
	send(data?: Lookup | Batch): Promise<Batch> {
		if (typeof data === "undefined") {
			throw new UndefinedLookupError();
		}
		const dataIsBatch = data instanceof Batch;
		const dataIsLookup = data instanceof Lookup;

		if (!dataIsLookup && !dataIsBatch) throw new UndefinedLookupError();

		let batch: Batch;

		if (dataIsLookup) {
			if (data.maxCandidates == null && data.match === "enhanced") {
				data.maxCandidates = 5;
			}
			batch = new Batch();
			batch.add(data);
		} else {
			batch = data;
		}

		// Synchronous empty-batch guard for test expectations
		if (batch.isEmpty()) {
			// BatchEmptyError is thrown inside sendBatch as well, but tests expect sync throw
			// so enforce here before delegating to async flow.
			// eslint-disable-next-line @typescript-eslint/no-throw-literal
			throw new (require("../Errors").BatchEmptyError)();
		}

		return sendBatch(batch, this.sender, Candidate, apiToSDKKeyMap.usStreet);
	}
}
