const Promise = require("promise");

class SigningSender {
	constructor(innerSender, signer) {
		this.signer = signer;
		this.sender = innerSender;
	}

	send(request) {
		return new Promise((resolve, reject) => {
			this.signer.sign(request);
			this.sender.send(request)
				.then(resolve)
				.catch(reject);
		});
	}
}

module.exports = SigningSender;