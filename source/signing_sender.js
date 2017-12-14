const Promise = require("promise");

class SigningSender {
	constructor (signer, innerSender) {
		this.signer = signer;
		this.innerSender = innerSender;
	}

	send(request) {
		return new Promise((resolve, reject) => {
			this.signer.sign(request);
			this.innerSender.send(request).then(response => {
				resolve(response);
			}, error => {
				reject(error);
			});
		});
	}
}

module.exports = SigningSender;