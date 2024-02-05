class Request {
	constructor(payload, headers = {"Content-Type": "application/json; charset=utf-8"}) {
		this.baseUrl = "";
		this.baseUrlParam = "";
		this.payload = payload;
		this.headers = headers;

		this.parameters = {};
	}
}

module.exports = Request;