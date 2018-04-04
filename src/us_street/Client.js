const Lookup = require("./Lookup");
const Request = require("../Request");
const Batch = require("../Batch");
const Errors = require("../errors");
const Candidate = require("./Candidate");
const Promise = require("promise");
const InputData = require("../InputData");

class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(data) {
		const dataIsBatch = data instanceof Batch;
		const dataIsLookup = data instanceof Lookup;

		if(!dataIsLookup && !dataIsBatch) throw new Errors.UndefinedLookupError;

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
		else request.payload = JSON.stringify(generateRequestPayload(batch));

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(response => {
					if (response.error) reject(response.error);

					resolve(assignCandidatesToLookups(batch, response));
				})
				.catch(reject);
		});

		function generateRequestPayload(batch) {
			return batch.lookups.map(lookup => {
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

		function assignCandidatesToLookups(batch, response) {
			response.payload.map(rawCandidate => {
				let candidate = new Candidate(rawCandidate);
				let lookup = batch.getByIndex(candidate.inputIndex);

				lookup.result.push(candidate);
			});

			return batch;
		}
	}
}

module.exports = Client;