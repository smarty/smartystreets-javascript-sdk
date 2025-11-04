/**
 * @see "https://www.smarty.com/docs/cloud/international-postal-code-api#output-fields"
 */
class Result {
	constructor(responseData) {
		this.inputId = responseData.input_id;
		this.administrativeArea = responseData.administrative_area;
		this.superAdministrativeArea = responseData.super_administrative_area;
		this.subAdministrativeArea = responseData.sub_administrative_area;
		this.locality = responseData.locality;
		this.dependentLocality = responseData.dependent_locality;
		this.dependentLocalityName = responseData.dependent_locality_name;
		this.doubleDependentLocality = responseData.double_dependent_locality;
		this.postalCode = responseData.postal_code;
		this.postalCodeExtra = responseData.postal_code_extra;
		this.countryIso3 = responseData.country_iso_3;
	}
}

module.exports = Result;
