class Lookup {
	constructor(search, country = "United States") {
		this.result = [];

		this.search = search;
		this.country = country;
	}
}

module.exports = Lookup;