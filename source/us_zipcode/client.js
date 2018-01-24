const Request = require("../request");
const InputData = require("../input_data");
const errors = require("../errors");

class Client {
	constructor(sender) {
		this.sender = sender;
	}

	sendBatch(batch) {
		if (batch.isEmpty()) {
			throw new errors.BatchEmptyError;
		}

	}
}

module.exports = Client;