class Lookup {
	constructor(search = "", country = "United States", max_results = undefined, include_only_administrative_area = "", include_only_locality = "", include_only_postal_code = "") {
		this.result = [];

		this.search = search;
		this.country = country;
		this.max_results = max_results;
		this.include_only_administrative_area = include_only_administrative_area;
		this.include_only_locality = include_only_locality;
		this.include_only_postal_code = include_only_postal_code;
	}
}

module.exports = Lookup;