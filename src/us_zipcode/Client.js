const Request = require("../Request");
const Batch = require("../Batch");
const Lookup = require("./Lookup");
const InputData = require("../InputData");
const Result = require("./Result");
const Errors = require("../errors");
const Promise = require("promise");

class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(data) {
		const dataIsBatch = data instanceof Batch;
		const dataIsLookup = data instanceof Lookup;

		if (!dataIsLookup && !dataIsBatch) throw new Errors.UndefinedLookupError;

		let batch;

		if (dataIsLookup) {
			batch = new Batch();
			batch.add(data);
		} else {
			batch = data;
		}

		if (batch.isEmpty()) throw new Errors.BatchEmptyError;

		let request = new Request();

		if (batch.length() === 1) request.parameters = generateRequestPayload(batch)[0];
		else request.payload = generateRequestPayload(batch);

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(response => {
					if (response.error) reject(response.error);

					resolve(assignResultsToLookups(batch, response));
				})
				.catch(reject);
		});

		function generateRequestPayload(batch) {
			return batch.lookups.map((lookup) => {
				let inputData = new InputData(lookup);

				inputData.add("city", "city");
				inputData.add("state", "state");
				inputData.add("zipcode", "zipCode");

				return inputData.data;
			});
		}

		function assignResultsToLookups(batch, response) {
			response.payload.map(rawResult => {
				let result = new Result(rawResult);
				let lookup = batch.getByIndex(result.inputIndex);

				lookup.result.push(result);
			});

			return batch;
		}
	}
}

module.exports = Client;