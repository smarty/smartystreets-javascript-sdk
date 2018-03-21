class Client {
	constructor(sender) {
		this.sender = sender;
	}

	send(lookup) {
		this.sender.request.parameters = lookup.prefix;
	}
}

module.exports = Client;