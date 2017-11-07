class Client {
	constructor (sender) {
		this.sender = sender;
	}

	sendLookup(lookup) {
		let request = lookup;
		this.sender.send(request);
	}
}

module.exports = Client;