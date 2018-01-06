class StaticCredentials {
	constructor (authId, authToken) {
		this.authId = authId;
		this.authToken = authToken;
	}

	sign (request) {
		request.parameters["auth-id"] = this.authId;
		request.parameters["auth-token"] = this.authToken;
	}
}

module.exports = StaticCredentials;