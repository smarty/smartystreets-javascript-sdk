const sdkAPI = {
	core: {
		Batch: require("./source/Batch"),
		ClientBuilder: require("./source/ClientBuilder"),
		SharedCredentials: require("./source/SharedCredentials"),
		StaticCredentials: require("./source/StaticCredentials"),
		errors: require("./source/errors")
	},
	usStreet: {
		Lookup: require("./source/us_street/Lookup"),
	},
	usZipcode: {
		Lookup: require("./source/us_zipcode/Lookup"),
	},
	usAutocomplete: {
		Lookup: require("./source/us_autocomplete/Lookup"),
	},
	internationalStreet: {
		Lookup: require("./source/international_street/Lookup"),
	},
};

module.exports = sdkAPI;