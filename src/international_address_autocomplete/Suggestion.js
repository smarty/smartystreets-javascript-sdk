class Suggestion {
	constructor(responseData) {
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

module.exports = Suggestion;