const Lookup = require("./Lookup");
const Result = require("./Result");

const Batch = require("../Batch");
const Errors = require("../errors");

const sendBatch = require("../util/sendBatch");

class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(data) {
		const dataIsBatch = data instanceof Batch;
		const dataIsLookup = data instanceof Lookup;

		if (!dataIsLookup && !dataIsBatch) throw new Errors.UndefinedLookupError;

		let batch;

		if (dataIsLookup) {
			batch = new Batch();
			batch.add(data);
		} else batch = data;

		return sendBatch(batch, this.sender, Result);
	}
}

module.exports = Client;