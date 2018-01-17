const HttpSender = require("./http_sender");
const SigningSender = require("./signing_sender");
const BaseUrlSender = require("./base_url_sender");
const AgentSender = require("./agent_sender");
const StaticCredentials = require("./static_credentials");
const CustomHeaderSender = require("./custom_header_sender");

const UsStreetClient = require("./us_street/client");

const INTERNATIONAL_STREET_API_URI = "https://international-street.api.smartystreets.com/verify";
const US_AUTOCOMPLETE_API_URL = "https://us-autocomplete.api.smartystreets.com/suggest";
const US_EXTRACT_API_URL = "https://us-extract.api.smartystreets.com/";
const US_STREET_API_URL = "https://us-street.api.smartystreets.com/street-address";
const US_ZIP_CODE_API_URL = "https://us-zipcode.api.smartystreets.com/lookup";

class ClientBuilder {
	constructor(signer = new StaticCredentials()) {
		this.signer = signer;
		this.httpSender = undefined;
		this.maxRetries = 5;
		this.maxTimeout = 10000;
		this.baseUrl = undefined;
		this.proxy = undefined;
		this.customHeaders = {};
	}

	withMaxRetries(retries) {
		this.maxRetries = retries;
		return this;
	}

	withMaxTimeout(timeout) {
		this.maxTimeout = timeout;
		return this;
	}

	withSender(sender) {
		this.httpSender = sender;
		return this;
	}

	withBaseUrl(url) {
		this.baseUrl = url;
		return this;
	}

	withProxy(host, port, username, password) {
		this.proxy = {
			host: host,
			port: port
		};

		if (username && password) {
			this.proxy.auth = {
				username: username,
				password: password
			};
		}

		return this;
	}

	withCustomHeaders(customHeaders) {
		this.customHeaders = customHeaders;

		return this;
	}

	buildSender() {
		if (this.httpSender) return this.httpSender;

		let httpSender = new HttpSender(this.maxTimeout, this.maxRetries, this.proxy);
		let signingSender = new SigningSender(httpSender, this.signer);
		let agentSender = new AgentSender(signingSender);
		let customHeaderSender = new CustomHeaderSender(agentSender, this.customHeaders);
		let baseUrlSender = new BaseUrlSender(customHeaderSender, this.baseUrl);

		return baseUrlSender;
	}

	buildUsStreetApiClient() {
		if (!this.baseUrl) {
			this.baseUrl = US_STREET_API_URL;
		}

		return new UsStreetClient(this.buildSender());
	}
}

module.exports = ClientBuilder;