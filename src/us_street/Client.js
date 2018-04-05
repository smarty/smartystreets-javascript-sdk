const Lookup = require("./Lookup");
const Batch = require("../Batch");
const Errors = require("../errors");
const Candidate = require("./Candidate");
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
		} else {
			batch = data;
		}

		const keyTranslationFormat = {
			street: "street",
			street2: "street2",
			secondary: "secondary",
			city: "city",
			state: "state",
			zipcode: "zipCode",
			lastline: "lastLine",
			addressee: "addressee",
			urbanization: "urbanization",
			match: "match",
			candidates: "maxCandidates",
		};

		return sendBatch(batch, this.sender, Candidate, keyTranslationFormat);
	}
}

module.exports = Client;