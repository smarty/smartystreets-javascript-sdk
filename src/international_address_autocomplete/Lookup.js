export class Lookup {
	constructor({search, addressId, country, maxResults = 5, includeOnlyLocality, includeOnlyPostalCode} = {}) {
		this.result = [];

		this.search = search;
		this.addressId = addressId;
		this.country = country;
		this.maxResults = maxResults;
		this.includeOnlyLocality = includeOnlyLocality;
		this.includeOnlyPostalCode = includeOnlyPostalCode;
	}
}
