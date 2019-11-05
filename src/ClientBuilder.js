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
const UsAutocompleteProClient = require("./us_autocomplete_pro/Client");
const UsExtractClient = require("./us_extract/Client");
const InternationalStreetClient = require("./international_street/Client");

const INTERNATIONAL_STREET_API_URI = "https://international-street.api.smartystreets.com/verify";
const US_AUTOCOMPLETE_API_URL = "https://us-autocomplete.api.smartystreets.com/suggest";
const US_AUTOCOMPLETE_PRO_API_URL = "https://us-autocomplete-pro.api.smartystreets.com/lookup";
const US_EXTRACT_API_URL = "https://us-extract.api.smartystreets.com/";
const US_STREET_API_URL = "https://us-street.api.smartystreets.com/street-address";
const US_ZIP_CODE_API_URL = "https://us-zipcode.api.smartystreets.com/lookup";

/**
 * The ClientBuilder class helps you build a client object for one of the supported SmartyStreets APIs.<br>
 * You can use ClientBuilder's methods to customize settings like maximum retries or timeout duration. These methods<br>
 * are chainable, so you can usually get set up with one line of code.
 */
class ClientBuilder {
	constructor(signer) {
		if (noCredentialsProvided()) throw new BadCredentialsError();

		this.signer = signer;
		this.httpSender = undefined;
		this.maxRetries = 5;
		this.maxTimeout = 10000;
		this.baseUrl = undefined;
		this.proxy = undefined;
		this.customHeaders = {};
		this.debug = undefined;

		function noCredentialsProvided() {
			return !signer instanceof StaticCredentials || !signer instanceof SharedCredentials;
		}
	}

	/**
	 * @param retries The maximum number of times to retry sending the request to the API. (Default is 5)
	 * @return Returns <b>this</b> to accommodate method chaining.
	 */
	withMaxRetries(retries) {
		this.maxRetries = retries;
		return this;
	}

	/**
	 * @param timeout The maximum time (in milliseconds) to wait for a connection, and also to wait for <br>
	 *                   the response to be read. (Default is 10000)
	 * @return Returns <b>this</b> to accommodate method chaining.
	 */
	withMaxTimeout(timeout) {
		this.maxTimeout = timeout;
		return this;
	}

	/**
	 * @param sender Default is a series of nested senders. See <b>buildSender()</b>.
	 * @return Returns <b>this</b> to accommodate method chaining.
	 */
	withSender(sender) {
		this.httpSender = sender;
		return this;
	}

	/**
	 * This may be useful when using a local installation of the SmartyStreets APIs.
	 * @param url Defaults to the URL for the API corresponding to the <b>Client</b> object being built.
	 * @return Returns <b>this</b> to accommodate method chaining.
	 */
	withBaseUrl(url) {
		this.baseUrl = url;
		return this;
	}

	/**
	 * Use this to specify a proxy through which to send all lookups.
	 * @param host The host of the proxy server (do not include the port).
	 * @param port The port on the proxy server to which you wish to connect.
	 * @param username The username to login to the proxy.
	 * @param password The password to login to the proxy.
	 * @return Returns <b>this</b> to accommodate method chaining.
	 */
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

	/**
	 * Use this to add any additional headers you need.
	 * @param customHeaders A String to Object <b>Map</b> of header name/value pairs.
	 * @return Returns <b>this</b> to accommodate method chaining.
	 */
	withCustomHeaders(customHeaders) {
		this.customHeaders = customHeaders;

		return this;
	}

	/**
	 * Enables debug mode, which will print information about the HTTP request and response to console.log
	 * @return Returns <b>this</b> to accommodate method chaining.
	 */
	withDebug() {
		this.debug = true;

		return this;
	}


	buildSender() {
		if (this.httpSender) return this.httpSender;

		const httpSender = new HttpSender(this.maxTimeout, this.maxRetries, this.proxy, this.debug);
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

	buildUsAutocompleteProClient() {
		return this.buildClient(US_AUTOCOMPLETE_PRO_API_URL, UsAutocompleteProClient);
	}

	buildUsExtractClient() {
		return this.buildClient(US_EXTRACT_API_URL, UsExtractClient);
	}

	buildInternationalStreetClient() {
		return this.buildClient(INTERNATIONAL_STREET_API_URI, InternationalStreetClient);
	}
}

module.exports = ClientBuilder;