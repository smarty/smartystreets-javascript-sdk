const Request = require("../request");
const InputData = require("../input_data");
const Result = require("./result");
const errors = require("../errors");

class Client {
	constructor(sender) {
		this.sender = sender;
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
			this.sender.send(request).then(response => {
				resolve(this.assignResultsToLookups(batch, response));
			}, error => {
				reject(error);
			});
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

	assignResultsToLookups (batch, response) {
		// if (response.error !== undefined) {
		// 	throw response.error;
		// }
		//
		// response.payload.forEach((rawResult) => {
		// 	let result = new Result(rawResult);
		// 	let lookup = batch.getByIndex(result.inputIndex);
		//
		// 	lookup.result.push(result);
		// });
	}
}

module.exports = Client;