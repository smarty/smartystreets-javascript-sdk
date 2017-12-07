class Request {
	constructor(payload) {
		this.payload = payload;
		this.headers = {};
		this.parameters = {};
	}
}

module.exports = Request;