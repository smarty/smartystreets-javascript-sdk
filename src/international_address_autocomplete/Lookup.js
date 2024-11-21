class Lookup {
	constructor({search, addressId, country, maxResults = 5, includeOnlyLocality, includeOnlyPostalCode} = {}) {
		this.result = [];

		this.search = search;
		this.addressId = addressId;
		this.country = country;
		this.maxResults = maxResults;
		this.includeOnlyLocality = includeOnlyLocality;
		this.includeOnlyPostalCode = includeOnlyPostalCode;
		this.customParameters = {};
	}

	addCustomParameter(key, value) {
		this.customParameters[key] = value;
	}
}

module.exports = Lookup;