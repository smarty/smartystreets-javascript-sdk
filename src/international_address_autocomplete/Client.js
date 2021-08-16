const Errors = require("../Errors");
const Request = require("../Request");
const Promise = require("promise");

class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(lookup) {
		if (typeof lookup === "undefined") throw new Errors.UndefinedLookupError();

		let request = new Request();
		request.parameters = buildRequestParameters(lookup);

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(response => {
					if (response.error) reject(response.error);

					resolve(lookup);
				})
				.catch(reject);
		})

		function buildRequestParameters(lookup) {
			return {
				country: lookup.country,
				search: lookup.search,
			};
		}
	}
}

module.exports = Client;