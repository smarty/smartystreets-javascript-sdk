import ClientBuilder from "../ClientBuilder.js";
import StaticCredentials from "../StaticCredentials.js";
import SharedCredentials from "../SharedCredentials.js";
import BasicAuthCredentials from "../BasicAuthCredentials.js";

type Credentials = StaticCredentials | SharedCredentials | BasicAuthCredentials;

function instantiateClientBuilder(credentials: Credentials): ClientBuilder {
	return new ClientBuilder(credentials);
}

function buildUsStreetApiClient(credentials: Credentials) {
	return instantiateClientBuilder(credentials).buildUsStreetApiClient();
}

function buildUsAutocompleteProApiClient(credentials: Credentials) {
	return instantiateClientBuilder(credentials).buildUsAutocompleteProClient();
}

function buildUsExtractApiClient(credentials: Credentials) {
	return instantiateClientBuilder(credentials).buildUsExtractClient();
}

function buildUsZipcodeApiClient(credentials: Credentials) {
	return instantiateClientBuilder(credentials).buildUsZipcodeClient();
}

function buildInternationalStreetApiClient(credentials: Credentials) {
	return instantiateClientBuilder(credentials).buildInternationalStreetClient();
}

function buildUsReverseGeoApiClient(credentials: Credentials) {
	return instantiateClientBuilder(credentials).buildUsReverseGeoClient();
}

function buildInternationalAddressAutocompleteApiClient(credentials: Credentials) {
	return instantiateClientBuilder(credentials).buildInternationalAddressAutocompleteClient();
}

function buildUsEnrichmentApiClient(credentials: Credentials) {
	return instantiateClientBuilder(credentials).buildUsEnrichmentClient();
}

function buildInternationalPostalCodeApiClient(credentials: Credentials) {
	return instantiateClientBuilder(credentials).buildInternationalPostalCodeClient();
}

export default {
	usStreet: buildUsStreetApiClient,
	usAutocompletePro: buildUsAutocompleteProApiClient,
	usExtract: buildUsExtractApiClient,
	usZipcode: buildUsZipcodeApiClient,
	internationalStreet: buildInternationalStreetApiClient,
	usReverseGeo: buildUsReverseGeoApiClient,
	internationalAddressAutocomplete: buildInternationalAddressAutocompleteApiClient,
	usEnrichment: buildUsEnrichmentApiClient,
	internationalPostalCode: buildInternationalPostalCodeApiClient,
};
