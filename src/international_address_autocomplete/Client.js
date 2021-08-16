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
		request.parameters = lookup;

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(response => {
					if (response.error) reject(response.error);

					resolve(response);
				})
				.catch(reject);
		})
	}
}

module.exports = Client;