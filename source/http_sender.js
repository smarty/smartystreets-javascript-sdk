class HttpSender {
	constructor (timeout = 10000) {
		this.timeout = timeout;
	}

	buildRequestConfig ({payload, headers}) {
		let config = {
			method: "GET",
			timeout: this.timeout
		};

		if (payload) {
			config.method = "POST";
			config.data = payload;
		}

		return config;
	}
}

module.exports = HttpSender;