class SharedCredentials {
	constructor (authId, hostName) {
		this.authId = authId;
		this.hostName = hostName;
	}

	sign (request) {
		request.parameters["auth-id"] = this.authId;
		request.headers["Referer"] = this.hostName;
	}
}

module.exports = SharedCredentials;