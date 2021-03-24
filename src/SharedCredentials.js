class SharedCredentials {
	constructor(authId, hostName) {
		this.authId = authId;
		this.hostName = hostName;
	}

	sign(request) {
		request.parameters["key"] = this.authId;
		if (this.hostName) request.headers["Referer"] = "https://" + this.hostName;
	}
}

module.exports = SharedCredentials;