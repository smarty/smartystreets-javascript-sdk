import Lookup from "./Lookup.js";
import Result from "./Result.js";
import Batch from "../Batch.js";
import { UndefinedLookupError } from "../Errors.js";
import sendBatch from "../util/sendBatch.js";
import apiToSDKKeyMap from "../util/apiToSDKKeyMap.js";
import { Sender } from "../types.js";

const keyTranslationFormat = apiToSDKKeyMap.usZipcode;

export default class Client {
	private sender: Sender;

	constructor(sender: Sender) {
		this.sender = sender;
	}

	send(data: Lookup | Batch): Promise<Batch> {
		const dataIsBatch = data instanceof Batch;
		const dataIsLookup = data instanceof Lookup;

		if (!dataIsLookup && !dataIsBatch) throw new UndefinedLookupError();

		let batch: Batch;

		if (dataIsLookup) {
			batch = new Batch();
			batch.add(data);
		} else batch = data;

		return sendBatch(batch, this.sender, Result, keyTranslationFormat);
	}
}
