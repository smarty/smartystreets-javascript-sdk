class Request {
	constructor(payload) {
		const version = require("../package.json").version;

		this.payload = payload;
		this.headers = {
			"Content-Type": "application/json",
			"User-Agent": "smartystreets (sdk:javascript@" + version + ")"
		};
		this.parameters = {};
	}
}

module.exports = Request;