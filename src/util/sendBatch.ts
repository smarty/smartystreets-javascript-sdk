import Request from "../Request.js";
import { BatchEmptyError } from "../Errors.js";
import buildInputData from "./buildInputData.js";
import Batch from "../Batch.js";
import { Sender } from "../types.js";

export default function sendBatch(
	batch: Batch,
	sender: Sender,
	Result: new (data: Record<string, any>) => any,
	keyTranslationFormat: Record<string, string> | null,
	customBuildInputData?: (lookup: Record<string, any>) => Record<string, any>,
): Promise<Batch> {
	if (batch.isEmpty()) throw new BatchEmptyError();

	const request = new Request();

	if (batch.length() === 1) request.parameters = generateRequestPayload(batch)[0];
	else request.payload = generateRequestPayload(batch);

	return new Promise((resolve, reject) => {
		sender
			.send(request)
			.then((response) => {
				if (response.error) return reject(response.error);

				resolve(assignResultsToLookups(batch, response));
			})
			.catch(reject);
	});

	function generateRequestPayload(batch: Batch): Record<string, any>[] {
		return batch.lookups.map((lookup: Record<string, any>) => {
			if (customBuildInputData) {
				return customBuildInputData(lookup);
			}
			return buildInputData(lookup, keyTranslationFormat!);
		});
	}

	function assignResultsToLookups(batch: Batch, response: any): Batch {
		response.payload.forEach((rawResult: Record<string, any>) => {
			const result = new Result(rawResult);
			const lookup = batch.getByIndex(result.inputIndex);

			lookup.result.push(result);
		});

		return batch;
	}
}
