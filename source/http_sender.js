class HttpSender {
	constructor (timeout = 10000) {
		this.timeout = timeout;
	}

	buildRequestConfig ({payload, parameters}) {
		let config = {
			method: "GET",
			timeout: this.timeout,
			params: parameters
		};

		if (payload) {
			config.method = "POST";
			config.data = payload;
		}

		return config;
	}
}

module.exports = HttpSender;