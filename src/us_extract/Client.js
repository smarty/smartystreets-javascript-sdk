const Errors = require("../Errors");
const Request = require("../Request");
const Result = require("./Result");
const buildInputData = require("../util/buildInputData");
const keyTranslationFormat = require("../util/apiToSDKKeyMap").usExtract;

/**
 * This client sends lookups to the Smarty US Extract API, <br>
 *     and attaches the results to the Lookup objects.
 */
class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(lookup) {
		if (typeof lookup === "undefined") throw new Errors.UndefinedLookupError();

		let request = new Request(lookup.text, {"Content-Type": "text/plain; charset=utf-8"});
		request.parameters = buildInputData(lookup, keyTranslationFormat);

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(response => {
					if (response.error) reject(response.error);

					lookup.result = new Result(response.payload);
					resolve(lookup);
				})
				.catch(reject);
		});
	}
}

module.exports = Client;