class Request {
	constructor(payload) {
		this.baseUrl = "";
		this.payload = payload;
		this.headers = {
			"Content-Type": "application/json",
		};

		this.parameters = {};
	}
}

module.exports = Request;