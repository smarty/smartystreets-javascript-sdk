const sdkAPI = {
	core: {
		Batch: require("./source/batch"),
		ClientBuilder: require("./source/client_builder"),
		SharedCredentials: require("./source/shared_credentials"),
		StaticCredentials: require("./source/static_credentials"),
		errors: require("./source/errors")
	},
	usStreet: {
		Lookup: require("./source/us_street/lookup"),
	},
	usZipcode: {
		Lookup: require("./source/us_zipcode/lookup"),
	},
	usAutocomplete: {
		Lookup: require("./source/us_autocomplete/lookup"),
	},
	internationalStreet: {
		Lookup: require("./source/international_street/lookup"),
	},
};

module.exports = sdkAPI;