class Response {
	constructor (statusCode, payload, error) {
		this.statusCode = statusCode;
		this.payload = payload;
		this.error = error;
	}
}

module.exports = Response;