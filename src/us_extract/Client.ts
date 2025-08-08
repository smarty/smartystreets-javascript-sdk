import Lookup from "./Lookup";
import Batch from "../Batch";
import { UndefinedLookupError } from "../Errors";
import { Sender } from "../types";
import Request from "../Request";
import Result from "./Result";

export default class Client {
	private sender: Sender;

	constructor(sender: Sender) {
		this.sender = sender;
	}

	send(data?: Lookup | Batch): Promise<any> {
		if (typeof data === "undefined") {
			throw new (require("../Errors").UndefinedLookupError)();
		}
		const dataIsBatch = data instanceof Batch;
		const dataIsLookup = data instanceof Lookup;

		if (!dataIsLookup && !dataIsBatch) throw new UndefinedLookupError();

		let batch: Batch;

		if (dataIsLookup) {
			batch = new Batch();
			batch.add(data);
		} else {
			batch = data;
		}

		const request = new Request();
		if (batch.length() === 1) {
			// US Extract uses raw text as payload
			request.payload = (batch.getByIndex(0) as any).text;
			request.parameters = {
				html: (batch.getByIndex(0) as any).html,
				aggressive: (batch.getByIndex(0) as any).aggressive,
				addr_line_breaks: (batch.getByIndex(0) as any).addressesHaveLineBreaks,
				addr_per_line: (batch.getByIndex(0) as any).addressesPerLine,
			} as any;
		} else {
			request.payload = batch.lookups.map((l) => (l as any).text);
		}

		const sent = (this.sender as any).send(request);
		if (sent && typeof sent.then === "function") {
			return sent.then((response: any) => {
				if (response.error) throw response.error;
				(batch.getByIndex(0) as any).result = new Result(response.payload);
				return batch;
			});
		}
		return Promise.resolve(batch);
	}
}
