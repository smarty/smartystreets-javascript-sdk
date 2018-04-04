class SharedCredentials {
	constructor(authId, hostName) {
		this.authId = authId;
		this.hostName = hostName;
	}

	sign(request) {
		request.parameters["auth-id"] = this.authId;
		if (this.hostName) request.headers["Referer"] = this.hostName;
	}
}

module.exports = SharedCredentials;