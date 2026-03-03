export interface RawIntlAutocompleteSuggestion {
	street?: string;
	locality?: string;
	administrative_area?: string;
	administrative_area_short?: string;
	administrative_area_long?: string;
	postal_code?: string;
	country_iso3?: string;
	entries?: number;
	address_text?: string;
	address_id?: string;
}

export default class Suggestion {
	street: string;
	locality: string;
	administrativeArea: string;
	administrativeAreaShort: string;
	administrativeAreaLong: string;
	postalCode: string;
	countryIso3: string;
	entries: number;
	addressText: string;
	addressId: string;

	constructor(responseData: RawIntlAutocompleteSuggestion) {
		this.street = responseData.street ?? "";
		this.locality = responseData.locality ?? "";
		this.administrativeArea = responseData.administrative_area ?? "";
		this.administrativeAreaShort = responseData.administrative_area_short ?? "";
		this.administrativeAreaLong = responseData.administrative_area_long ?? "";
		this.postalCode = responseData.postal_code ?? "";
		this.countryIso3 = responseData.country_iso3 ?? "";
		this.entries = responseData.entries ?? 0;
		this.addressText = responseData.address_text ?? "";
		this.addressId = responseData.address_id ?? "";
	}
}
