class Request {
	constructor(payload) {
		this.baseUrl = "";
		this.payload = payload;
		this.headers = {
			"Content-Type": "application/json; charset=utf-8",
			"Accept-Encoding": "gzip",
		};

		this.parameters = {};
	}
}

module.exports = Request;