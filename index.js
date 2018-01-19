const sdkApi = {
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
};

module.exports = sdkApi;