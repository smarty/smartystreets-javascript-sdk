const Errors = require("../Errors");
const Promise = require("promise");
const Request = require("../Request");
const Result = require("./Result");

/**
 * This client sends lookups to the SmartyStreets US Extract API, <br>
 *     and attaches the results to the Lookup objects.
 */
class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(lookup) {
		if (typeof lookup === "undefined") throw new Errors.UndefinedLookupError();

		let request = new Request(lookup.text);
		request.parameters = buildRequestParams(lookup);

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(response => {
					if (response.error) reject(response.error);

					lookup.result = new Result(response.payload);
					resolve(lookup);
				})
				.catch(reject);
		});

		function buildRequestParams(lookup) {
			return {
				html: lookup.html,
				aggressive: lookup.aggressive,
				addr_line_breaks: lookup.addressesHaveLineBreaks,
				addr_per_line: lookup.addressesPerLine,
			};
		}
	}
}

module.exports = Client;