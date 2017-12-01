const INTERNATIONAL_STREET_API_URI = "https://international-street.api.smartystreets.com/verify";
const US_AUTOCOMPLETE_API_URL = "https://us-autocomplete.api.smartystreets.com/suggest";
const US_EXTRACT_API_URL = "https://us-extract.api.smartystreets.com/";
const US_STREET_API_URL = "https://us-street.api.smartystreets.com/street-address";
const US_ZIP_CODE_API_URL = "https://us-zipcode.api.smartystreets.com/lookup";

class ClientBuilder {
	constructor(signer) {
		this.signer = signer;
		this.httpSender = undefined;
		this.maxRetries = 5;
		this.maxTimeout = 10000;
		this.urlPrefix = undefined;
		this.proxy = undefined;
	}

	withMaxRetries (retries) {
		this.maxRetries = retries;
		return this;
	}

	withMaxTimeout (timeout) {
		this.maxTimeout = timeout;
		return this;
	}

	withSender (sender) {
		this.httpSender = sender;
		return this;
	}

	withBaseUrl (url) {
		this.urlPrefix = url;
		return this;
	}

	withProxy(proxy) {
		this.proxy = proxy;
		return this;
	}

	buildSender () {
		if (this.httpSender) return this.httpSender;

		//TODO: Complete these when the senders have been built.
	}

//	TODO: Create enum for match type.
}

module.exports = ClientBuilder;