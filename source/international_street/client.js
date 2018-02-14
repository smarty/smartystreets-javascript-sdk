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
	}
}

module.exports = Client;