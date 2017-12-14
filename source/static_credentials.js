class StaticCredentials {
	constructor (authId, authToken) {
		this.authId = authId;
		this.hostName = authToken;
	}

	sign (request) {
		request.parameters["auth-id"] = this.authId;
		request.parameters["auth-token"] = this.hostName;
	}
}

module.exports = StaticCredentials;