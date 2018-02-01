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
			this.components.country_iso_3 = responseData.components.country_iso_3;
			this.components.super_administrative_area = responseData.components.super_administrative_area;
			this.components.administrative_area = responseData.components.administrative_area;
			this.components.sub_administrative_area = responseData.components.sub_administrative_area;
			this.components.dependent_locality = responseData.components.dependent_locality;
			this.components.dependent_locality_name = responseData.components.dependent_locality_name;
			this.components.double_dependent_locality = responseData.components.double_dependent_locality;
			this.components.locality = responseData.components.locality;
			this.components.postal_code = responseData.components.postal_code;
			this.components.postal_code_short = responseData.components.postal_code_short;
			this.components.postal_code_extra = responseData.components.postal_code_extra;
			this.components.premise = responseData.components.premise;
			this.components.premise_extra = responseData.components.premise_extra;
			this.components.premise_number = responseData.components.premise_number;
			this.components.premise_type = responseData.components.premise_type;
			this.components.thoroughfare = responseData.components.thoroughfare;
			this.components.thoroughfare_predirection = responseData.components.thoroughfare_predirection;
			this.components.thoroughfare_postdirection = responseData.components.thoroughfare_postdirection;
			this.components.thoroughfare_name = responseData.components.thoroughfare_name;
			this.components.thoroughfare_trailing_type = responseData.components.thoroughfare_trailing_type;
			this.components.thoroughfare_type = responseData.components.thoroughfare_type;
			this.components.dependent_thoroughfare = responseData.components.dependent_thoroughfare;
			this.components.dependent_thoroughfare_predirection = responseData.components.dependent_thoroughfare_predirection;
			this.components.dependent_thoroughfare_postdirection = responseData.components.dependent_thoroughfare_postdirection;
			this.components.dependent_thoroughfare_name = responseData.components.dependent_thoroughfare_name;
			this.components.dependent_thoroughfare_trailing_type = responseData.components.dependent_thoroughfare_trailing_type;
			this.components.dependent_thoroughfare_type = responseData.components.dependent_thoroughfare_type;
			this.components.building = responseData.components.building;
			this.components.building_leading_type = responseData.components.building_leading_type;
			this.components.building_name = responseData.components.building_name;
			this.components.building_trailing_type = responseData.components.building_trailing_type;
			this.components.sub_building_type = responseData.components.sub_building_type;
			this.components.sub_building_number = responseData.components.sub_building_number;
			this.components.sub_building_name = responseData.components.sub_building_name;
			this.components.sub_building = responseData.components.sub_building;
			this.components.post_box = responseData.components.post_box;
			this.components.post_box_type = responseData.components.post_box_type;
			this.components.post_box_number = responseData.components.post_box_number;
		}

		this.analysis = {};
		if (responseData.analysis !== undefined) {
			this.analysis.verification_status = responseData.analysis.verification_status;
			this.analysis.address_precision = responseData.analysis.address_precision;
			this.analysis.max_address_precision = responseData.analysis.max_address_precision;
		}

		this.metadata = {};
		if (responseData.metadata !== undefined) {
			this.metadata.latitude = responseData.metadata.latitude;
			this.metadata.longitude = responseData.metadata.longitude;
			this.metadata.geocode_precision = responseData.metadata.geocode_precision;
			this.metadata.max_geocode_precision = responseData.metadata.max_geocode_precision;
			this.metadata.address_format = responseData.metadata.address_format;
		}
	}
}

module.exports = Candidate;