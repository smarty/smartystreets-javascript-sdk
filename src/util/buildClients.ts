import ClientBuilder from "../ClientBuilder";
import StaticCredentials from "../StaticCredentials";
import SharedCredentials from "../SharedCredentials";

function instantiateClientBuilder(
	credentials: StaticCredentials | SharedCredentials,
): ClientBuilder {
	return new ClientBuilder(credentials);
}

export function buildUsStreetApiClient(credentials: StaticCredentials | SharedCredentials): any {
	return instantiateClientBuilder(credentials).buildUsStreetApiClient();
}

export function buildUsAutocompleteProApiClient(
	credentials: StaticCredentials | SharedCredentials,
): any {
	return instantiateClientBuilder(credentials).buildUsAutocompleteProClient();
}

export function buildUsExtractApiClient(credentials: StaticCredentials | SharedCredentials): any {
	return instantiateClientBuilder(credentials).buildUsExtractClient();
}

export function buildUsZipcodeApiClient(credentials: StaticCredentials | SharedCredentials): any {
	return instantiateClientBuilder(credentials).buildUsZipcodeClient();
}

export function buildInternationalStreetApiClient(
	credentials: StaticCredentials | SharedCredentials,
): any {
	return instantiateClientBuilder(credentials).buildInternationalStreetClient();
}

export function buildUsReverseGeoApiClient(
	credentials: StaticCredentials | SharedCredentials,
): any {
	return instantiateClientBuilder(credentials).buildUsReverseGeoClient();
}

export function buildInternationalAddressAutocompleteApiClient(
	credentials: StaticCredentials | SharedCredentials,
): any {
	return instantiateClientBuilder(credentials).buildInternationalAddressAutocompleteClient();
}

export function buildUsEnrichmentApiClient(
	credentials: StaticCredentials | SharedCredentials,
): any {
	return instantiateClientBuilder(credentials).buildUsEnrichmentClient();
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
};

