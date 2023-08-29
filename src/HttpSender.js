const Axios = require("axios");
const {buildSmartyResponse} = require("../src/util/buildSmartyResponse");

class HttpSender {
	constructor(timeout = 10000, proxyConfig, debug = false) {
		this.axiosInstance = Axios.create();
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

			this.logRequestIfDebugIsEnabled(requestConfig);

			try{
				function buildUrl(requestConfig) {
					let queryParams = requestConfig.params;
					let queryString = Object.keys(queryParams)
					.map(function(key) {
						return key + '=' + encodeURIComponent(queryParams[key]);
					})
					.join('&');
	
					return requestConfig.baseURL + '?' + queryString;
				}

				let options = {method: requestConfig.method, contentType: requestConfig.headers.contentType}

				if(requestConfig.data !== undefined){
					options.payload = JSON.stringify(requestConfig.data);
				}
				let r = UrlFetchApp.fetch(buildUrl(requestConfig), options);
				let response = {headers: r.getHeaders(), status: r.getResponseCode()}
				if(response.status === 200){
					let data = JSON.parse(r.getContentText());
					response.data = data;
				} else {
					let data = JSON.parse(r.getContentText());
					response.error = {code: r.getResponseCode(), message: data.message};
				}
				let smartyResponse = buildSmartyResponse(response);

				if (smartyResponse.statusCode >= 400) reject(smartyResponse);

				resolve(smartyResponse)

			} catch (e) {
				reject(buildSmartyResponse(undefined, error))
			}
		});
	}

	enableDebug() {
		this.axiosInstance.interceptors.request.use(request => {
			console.log('Request:\r\n', request);
			console.log('\r\n*******************************************\r\n');
			return request
		});

		this.axiosInstance.interceptors.response.use(response => {
			console.log('Response:\r\n');
			console.log('Status:', response.status, response.statusText);
			console.log('Headers:', response.headers);
			console.log('Data:', response.data);
			return response
		})
	}
}

module.exports = HttpSender;