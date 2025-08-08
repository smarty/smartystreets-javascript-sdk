import Lookup from "./Lookup";
import Batch from "../Batch";
import { UndefinedLookupError } from "../Errors";
import { Sender } from "../types";
import buildInputData from "../util/buildInputData";
import apiToSDKKeyMap from "../util/apiToSDKKeyMap";
import Suggestion from "./Suggestion";
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
			const params = buildInputData(batch.getByIndex(0) as any, apiToSDKKeyMap.usAutocompletePro);
			// ensure empty fields included
			request.parameters = {
				exclude_states: "",
				include_only_cities: "",
				include_only_states: "",
				include_only_zip_codes: "",
				prefer_cities: "",
				prefer_states: "",
				prefer_zip_codes: "",
				...params,
			} as any;
		} else {
			request.payload = batch.lookups.map((l) =>
				buildInputData(l as any, apiToSDKKeyMap.usAutocompletePro),
			);
		}

		const sent = (this.sender as any).send(request);
		if (sent && typeof sent.then === "function") {
			return sent.then((response: any) => {
				if (response.error) throw response.error;
				const suggestions =
					(response.payload && (response.payload.suggestions ?? response.payload)) || [];
				(batch.getByIndex(0) as any).result = Array.isArray(suggestions)
					? suggestions.map((s: any) => new Suggestion(s))
					: [];
				return batch;
			});
		}
		return Promise.resolve(batch);
	}
}
