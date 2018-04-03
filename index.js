const sdkAPI = {
	core: {
		Batch: require("./src/Batch"),
		ClientBuilder: require("./src/ClientBuilder"),
		SharedCredentials: require("./src/SharedCredentials"),
		StaticCredentials: require("./src/StaticCredentials"),
		errors: require("./src/errors")
	},
	usStreet: {
		Lookup: require("./src/us_street/Lookup"),
	},
	usZipcode: {
		Lookup: require("./src/us_zipcode/Lookup"),
	},
	usAutocomplete: {
		Lookup: require("./src/us_autocomplete/Lookup"),
	},
	usExtract: {
		Lookup: require("./src/us_extract/Lookup"),
	},
	internationalStreet: {
		Lookup: require("./src/international_street/Lookup"),
	},
};

module.exports = sdkAPI;