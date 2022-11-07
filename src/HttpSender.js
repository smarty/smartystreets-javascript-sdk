const Response = require("./Response");
const Axios = require("axios");
const {buildSmartyResponse} = require("../src/util/buildSmartyResponse");

class HttpSender {
	constructor(timeout = 10000, proxyConfig, debug = false) {
		this.timeout = timeout;
		this.proxyConfig = proxyConfig;
		if (debug) this.enableDebug();
	}

	buildRequestConfig({payload, parameters, headers, baseUrl}) {
		let config = {
			method: "GET",
			timeout: this.timeout,
			params: parameters,
			headers: headers,
			baseURL: baseUrl,
			validateStatus: function (status) {
				return status < 500;
			},
		};

		if (payload) {
			config.method = "POST";
			config.data = payload;
		}

		if (this.proxyConfig) config.proxy = this.proxyConfig;
		return config;
	}

	send(request) {
		return new Promise((resolve, reject) => {
			let requestConfig = this.buildRequestConfig(request);

			Axios(requestConfig)
				.then(response => {
					let smartyResponse = buildSmartyResponse(response);

					if (smartyResponse.statusCode >= 400) reject(smartyResponse);

					resolve(smartyResponse);
				})
				.catch(error => reject(buildSmartyResponse(undefined, error)));
		});
	}

	enableDebug() {
		Axios.interceptors.request.use(request => {
			console.log('Request:\r\n', request);
			console.log('\r\n*******************************************\r\n');
			return request
		});

		Axios.interceptors.response.use(response => {
			console.log('Response:\r\n');
			console.log('Status:', response.status, response.statusText);
			console.log('Headers:', response.headers);
			console.log('Data:', response.data);
			return response
		})
	}
}

module.exports = HttpSender;