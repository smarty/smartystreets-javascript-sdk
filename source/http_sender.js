class HttpSender {
	constructor () {}

	buildRequestConfig ({payload, headers}) {
		let config = {};

		if (payload) {
			config.method = "POST";
			config.data = payload;
		} else {
			config.method = "GET";
		}

		return config;
	}
}

module.exports = HttpSender;