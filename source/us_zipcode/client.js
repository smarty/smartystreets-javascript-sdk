class Client {
	constructor(sender) {
		this.sender = sender;
	}

	sendLookup(lookup) {
		this.sender.send(lookup);
	}
}

module.exports = Client;