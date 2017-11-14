const Request = require("../request");
const Batch = require("../batch");

class Client {
	constructor(sender) {
		this.sender = sender;
	}

	sendLookup(lookup) {
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
		let payload = this.generateRequestPayload(batch);
		let request = new Request(JSON.stringify(payload));

		this.sender.send(request);
	}
}

module.exports = Client;