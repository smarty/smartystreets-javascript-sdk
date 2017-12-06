class HttpSender {
	constructor (timeout = 10000) {
		this.timeout = timeout;
	}

	buildRequestConfig ({payload, headers}) {
		let config = {
			timeout: this.timeout
		};

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