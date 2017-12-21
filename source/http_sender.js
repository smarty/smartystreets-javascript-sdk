const Response = require("./response");
const Axios = require("axios");
const axiosRetry = require("axios-retry");
const Promise = require("promise");

class HttpSender {
	constructor(timeout = 10000, retries = 5, proxyConfig) {
		axiosRetry(Axios, {
			retries: retries,
		});
		this.timeout = timeout;
		this.proxyConfig = proxyConfig;
	}

	buildRequestConfig({payload, parameters, headers, baseUrl}) {
		let config = {
			method: "GET",
			timeout: this.timeout,
			params: Object.assign({}, parameters),
			headers: Object.assign({}, headers),
			baseURL: baseUrl
		};

		if (payload) {
			config.method = "POST";
			config.data = payload;
		}

		if (this.proxyConfig) config.proxy = this.proxyConfig;

		return config;
	}

	buildSmartyResponse(response) {
		return new Response(response.status, response.data);
	}

	send(request) {
		return new Promise((resolve, reject) => {
			let requestConfig = this.buildRequestConfig(request);

			Axios(requestConfig).then(response => {
				resolve(this.buildSmartyResponse(response));
			}, error => {
				reject(this.buildSmartyResponse(error.response));
			});
		});
	}
}

module.exports = HttpSender;