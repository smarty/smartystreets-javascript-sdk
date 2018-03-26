const Request = require("../request");
const Batch = require("../batch");
const InputData = require("../input_data");
const Result = require("./result");
const errors = require("../errors");
const Promise = require("promise");

class Client {
	constructor(sender) {
		this.sender = sender;
	}

	sendLookup(lookup) {
		if (typeof lookup === "undefined") {
			throw new errors.UndefinedLookupError;
		}

		let batch = new Batch();
		batch.add(lookup);
		return this.sendBatch(batch);
	}

	sendBatch(batch) {
		if (batch.isEmpty()) {
			throw new errors.BatchEmptyError;
		}

		let request = new Request();

		if (batch.length() === 1) {
			request.parameters = this.generateRequestPayload(batch)[0];
		} else {
			request.payload = this.generateRequestPayload(batch);
		}

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(response => {
					if (response.error) reject(response.error);

					resolve(this.assignResultsToLookups(batch, response));
				})
				.catch(reject);
		});
	}

	generateRequestPayload(batch) {
		return batch.lookups.map((lookup) => {
			let inputData = new InputData(lookup);

			inputData.add("city", "city");
			inputData.add("state", "state");
			inputData.add("zipcode", "zipCode");

			return inputData.data;
		});
	}

	assignResultsToLookups(batch, response) {
		response.payload.map(rawResult => {
			let result = new Result(rawResult);
			let lookup = batch.getByIndex(result.inputIndex);

			lookup.result.push(result);
		});

		return batch;
	}
}

module.exports = Client;