class Client {
	constructor (sender) {
		this.sender = sender;
	}

	sendLookup(lookup) {
		let request = {
			payload: lookup
		};
		this.sender.send(request);
	}
}

module.exports = Client;