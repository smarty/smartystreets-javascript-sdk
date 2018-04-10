const HttpSender = require("./HttpSender");
const SigningSender = require("./SigningSender");
const BaseUrlSender = require("./BaseUrlSender");
const AgentSender = require("./AgentSender");
const StaticCredentials = require("./StaticCredentials");
const SharedCredentials = require("./SharedCredentials");
const CustomHeaderSender = require("./CustomHeaderSender");
const StatusCodeSender = require("./StatusCodeSender");
const BadCredentialsError = require("./Errors").BadCredentialsError;

//TODO: refactor this to work more cleanly with a bundler.
const UsStreetClient = require("./us_street/Client");
const UsZipcodeClient = require("./us_zipcode/Client");
const UsAutocompleteClient = require("./us_autocomplete/Client");
const UsExtractClient = require("./us_extract/Client");
const InternationalStreetClient = require("./international_street/Client");

const INTERNATIONAL_STREET_API_URI = "https://international-street.api.smartystreets.com/verify";
const US_AUTOCOMPLETE_API_URL = "https://us-autocomplete.api.smartystreets.com/suggest";
const US_EXTRACT_API_URL = "https://us-extract.api.smartystreets.com/";
const US_STREET_API_URL = "https://us-street.api.smartystreets.com/street-address";
const US_ZIP_CODE_API_URL = "https://us-zipcode.api.smartystreets.com/lookup";

class ClientBuilder {
	constructor(signer) {
		if (noValidCredentialsProvided()) throw new BadCredentialsError();

		this.signer = signer;
		this.httpSender = undefined;
		this.maxRetries = 5;
		this.maxTimeout = 10000;
		this.baseUrl = undefined;
		this.proxy = undefined;
		this.customHeaders = {};

		function noValidCredentialsProvided() {
			return !signer instanceof StaticCredentials || !signer instanceof SharedCredentials;
		}
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

	buildUsAutocompleteClient() {
		return this.buildClient(US_AUTOCOMPLETE_API_URL, UsAutocompleteClient);
	}

	buildUsExtractClient() {
		return this.buildClient(US_EXTRACT_API_URL, UsExtractClient);
	}

	buildInternationalStreetClient() {
		return this.buildClient(INTERNATIONAL_STREET_API_URI, InternationalStreetClient);
	}
}

module.exports = ClientBuilder;