const Request = require("../request");
const Batch = require("../batch");
const errors = require("../errors");
const Candidate = require("./candidate");

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
		this.sendBatch(batch);
	}

	generateRequestPayload(batch) {
		return batch.lookups.map((lookup) => {
			let payloadReadyLookup = {};

			buildPayloadElement("street", "street");
			buildPayloadElement("street2", "street2");
			buildPayloadElement("secondary", "secondary");
			buildPayloadElement("city", "city");
			buildPayloadElement("state", "state");
			buildPayloadElement("zip_code", "zipCode");
			buildPayloadElement("last_line", "lastLine");
			buildPayloadElement("addressee", "addressee");
			buildPayloadElement("urbanization", "urbanization");
			buildPayloadElement("match", "match");
			buildPayloadElement("candidates", "maxCandidates");
			buildPayloadElement("input_id", "inputId");

			return payloadReadyLookup;

			function buildPayloadElement(apiField, lookupField) {
				if (lookupFieldIsPopulated()) {
					payloadReadyLookup[apiField] = lookup[lookupField];
				}

				function lookupFieldIsPopulated() {
					return lookup[lookupField] !== "" && lookup[lookupField] !== undefined;
				}
			}
		});
	}

	sendBatch(batch) {
		if (batch.isEmpty()) {
			throw new errors.BatchEmptyError;
		}

		let payload = this.generateRequestPayload(batch);
		let request = new Request(JSON.stringify(payload));

		this.sender.send(this.assignCandidatesToLookupsGenerator(batch), request);
	}

	assignCandidatesToLookupsGenerator(batch) {
		return (response) => {
			this.assignCandidatesToLookups(batch, response)
		}
	}

	assignCandidatesToLookups (batch, response) {
		if (response.error) {
			throw response.error;
		}

		JSON.parse(response.payload).forEach((rawCandidate) => {
			let candidate = new Candidate(rawCandidate);
			let lookup = batch.getByIndex(candidate.inputIndex);

			lookup.result.push(candidate);
		});
	}
}

module.exports = Client;