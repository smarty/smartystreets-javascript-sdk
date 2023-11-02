class Request {
	constructor(payload) {
		this.baseUrl = "";
		this.baseUrlParams = "";
		this.payload = payload;
		this.headers = {
			"Content-Type": "application/json; charset=utf-8",
		};

		this.parameters = {};
	}
}

module.exports = Request;