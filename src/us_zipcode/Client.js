const Lookup = require("./Lookup");
const Result = require("./Result");
const Batch = require("../Batch");
const UndefinedLookupError = require("../Errors").UndefinedLookupError;
const sendBatch = require("../util/sendBatch");
const keyTranslationFormat = require("../util/apiToSDKKeyMap").usZipcode;

/**
 * This client sends lookups to the SmartyStreets US ZIP Code API, <br>
 *     and attaches the results to the appropriate Lookup objects.
 */
class Client {
	constructor(sender) {
		this.sender = sender;
	}

	/**
	 * Sends up to 100 lookups for validation.
	 * @param data May be a Lookup object, or a Batch which must contain between 1 and 100 Lookup objects
	 * @throws SmartyException
	 */
	send(data) {
		const dataIsBatch = data instanceof Batch;
		const dataIsLookup = data instanceof Lookup;

		if (!dataIsLookup && !dataIsBatch) throw new UndefinedLookupError;

		let batch;

		if (dataIsLookup) {
			batch = new Batch();
			batch.add(data);
		} else batch = data;

		return sendBatch(batch, this.sender, Result, keyTranslationFormat);
	}
}

module.exports = Client;