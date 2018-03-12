const HttpSender = require("./http_sender");
const SigningSender = require("./signing_sender");
const BaseUrlSender = require("./base_url_sender");
const AgentSender = require("./agent_sender");
const StaticCredentials = require("./static_credentials");
const CustomHeaderSender = require("./custom_header_sender");
const StatusCodeSender = require("./status_code_sender");

//TODO: refactor this to work more cleanly with a bundler.
const UsStreetClient = require("./us_street/client");
const UsZipcodeClient = require("./us_zipcode/client");
const InternationalStreetClient = require("./international_street/client");

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

		const httpSender = new HttpSender(this.maxTimeout, this.maxRetries, this.proxy);
		const statusCodeSender = new StatusCodeSender(httpSender);
		const signingSender = new SigningSender(statusCodeSender, this.signer);
		const agentSender = new AgentSender(signingSender);
		const customHeaderSender = new CustomHeaderSender(agentSender, this.customHeaders);
		const baseUrlSender = new BaseUrlSender(customHeaderSender, this.baseUrl);

		return baseUrlSender;
	}

	buildClient(baseUrl, Client) {
		if (!this.baseUrl) {
			this.baseUrl = baseUrl;
		}

		return new Client(this.buildSender());
	}

	buildUsStreetApiClient() {
		return this.buildClient(US_STREET_API_URL, UsStreetClient);
	}

	buildUsZipcodeClient() {
		return this.buildClient(US_ZIP_CODE_API_URL, UsZipcodeClient);
	}

	buildInternationalStreetClient() {
		return this.buildClient(INTERNATIONAL_STREET_API_URI, InternationalStreetClient);
	}
}

module.exports = ClientBuilder;