import HttpSender from "./HttpSender";
import SigningSender from "./SigningSender";
import BaseUrlSender from "./BaseUrlSender";
import AgentSender from "./AgentSender";
import StaticCredentials from "./StaticCredentials";
import SharedCredentials from "./SharedCredentials";
import CustomHeaderSender from "./CustomHeaderSender";
import StatusCodeSender from "./StatusCodeSender";
import LicenseSender from "./LicenseSender";
import { BadCredentialsError } from "./Errors";
import RetrySender from "./RetrySender";
import Sleeper from "./util/Sleeper";

//TODO: refactor this to work more cleanly with a bundler.
import UsStreetClient from "./us_street/Client";
import UsZipcodeClient from "./us_zipcode/Client";
import UsAutocompleteProClient from "./us_autocomplete_pro/Client";
import UsExtractClient from "./us_extract/Client";
import InternationalStreetClient from "./international_street/Client";
import UsReverseGeoClient from "./us_reverse_geo/Client";
import InternationalAddressAutocompleteClient from "./international_address_autocomplete/Client";
import UsEnrichmentClient from "./us_enrichment/Client";

const INTERNATIONAL_STREET_API_URI = "https://international-street.api.smarty.com/verify";
const US_AUTOCOMPLETE_PRO_API_URL = "https://us-autocomplete-pro.api.smarty.com/lookup";
const US_EXTRACT_API_URL = "https://us-extract.api.smarty.com/";
const US_STREET_API_URL = "https://us-street.api.smarty.com/street-address";
const US_ZIP_CODE_API_URL = "https://us-zipcode.api.smarty.com/lookup";
const US_REVERSE_GEO_API_URL = "https://us-reverse-geo.api.smarty.com/lookup";
const INTERNATIONAL_ADDRESS_AUTOCOMPLETE_API_URL =
	"https://international-autocomplete.api.smarty.com/v2/lookup";
const US_ENRICHMENT_API_URL = "https://us-enrichment.api.smarty.com/lookup";

export interface ProxyConfig {
	host: string;
	port: number;
	protocol: string;
	auth?: {
		username: string;
		password: string;
	};
}

/**
 * The ClientBuilder class helps you build a client object for one of the supported Smarty APIs.<br>
 * You can use ClientBuilder's methods to customize settings like maximum retries or timeout duration. These methods<br>
 * are chainable, so you can usually get set up with one line of code.
 */
export default class ClientBuilder {
	private signer: StaticCredentials | SharedCredentials;
	private httpSender?: any;
	private maxRetries: number;
	private maxTimeout: number;
	private baseUrl?: string;
	private proxy?: ProxyConfig;
	private customHeaders: Record<string, string>;
	private debug?: boolean;
	private licenses: string[];

	constructor(signer: StaticCredentials | SharedCredentials) {
		if (!this.isValidCredentials(signer)) throw new BadCredentialsError();

		this.signer = signer;
		this.maxRetries = 5;
		this.maxTimeout = 10000;
		this.customHeaders = {};
		this.licenses = [];
	}

	private isValidCredentials(signer: any): boolean {
		return signer instanceof StaticCredentials || signer instanceof SharedCredentials;
	}

	/**
	 * @param retries The maximum number of times to retry sending the request to the API. (Default is 5)
	 * @return Returns <b>this</b> to accommodate method chaining.
	 */
	withMaxRetries(retries: number): this {
		this.maxRetries = retries;
		return this;
	}

	/**
	 * @param timeout The maximum time (in milliseconds) to wait for a connection, and also to wait for <br>
	 *                   the response to be read. (Default is 10000)
	 * @return Returns <b>this</b> to accommodate method chaining.
	 */
	withMaxTimeout(timeout: number): this {
		this.maxTimeout = timeout;
		return this;
	}

	/**
	 * @param sender Default is a series of nested senders. See <b>buildSender()</b>.
	 * @return Returns <b>this</b> to accommodate method chaining.
	 */
	withSender(sender: any): this {
		this.httpSender = sender;
		return this;
	}

	/**
	 * This may be useful when using a local installation of the Smarty APIs.
	 * @param url Defaults to the URL for the API corresponding to the <b>Client</b> object being built.
	 * @return Returns <b>this</b> to accommodate method chaining.
	 */
	withBaseUrl(url: string): this {
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
	withProxy(
		host: string,
		port: number,
		protocol: string,
		username?: string,
		password?: string,
	): this {
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
	withCustomHeaders(customHeaders: Record<string, string>): this {
		this.customHeaders = customHeaders;
		return this;
	}

	/**
	 * Enables debug mode, which will print information about the HTTP request and response to console.log
	 * @return Returns <b>this</b> to accommodate method chaining.
	 */
	withDebug(): this {
		this.debug = true;
		return this;
	}

	/**
	 * Allows the caller to specify the subscription license (aka "track") they wish to use.
	 * @param licenses A String Array of licenses.
	 * @returns Returns <b>this</b> to accommodate method chaining.
	 */
	withLicenses(licenses: string[]): this {
		this.licenses = licenses;
		return this;
	}

	private buildSender(): any {
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

	private buildClient(baseUrl: string, Client: any): any {
		if (!this.baseUrl) {
			this.baseUrl = baseUrl;
		}

		return new Client(this.buildSender());
	}

	buildUsStreetApiClient(): any {
		return this.buildClient(US_STREET_API_URL, UsStreetClient);
	}

	buildUsZipcodeClient(): any {
		return this.buildClient(US_ZIP_CODE_API_URL, UsZipcodeClient);
	}

	buildUsAutocompleteProClient(): any {
		return this.buildClient(US_AUTOCOMPLETE_PRO_API_URL, UsAutocompleteProClient);
	}

	buildUsExtractClient(): any {
		return this.buildClient(US_EXTRACT_API_URL, UsExtractClient);
	}

	buildInternationalStreetClient(): any {
		return this.buildClient(INTERNATIONAL_STREET_API_URI, InternationalStreetClient);
	}

	buildUsReverseGeoClient(): any {
		return this.buildClient(US_REVERSE_GEO_API_URL, UsReverseGeoClient);
	}

	buildInternationalAddressAutocompleteClient(): any {
		return this.buildClient(
			INTERNATIONAL_ADDRESS_AUTOCOMPLETE_API_URL,
			InternationalAddressAutocompleteClient,
		);
	}

	buildUsEnrichmentClient(): any {
		return this.buildClient(US_ENRICHMENT_API_URL, UsEnrichmentClient);
	}
}

