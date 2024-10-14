import {ClientBuilder} from "../ClientBuilder.js";

export function instantiateClientBuilder(credentials) {
	return new ClientBuilder(credentials);
}

export function buildUsStreetApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsStreetApiClient();
}

export function buildUsAutocompleteProApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsAutocompleteProClient();
}

export function buildUsExtractApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsExtractClient();
}

export function buildUsZipcodeApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsZipcodeClient();
}

export function buildInternationalStreetApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildInternationalStreetClient();
}

export function buildUsReverseGeoApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsReverseGeoClient();
}

export function buildInternationalAddressAutocompleteApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildInternationalAddressAutocompleteClient();
}

export function buildUsEnrichmentApiClient(credentials) {
	return instantiateClientBuilder(credentials).buildUsEnrichmentClient();
}
