class Lookup {
	constructor({search, address_id, country, max_results = 5, include_only_locality, include_only_postal_code}) {
		this.result = [];

		this.search = search;
		this.address_id = address_id;
		this.country = country;
		this.max_results = max_results;
		this.include_only_locality = include_only_locality;
		this.include_only_postal_code = include_only_postal_code;
	}
}

module.exports = Lookup;