class Request {
	constructor(payload) {
		const version = require("../package.json").version;

		this.payload = payload;
		this.headers = {
			"Content-Type": "application/json",
		};
		if (typeof module !== "undefined" && module.exports) {
			this.headers["User-Agent"] = "smartystreets (sdk:javascript@" + version + ")";
		}

		this.parameters = {};
	}
}

module.exports = Request;