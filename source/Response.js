class Response {
	constructor (statusCode, payload, error = undefined) {
		this.statusCode = statusCode;
		this.payload = payload;
		this.error = error;
	}
}

module.exports = Response;