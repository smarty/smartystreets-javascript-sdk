const errors = require("../errors");
const Promise = require("promise");
const Request = require("../Request");

class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(lookup) {
		if (typeof lookup === "undefined") throw new errors.UndefinedLookupError();

		let request = new Request(buildRequestPayload(lookup));

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(response => {
					if (response.error) reject(response.error);

				})
				.catch(reject);
		});

		function buildRequestPayload(lookup) {
			return {
				text: lookup.text,
				html: lookup.html,
				aggressive: lookup.aggressive,
				addr_line_breaks: lookup.addressesHaveLineBreaks,
				addr_per_line: lookup.addressesPerLine,
			};
		}
	}
}

module.exports = Client;