import Request from "../Request.js";
import { BatchEmptyError } from "../Errors.js";
import buildInputData from "./buildInputData.js";
import Batch from "../Batch.js";
import { Sender, Response } from "../types.js";

export default function sendBatch(
	batch: Batch,
	sender: Sender,
	Result: new (data: any) => { inputIndex: number },
	keyTranslationFormat: Record<string, string> | null,
	customBuildInputData?: (lookup: Record<string, any>) => Record<string, string | number>,
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

	function generateRequestPayload(batch: Batch): Record<string, string | number>[] {
		return batch.lookups.map((lookup) => {
			if (customBuildInputData) {
				return customBuildInputData(lookup as Record<string, any>);
			}
			return buildInputData(lookup as Record<string, any>, keyTranslationFormat!);
		});
	}

	function assignResultsToLookups(batch: Batch, response: Response): Batch {
		(response.payload as Record<string, any>[]).forEach((rawResult: Record<string, any>) => {
			const result = new Result(rawResult);
			const lookup = batch.getByIndex(result.inputIndex);

			lookup.result.push(result);
		});

		return batch;
	}
}
