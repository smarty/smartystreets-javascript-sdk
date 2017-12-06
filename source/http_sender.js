class HttpSender {
	constructor () {}

	buildRequestConfig (request) {
		return {
			// method: "POST",
			// baseURL: "something",
			// params: {},
			data: request.payload,
			// headers: {},
			// timeout: 0
		};
	}
}

module.exports = HttpSender;