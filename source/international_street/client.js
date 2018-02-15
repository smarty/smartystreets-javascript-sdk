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

	send(lookup) {
		if (typeof lookup === "undefined") {
			throw new errors.UndefinedLookupError();
		}

		let request = new Request();
		request.parameters = this.generateRequestParameters(lookup);

		return new Promise((resolve, reject) => {
			this.sender.send(request);
			resolve();
		});
	}

	generateRequestParameters(lookup) {
		let inputData = new InputData(lookup);

		inputData.add("country", "country");
		inputData.add("freeform", "freeform");
		inputData.add("address1", "address1");
		inputData.add("address2", "address2");
		inputData.add("address3", "address3");
		inputData.add("address4", "address4");
		inputData.add("organization", "organization");
		inputData.add("locality", "locality");
		inputData.add("administrative_area", "administrativeArea");
		inputData.add("postal_code", "postalCode");
		inputData.add("geocode", "geocode");
		inputData.add("language", "language");

		return inputData.data;
	}
}

module.exports = Client;