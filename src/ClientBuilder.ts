import HttpSender from "./HttpSender.js";
import SigningSender from "./SigningSender.js";
import BaseUrlSender from "./BaseUrlSender.js";
import AgentSender from "./AgentSender.js";
import StaticCredentials from "./StaticCredentials.js";
import SharedCredentials from "./SharedCredentials.js";
import BasicAuthCredentials from "./BasicAuthCredentials.js";
import CustomHeaderSender, { AppendHeader } from "./CustomHeaderSender.js";
import StatusCodeSender from "./StatusCodeSender.js";
import LicenseSender from "./LicenseSender.js";
import CustomQuerySender from "./CustomQuerySender.js";
import { BadCredentialsError } from "./Errors.js";
import RetrySender from "./RetrySender.js";
import Sleeper from "./util/Sleeper.js";

import UsStreetClient from "./us_street/Client.js";
import UsZipcodeClient from "./us_zipcode/Client.js";
import UsAutocompleteProClient from "./us_autocomplete_pro/Client.js";
import UsExtractClient from "./us_extract/Client.js";
import InternationalStreetClient from "./international_street/Client.js";
import UsReverseGeoClient from "./us_reverse_geo/Client.js";
import InternationalAddressAutocompleteClient from "./international_address_autocomplete/Client.js";
import UsEnrichmentClient from "./us_enrichment/Client.js";
import InternationalPostalCodeClient from "./international_postal_code/Client.js";
import { Sender } from "./types.js";
import { AxiosProxyConfig } from "axios";

const INTERNATIONAL_STREET_API_URI = "https://international-street.api.smarty.com/verify";
const US_AUTOCOMPLETE_PRO_API_URL = "https://us-autocomplete-pro.api.smarty.com/lookup";
const US_EXTRACT_API_URL = "https://us-extract.api.smarty.com/";
const US_STREET_API_URL = "https://us-street.api.smarty.com/street-address";
const US_ZIP_CODE_API_URL = "https://us-zipcode.api.smarty.com/lookup";
const US_REVERSE_GEO_API_URL = "https://us-reverse-geo.api.smarty.com/lookup";
const INTERNATIONAL_ADDRESS_AUTOCOMPLETE_API_URL =
	"https://international-autocomplete.api.smarty.com/v2/lookup";
const US_ENRICHMENT_API_URL = "https://us-enrichment.api.smarty.com/lookup";
const INTERNATIONAL_POSTAL_CODE_API_URL = "https://international-postal-code.api.smarty.com/lookup";

type Signer = StaticCredentials | SharedCredentials | BasicAuthCredentials;

export default class ClientBuilder {
	private signer: Signer;
	private httpSender: Sender | undefined;
	private maxRetries: number;
	private maxTimeout: number;
	private baseUrl: string | undefined;
	private proxy: AxiosProxyConfig | undefined;
	private customHeaders: Record<string, string>;
	private appendHeaders: Record<string, AppendHeader>;
	private debug: boolean | undefined;
	private licenses: string[];
	private customQueries: Map<string, string>;

	constructor(signer: Signer) {
		if (
			!(
				signer instanceof StaticCredentials ||
				signer instanceof SharedCredentials ||
				signer instanceof BasicAuthCredentials
			)
		)
			throw new BadCredentialsError();

		this.signer = signer;
		this.httpSender = undefined;
		this.maxRetries = 5;
		this.maxTimeout = 10000;
		this.baseUrl = undefined;
		this.proxy = undefined;
		this.customHeaders = {};
		this.appendHeaders = {};
		this.debug = undefined;
		this.licenses = [];
		this.customQueries = new Map();
	}

	withMaxRetries(retries: number): ClientBuilder {
		this.maxRetries = retries;
		return this;
	}

	withMaxTimeout(timeout: number): ClientBuilder {
		this.maxTimeout = timeout;
		return this;
	}

	withSender(sender: Sender): ClientBuilder {
		this.httpSender = sender;
		return this;
	}

	withBaseUrl(url: string): ClientBuilder {
		this.baseUrl = url;
		return this;
	}

	withProxy(
		host: string,
		port: number,
		protocol: string,
		username?: string,
		password?: string,
	): ClientBuilder {
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

	withCustomHeaders(customHeaders: Record<string, string>): ClientBuilder {
		this.customHeaders = customHeaders;
		return this;
	}

	withAppendedHeader(key: string, value: string, separator: string): ClientBuilder {
		if (this.appendHeaders[key]) {
			if (this.appendHeaders[key].separator !== separator) {
				throw new Error(
					`Conflicting separators for appended header "${key}": ` +
						`existing "${this.appendHeaders[key].separator}" vs new "${separator}"`,
				);
			}
			this.appendHeaders[key].values.push(value);
		} else {
			this.appendHeaders[key] = { values: [value], separator };
		}
		return this;
	}

	withDebug(): ClientBuilder {
		this.debug = true;
		return this;
	}

	withLicenses(licenses: string[]): ClientBuilder {
		this.licenses = licenses;
		return this;
	}

	withCustomQuery(key: string, value: string): ClientBuilder {
		this.customQueries.set(key, value);
		return this;
	}

	withCustomCommaSeperatedQuery(key: string, value: string): ClientBuilder {
		const values = this.customQueries.get(key);
		if (values === undefined) {
			this.customQueries.set(key, value);
		} else {
			this.customQueries.set(key, values + "," + value);
		}
		return this;
	}

	withFeatureComponentAnalysis(): ClientBuilder {
		return this.withCustomCommaSeperatedQuery("features", "component-analysis");
	}

	withFinancialHistory(): ClientBuilder {
		return this.withCustomCommaSeperatedQuery("features", "financial");
	}

	withOccupantUse(): ClientBuilder {
		return this.withCustomCommaSeperatedQuery("features", "occupant-use");
	}

	withFeatureIANATimeZone(): ClientBuilder {
		return this.withCustomCommaSeperatedQuery("features", "iana-timezone");
	}

	buildSender(): Sender {
		if (this.httpSender) return this.httpSender;

		const httpSender = new HttpSender(this.maxTimeout, this.proxy, this.debug);
		const statusCodeSender = new StatusCodeSender(httpSender);
		const signingSender = new SigningSender(statusCodeSender, this.signer);
		let agentSender = new AgentSender(signingSender);
		if (this.maxRetries > 0) {
			const retrySender = new RetrySender(this.maxRetries, signingSender, new Sleeper());
			agentSender = new AgentSender(retrySender);
		}
		const customHeaderSender = new CustomHeaderSender(
			agentSender,
			this.customHeaders,
			this.appendHeaders,
		);
		const baseUrlSender = new BaseUrlSender(customHeaderSender, this.baseUrl!);
		const licenseSender = new LicenseSender(baseUrlSender, this.licenses);
		const customQuerySender = new CustomQuerySender(licenseSender, this.customQueries);

		return customQuerySender;
	}

	buildClient<T>(baseUrl: string, ClientClass: new (sender: Sender) => T): T {
		if (!this.baseUrl) {
			this.baseUrl = baseUrl;
		}

		return new ClientClass(this.buildSender());
	}

	buildUsStreetApiClient(): UsStreetClient {
		return this.buildClient(US_STREET_API_URL, UsStreetClient);
	}

	buildUsZipcodeClient(): UsZipcodeClient {
		return this.buildClient(US_ZIP_CODE_API_URL, UsZipcodeClient);
	}

	buildInternationalPostalCodeClient(): InternationalPostalCodeClient {
		return this.buildClient(INTERNATIONAL_POSTAL_CODE_API_URL, InternationalPostalCodeClient);
	}

	buildUsAutocompleteProClient(): UsAutocompleteProClient {
		return this.buildClient(US_AUTOCOMPLETE_PRO_API_URL, UsAutocompleteProClient);
	}

	buildUsExtractClient(): UsExtractClient {
		return this.buildClient(US_EXTRACT_API_URL, UsExtractClient);
	}

	buildInternationalStreetClient(): InternationalStreetClient {
		return this.buildClient(INTERNATIONAL_STREET_API_URI, InternationalStreetClient);
	}

	buildUsReverseGeoClient(): UsReverseGeoClient {
		return this.buildClient(US_REVERSE_GEO_API_URL, UsReverseGeoClient);
	}

	buildInternationalAddressAutocompleteClient(): InternationalAddressAutocompleteClient {
		return this.buildClient(
			INTERNATIONAL_ADDRESS_AUTOCOMPLETE_API_URL,
			InternationalAddressAutocompleteClient,
		);
	}

	buildUsEnrichmentClient(): UsEnrichmentClient {
		return this.buildClient(US_ENRICHMENT_API_URL, UsEnrichmentClient);
	}
}
