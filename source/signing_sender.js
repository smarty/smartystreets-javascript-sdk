const Promise = require("promise");

class SigningSender {
	constructor(innerSender, signer) {
		this.signer = signer;
		this.sender = innerSender;
	}

	send(request) {
		return new Promise((resolve, reject) => {
			this.signer.sign(request);
			this.sender.send(request).then(response => {
				resolve(response);
			}, error => {
				reject(error);
			});
		});
	}
}

module.exports = SigningSender;