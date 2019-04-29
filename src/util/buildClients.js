const ClientBuilder = require("../ClientBuilder");

function instantiateClientBuilder(credentials) {
	return new ClientBuilder(credentials);
}

function buildUsStreetApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsStreetApiClient();
}

function buildUsAutocompleteApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsAutocompleteClient();
}

function buildUsExtractApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsExtractClient();
}

function buildUsZipcodeApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsZipcodeClient();
}

function buildInternationalStreetApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildInternationalStreetClient();
}

module.exports = {
	usStreet: buildUsStreetApiClient,
	usAutocomplete: buildUsAutocompleteApiClient,
	usExtract: buildUsExtractApiClient,
	usZipcode: buildUsZipcodeApiClient,
	internationalStreet: buildInternationalStreetApiClient,
};