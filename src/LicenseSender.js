class LicenseSender {
	constructor(innerSender, licenses) {
		this.sender = innerSender;
		this.licenses = licenses;
	}

	send(request) {
		if (this.licenses.length !== 0) {
			request.parameters["license"] = this.licenses.join(",");
		}

		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(resolve)
				.catch(reject);
		});
	}
}

module.exports = LicenseSender;