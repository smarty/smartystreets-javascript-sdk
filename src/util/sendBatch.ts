import Request from "../Request";
import { BatchEmptyError } from "../Errors";
import buildInputData from "./buildInputData";
import { Sender, Response } from "../types";
import Batch, { Lookup } from "../Batch";

export interface Result {
	new (rawResult: any): any;
}

export default async function sendBatch(
	batch: Batch,
	sender: Sender,
	Result: Result,
	keyTranslationFormat: Record<string, string>,
): Promise<Batch> {
	if (batch.isEmpty()) throw new BatchEmptyError();

	const request = new Request();

	if (batch.length() === 1) {
		request.parameters = generateRequestPayload(batch)[0];
	} else {
		request.payload = generateRequestPayload(batch);
	}

	try {
		const response = await sender.send(request);

		if (response.error) throw response.error;

		return assignResultsToLookups(batch, response);
	} catch (error) {
		throw error;
	}

	function generateRequestPayload(batch: Batch): any[] {
		return batch.lookups.map((lookup: Lookup) => {
			return buildInputData(lookup, keyTranslationFormat);
		});
	}

	function assignResultsToLookups(batch: Batch, response: Response): Batch {
		if (response.payload && Array.isArray(response.payload)) {
			response.payload.map((rawResult: any) => {
				const result = new Result(rawResult);
				const lookup = batch.getByIndex(result.inputIndex);

				if (lookup) {
					(lookup as any).result.push(result);
				}
			});
		}

		return batch;
	}
}
