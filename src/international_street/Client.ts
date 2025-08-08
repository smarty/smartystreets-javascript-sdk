import Lookup from "./Lookup";
import Batch from "../Batch";
import { UndefinedLookupError } from "../Errors";
import { Sender } from "../types";
import buildInputData from "../util/buildInputData";
import apiToSDKKeyMap from "../util/apiToSDKKeyMap";
import Candidate from "./Candidate";
import Request from "../Request";

export default class Client {
	private sender: Sender;

	constructor(sender: Sender) {
		this.sender = sender;
	}

	send(data?: Lookup | Batch): Promise<any> {
		if (typeof data === "undefined") throw new UndefinedLookupError();
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
			request.parameters = buildInputData(
				batch.getByIndex(0) as any,
				apiToSDKKeyMap.internationalStreet,
			);
		} else {
			request.payload = batch.lookups.map((l) =>
				buildInputData(l as any, apiToSDKKeyMap.internationalStreet),
			);
		}

		const sent = (this.sender as any).send(request);
		if (sent && typeof sent.then === "function") {
			return sent.then((response: any) => {
				if (response.error) throw response.error;
				const candidates =
					(response.payload && (response.payload.candidates ?? response.payload)) || [];
				(batch.getByIndex(0) as any).result = Array.isArray(candidates)
					? candidates.map((c: any) => new Candidate(c))
					: [];
				return batch;
			});
		}
		return Promise.resolve(batch);
	}
}
