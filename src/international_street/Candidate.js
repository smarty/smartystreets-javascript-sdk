/**
 * A candidate is a possible match for an address that was submitted.<br>
 *     A lookup can have multiple candidates if the address was ambiguous.
 *
 * @see "https://smartystreets.com/docs/cloud/international-street-api#root"
 */
class Candidate {
	constructor(responseData) {
		this.organization = responseData.organization;
		this.address1 = responseData.address1;
		this.address2 = responseData.address2;
		this.address3 = responseData.address3;
		this.address4 = responseData.address4;
		this.address5 = responseData.address5;
		this.address6 = responseData.address6;
		this.address7 = responseData.address7;
		this.address8 = responseData.address8;
		this.address9 = responseData.address9;
		this.address10 = responseData.address10;
		this.address11 = responseData.address11;
		this.address12 = responseData.address12;

		this.components = {};
		if (responseData.components !== undefined) {
			this.components.countryIso3 = responseData.components.country_iso_3;
			this.components.superAdministrativeArea = responseData.components.super_administrative_area;
			this.components.administrativeArea = responseData.components.administrative_area;
			this.components.subAdministrativeArea = responseData.components.sub_administrative_area;
			this.components.dependentLocality = responseData.components.dependent_locality;
			this.components.dependentLocalityName = responseData.components.dependent_locality_name;
			this.components.doubleDependentLocality = responseData.components.double_dependent_locality;
			this.components.locality = responseData.components.locality;
			this.components.postalCode = responseData.components.postal_code;
			this.components.postalCodeShort = responseData.components.postal_code_short;
			this.components.postalCodeExtra = responseData.components.postal_code_extra;
			this.components.premise = responseData.components.premise;
			this.components.premiseExtra = responseData.components.premise_extra;
			this.components.premisePrefixNumber = responseData.components.premise_prefix_number;
			this.components.premiseNumber = responseData.components.premise_number;
			this.components.premiseType = responseData.components.premise_type;
			this.components.thoroughfare = responseData.components.thoroughfare;
			this.components.thoroughfarePredirection = responseData.components.thoroughfare_predirection;
			this.components.thoroughfarePostdirection = responseData.components.thoroughfare_postdirection;
			this.components.thoroughfareName = responseData.components.thoroughfare_name;
			this.components.thoroughfareTrailingType = responseData.components.thoroughfare_trailing_type;
			this.components.thoroughfareType = responseData.components.thoroughfare_type;
			this.components.dependentThoroughfare = responseData.components.dependent_thoroughfare;
			this.components.dependentThoroughfarePredirection = responseData.components.dependent_thoroughfare_predirection;
			this.components.dependentThoroughfarePostdirection = responseData.components.dependent_thoroughfare_postdirection;
			this.components.dependentThoroughfareName = responseData.components.dependent_thoroughfare_name;
			this.components.dependentThoroughfareTrailingType = responseData.components.dependent_thoroughfare_trailing_type;
			this.components.dependentThoroughfareType = responseData.components.dependent_thoroughfare_type;
			this.components.building = responseData.components.building;
			this.components.buildingLeadingType = responseData.components.building_leading_type;
			this.components.buildingName = responseData.components.building_name;
			this.components.buildingTrailingType = responseData.components.building_trailing_type;
			this.components.subBuildingType = responseData.components.sub_building_type;
			this.components.subBuildingNumber = responseData.components.sub_building_number;
			this.components.subBuildingName = responseData.components.sub_building_name;
			this.components.subBuilding = responseData.components.sub_building;
			this.components.postBox = responseData.components.post_box;
			this.components.postBoxType = responseData.components.post_box_type;
			this.components.postBoxNumber = responseData.components.post_box_number;
		}

		this.analysis = {};
		if (responseData.analysis !== undefined) {
			this.analysis.verificationStatus = responseData.analysis.verification_status;
			this.analysis.addressPrecision = responseData.analysis.address_precision;
			this.analysis.maxAddressPrecision = responseData.analysis.max_address_precision;
		}

		this.metadata = {};
		if (responseData.metadata !== undefined) {
			this.metadata.latitude = responseData.metadata.latitude;
			this.metadata.longitude = responseData.metadata.longitude;
			this.metadata.geocodePrecision = responseData.metadata.geocode_precision;
			this.metadata.maxGeocodePrecision = responseData.metadata.max_geocode_precision;
			this.metadata.addressFormat = responseData.metadata.address_format;
		}
	}
}

module.exports = Candidate;