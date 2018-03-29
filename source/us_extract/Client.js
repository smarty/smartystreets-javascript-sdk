const errors = require("../errors");

class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(lookup) {
		if (typeof lookup === "undefined") throw new errors.UndefinedLookupError();
	}
}

module.exports = Client;