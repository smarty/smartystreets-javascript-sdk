class Suggestion {
	constructor(responseData) {
		this.street = responseData.street;
		this.locality = responseData.locality;
		this.administrativeArea = responseData.administrative_area;
		this.postalCode = responseData.postal_code;
		this.countryIso3 = responseData.country_iso3;
	}
}

module.exports = Suggestion;