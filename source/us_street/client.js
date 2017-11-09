const Request = require("../request");

class Client {
	constructor(sender) {
		this.sender = sender;
	}

	sendLookup(lookup) {
		let payload = this.generateRequestPayload(lookup);
		let request = new Request(JSON.stringify(payload));

		this.sender.send(request);
	}

	generateRequestPayload(lookup) {
		let requestPayload = {};

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

		return requestPayload;

		function buildPayloadElement(apiField, lookupField) {
			if (lookupFieldIsPopulated()) {
				requestPayload[apiField] = lookup[lookupField];
			}

			function lookupFieldIsPopulated() {
				return lookup[lookupField] !== "" && lookup[lookupField] !== undefined;
			}
		}
	}
}

module.exports = Client;