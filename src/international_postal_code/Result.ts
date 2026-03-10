export interface RawIntlPostalCodeResult {
	input_id?: string;
	administrative_area?: string;
	super_administrative_area?: string;
	sub_administrative_area?: string;
	locality?: string;
	dependent_locality?: string;
	dependent_locality_name?: string;
	double_dependent_locality?: string;
	postal_code?: string;
	postal_code_extra?: string;
	country_iso_3?: string;
}

export default class Result {
	inputId: string;
	administrativeArea: string;
	superAdministrativeArea: string;
	subAdministrativeArea: string;
	locality: string;
	dependentLocality: string;
	dependentLocalityName: string;
	doubleDependentLocality: string;
	postalCode: string;
	postalCodeExtra: string;
	countryIso3: string;

	constructor(responseData: RawIntlPostalCodeResult) {
		this.inputId = responseData.input_id ?? "";
		this.administrativeArea = responseData.administrative_area ?? "";
		this.superAdministrativeArea = responseData.super_administrative_area ?? "";
		this.subAdministrativeArea = responseData.sub_administrative_area ?? "";
		this.locality = responseData.locality ?? "";
		this.dependentLocality = responseData.dependent_locality ?? "";
		this.dependentLocalityName = responseData.dependent_locality_name ?? "";
		this.doubleDependentLocality = responseData.double_dependent_locality ?? "";
		this.postalCode = responseData.postal_code ?? "";
		this.postalCodeExtra = responseData.postal_code_extra ?? "";
		this.countryIso3 = responseData.country_iso_3 ?? "";
	}
}
