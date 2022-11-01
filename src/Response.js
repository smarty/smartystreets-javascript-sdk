class Response {
	constructor (statusCode, payload, error = undefined, headers = undefined) {
		this.statusCode = statusCode;
		this.payload = payload;
		this.error = error;
		this.headers = headers;
	}
}

module.exports = Response;