const Request = require("../request");
const Batch = require("../batch");
const errors = require("../errors");
const Candidate = require("./candidate");
const Promise = require("promise");
const InputData = require("../input_data");

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

	generateRequestPayload(batch) {
		return batch.lookups.map((lookup) => {
			let inputData = new InputData(lookup);

			inputData.add("street", "street");
			inputData.add("street2", "street2");
			inputData.add("secondary", "secondary");
			inputData.add("city", "city");
			inputData.add("state", "state");
			inputData.add("zipcode", "zipCode");
			inputData.add("lastline", "lastLine");
			inputData.add("addressee", "addressee");
			inputData.add("urbanization", "urbanization");
			inputData.add("match", "match");
			inputData.add("candidates", "maxCandidates");

			return inputData.data;
		});
	}

	sendBatch(batch) {
		if (batch.isEmpty()) {
			throw new errors.BatchEmptyError;
		}

		let request = new Request();

		if (batch.length() === 1) {
			request.parameters = this.generateRequestPayload(batch)[0];
		} else {
			request.payload = JSON.stringify(this.generateRequestPayload(batch));
		}

		return new Promise((resolve, reject) => {
			this.sender.send(request).then(response => {
				resolve(this.assignCandidatesToLookups(batch, response));
			}, error => {
				reject(error);
			});
		});
	}

	assignCandidatesToLookups (batch, response) {
		if (response.error !== undefined) {
			throw response.error;
		}

		response.payload.forEach((rawCandidate) => {
			let candidate = new Candidate(rawCandidate);
			let lookup = batch.getByIndex(candidate.inputIndex);

			lookup.result.push(candidate);
		});
	}
}

module.exports = Client;