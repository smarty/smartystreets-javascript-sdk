const HttpSender = require("./HttpSender");
const SigningSender = require("./SigningSender");
const BaseUrlSender = require("./BaseUrlSender");
const AgentSender = require("./AgentSender");
const StaticCredentials = require("./StaticCredentials");
const SharedCredentials = require("./SharedCredentials");
const CustomHeaderSender = require("./CustomHeaderSender");
const StatusCodeSender = require("./StatusCodeSender");
const LicenseSender = require("./LicenseSender");
const BadCredentialsError = require("./Errors").BadCredentialsError;
const RetrySender = require("./RetrySender.js");
const Sleeper = require("./util/Sleeper.ts");

//TODO: refactor this to work more cleanly with a bundler.
const UsStreetClient = require("./us_street/Client");
const UsZipcodeClient = require("./us_zipcode/Client");
const UsAutocompleteProClient = require("./us_autocomplete_pro/Client");
const UsExtractClient = require("./us_extract/Client");
const InternationalStreetClient = require("./international_street/Client");
const UsReverseGeoClient = require("./us_reverse_geo/Client");
const InternationalAddressAutocompleteClient = require("./international_address_autocomplete/Client");
const UsEnrichmentClient = require("./us_enrichment/Client");

const INTERNATIONAL_STREET_API_URI = "https://international-street.api.smarty.com/verify";
const US_AUTOCOMPLETE_PRO_API_URL = "https://us-autocomplete-pro.api.smarty.com/lookup";
const US_EXTRACT_API_URL = "https://us-extract.api.smarty.com/";
const US_STREET_API_URL = "https://us-street.api.smarty.com/street-address";
const US_ZIP_CODE_API_URL = "https://us-zipcode.api.smarty.com/lookup";
const US_REVERSE_GEO_API_URL = "https://us-reverse-geo.api.smarty.com/lookup";
const INTERNATIONAL_ADDRESS_AUTOCOMPLETE_API_URL = "https://international-autocomplete.api.smarty.com/v2/lookup";
const US_ENRICHMENT_API_URL = "https://us-enrichment.api.smarty.com/lookup";

/**
 * The ClientBuilder class helps you build a client object for one of the supported Smarty APIs.<br>
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
		this.licenses = [];

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
	 * This may be useful when using a local installation of the Smarty APIs.
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
	 * @param protocol The protocol on the proxy server to which you wish to connect. If the proxy server uses HTTPS, then you must set the protocol to 'https'.
	 * @param username The username to login to the proxy.
	 * @param password The password to login to the proxy.
	 * @return Returns <b>this</b> to accommodate method chaining.
	 */
	withProxy(host, port, protocol, username, password) {
		this.proxy = {
			host: host,
			port: port,
			protocol: protocol,
		};

		if (username && password) {
			this.proxy.auth = {
				username: username,
				password: password,
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

	/**
	 * Allows the caller to specify the subscription license (aka "track") they wish to use.
	 * @param licenses A String Array of licenses.
	 * @returns Returns <b>this</b> to accommodate method chaining.
	 */
	withLicenses(licenses) {
		this.licenses = licenses;

		return this;
	}

	buildSender() {
		if (this.httpSender) return this.httpSender;

		const httpSender = new HttpSender(this.maxTimeout, this.proxy, this.debug);
		const statusCodeSender = new StatusCodeSender(httpSender);
		const signingSender = new SigningSender(statusCodeSender, this.signer);
		let agentSender = new AgentSender(signingSender);
		if (this.maxRetries > 0) {
			const retrySender = new RetrySender(this.maxRetries, signingSender, new Sleeper());
			agentSender = new AgentSender(retrySender);
		}
		const customHeaderSender = new CustomHeaderSender(agentSender, this.customHeaders);
		const baseUrlSender = new BaseUrlSender(customHeaderSender, this.baseUrl);
		const licenseSender = new LicenseSender(baseUrlSender, this.licenses);

		return licenseSender;
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

	buildUsAutocompleteProClient() {
		return this.buildClient(US_AUTOCOMPLETE_PRO_API_URL, UsAutocompleteProClient);
	}

	buildUsExtractClient() {
		return this.buildClient(US_EXTRACT_API_URL, UsExtractClient);
	}

	buildInternationalStreetClient() {
		return this.buildClient(INTERNATIONAL_STREET_API_URI, InternationalStreetClient);
	}

	buildUsReverseGeoClient() {
		return this.buildClient(US_REVERSE_GEO_API_URL, UsReverseGeoClient);
	}

	buildInternationalAddressAutocompleteClient() {
		return this.buildClient(INTERNATIONAL_ADDRESS_AUTOCOMPLETE_API_URL, InternationalAddressAutocompleteClient);
	}

	buildUsEnrichmentClient() {
		return this.buildClient(US_ENRICHMENT_API_URL, UsEnrichmentClient);
	}
}

module.exports = ClientBuilder;