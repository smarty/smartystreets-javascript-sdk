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

	constructor(responseData: Record<string, any>) {
		this.street = responseData.street;
		this.locality = responseData.locality;
		this.administrativeArea = responseData.administrative_area;
		this.administrativeAreaShort = responseData.administrative_area_short;
		this.administrativeAreaLong = responseData.administrative_area_long;
		this.postalCode = responseData.postal_code;
		this.countryIso3 = responseData.country_iso3;
		this.entries = responseData.entries;
		this.addressText = responseData.address_text;
		this.addressId = responseData.address_id;
	}
}
