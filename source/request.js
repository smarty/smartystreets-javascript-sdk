class Request {
	constructor(payload) {
		const version = require("../package.json").version;

		this.payload = payload;
		this.headers = {
			"Content-Type": "application/json",
		};
		//TODO: Find another way to get the build information in to the API on browsers.
		if (typeof module !== "undefined" && module.exports) {
			this.headers["User-Agent"] = "smartystreets (sdk:javascript@" + version + ")";
		}

		this.parameters = {};
	}
}

module.exports = Request;