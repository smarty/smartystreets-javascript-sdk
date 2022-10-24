const Axios = require("axios");
const Response = require("./Response.js");

class RetrySender {
	constructor(timeout = 10000, maxRetires = 5) {
		this.timeout = timeout;
		this.maxRetries = maxRetires;
		this.statusToRetry = [408, 429, 500, 502, 503, 504];
		this.statusTooManyRequests = 429;
		this.maxBackoffDuration = 10;
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

	buildSmartyResponse(response, error) {
		if (response) return new Response(response.status, response.data);
		return new Response(undefined, undefined, error)
	}

	rateLimitBackoff(backoffDuration) {
		console.log(`Rate limit reached. Retrying in ${backoffDuration/1000} seconds...`);
		console.log("\x1b[35m%s\x1b[0m", "backoffduration in ratelimit: ", backoffDuration/1000);
		return new Promise(resolve => setTimeout(resolve, backoffDuration));
	}

	backoff(attempt) {
		let backoffDuration = Math.min(attempt,this.maxBackoffDuration);
		console.log(`There was an error processing the request. Retrying in ${backoffDuration} seconds...`);
		console.log("\x1b[36m%s\x1b[0m" ,"backoffduration in backoff: ", backoffDuration);
		return new Promise(resolve => setTimeout(resolve, backoffDuration*1000));
	}

	async retry(response, i) {
		console.log("in retry function. Status: ", response);
		if (!this.statusToRetry.includes(response.status)) {
			console.log("not a retry status");
			return undefined;
		} else if (response.status === this.statusTooManyRequests) {
			console.log("too many requests");
			let secondsToBackoff = 10;
			if (response.headers) {
				console.log("has headers");
				if (response.headers["Retry-After"]) {
					console.log("retry after");
					secondsToBackoff = parseInt(response.headers["Retry-After"]);
				}
			}
			await this.rateLimitBackoff(secondsToBackoff);
		} else {
			console.log("Status not too many. Attempt: ", i);
			await this.backoff(i);
		}
	}

	send(request) {
		console.log("I am in send");
		let requestConfig = this.buildRequestConfig(request);
		Axios(requestConfig).then((response) => {
			for (let i = 0; i < this.maxRetries; i++) {
				const result = this.retry(response, i)
				if (!result) break;
				Axios(requestConfig);
			}
			return response;
		})
	}
}

module.exports = RetrySender;