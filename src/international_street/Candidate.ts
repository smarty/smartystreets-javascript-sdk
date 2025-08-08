export interface CandidateData {
	[key: string]: any;
}

export default class Candidate {
	[key: string]: any;
	components: any = {};
	metadata: any = {};
	analysis: any = {};

	constructor(responseData: CandidateData) {
		Object.assign(this, responseData);
		if (responseData.components) {
			const c = responseData.components;
			this.components = {
				countryIso3: c.country_iso_3,
				superAdministrativeArea: c.super_administrative_area,
				administrativeArea: c.administrative_area,
				administrativeAreaIso2: c.administrative_area_iso2,
				administrativeAreaShort: c.administrative_area_short,
				administrativeAreaLong: c.administrative_area_long,
				subAdministrativeArea: c.sub_administrative_area,
				dependentLocality: c.dependent_locality,
				dependentLocalityName: c.dependent_locality_name,
				doubleDependentLocality: c.double_dependent_locality,
				locality: c.locality,
				postalCode: c.postal_code,
				postalCodeShort: c.postal_code_short,
				postalCodeExtra: c.postal_code_extra,
				premise: c.premise,
				premiseExtra: c.premise_extra,
				premisePrefixNumber: c.premise_prefix_number,
				premiseNumber: c.premise_number,
				premiseType: c.premise_type,
				thoroughfare: c.thoroughfare,
				thoroughfarePredirection: c.thoroughfare_predirection,
				thoroughfarePostdirection: c.thoroughfare_postdirection,
				thoroughfareName: c.thoroughfare_name,
				thoroughfareTrailingType: c.thoroughfare_trailing_type,
				thoroughfareType: c.thoroughfare_type,
				dependentThoroughfare: c.dependent_thoroughfare,
				dependentThoroughfarePredirection: c.dependent_thoroughfare_predirection,
				dependentThoroughfarePostdirection: c.dependent_thoroughfare_postdirection,
				dependentThoroughfareName: c.dependent_thoroughfare_name,
				dependentThoroughfareTrailingType: c.dependent_thoroughfare_trailing_type,
				dependentThoroughfareType: c.dependent_thoroughfare_type,
				building: c.building,
				buildingLeadingType: c.building_leading_type,
				buildingName: c.building_name,
				buildingTrailingType: c.building_trailing_type,
				subBuildingType: c.sub_building_type,
				subBuildingNumber: c.sub_building_number,
				subBuildingName: c.sub_building_name,
				subBuilding: c.sub_building,
				levelType: c.level_type,
				levelNumber: c.level_number,
				postBox: c.post_box,
				postBoxType: c.post_box_type,
				postBoxNumber: c.post_box_number,
			};
		}
		if (responseData.metadata) {
			const m = responseData.metadata;
			this.metadata = {
				latitude: m.latitude,
				longitude: m.longitude,
				geocodePrecision: m.geocode_precision,
				maxGeocodePrecision: m.max_geocode_precision,
				addressFormat: m.address_format,
			};
		}
		if (responseData.analysis) {
			const a = responseData.analysis;
			this.analysis = {
				verificationStatus: a.verification_status,
				addressPrecision: a.address_precision,
				maxAddressPrecision: a.max_address_precision,
				changes: {
					organization: a.changes?.organization,
					address1: a.changes?.address1,
					address2: a.changes?.address2,
					address3: a.changes?.address3,
					address4: a.changes?.address4,
					address5: a.changes?.address5,
					address6: a.changes?.address6,
					address7: a.changes?.address7,
					address8: a.changes?.address8,
					address9: a.changes?.address9,
					address10: a.changes?.address10,
					address11: a.changes?.address11,
					address12: a.changes?.address12,
					components: {
						countryIso3: a.changes?.components?.country_iso_3,
						superAdministrativeArea: a.changes?.components?.super_administrative_area,
						administrativeArea: a.changes?.components?.administrative_area,
						administrativeAreaShort: a.changes?.components?.administrative_area_short,
						administrativeAreaLong: a.changes?.components?.administrative_area_long,
						subAdministrativeArea: a.changes?.components?.sub_administrative_area,
						dependentLocality: a.changes?.components?.dependent_locality,
						dependentLocalityName: a.changes?.components?.dependent_locality_name,
						doubleDependentLocality: a.changes?.components?.double_dependent_locality,
						locality: a.changes?.components?.locality,
						postalCode: a.changes?.components?.postal_code,
						postalCodeShort: a.changes?.components?.postal_code_short,
						postalCodeExtra: a.changes?.components?.postal_code_extra,
						premise: a.changes?.components?.premise,
						premiseExtra: a.changes?.components?.premise_extra,
						premisePrefixNumber: a.changes?.components?.premise_prefix_number,
						premiseNumber: a.changes?.components?.premise_number,
						premiseType: a.changes?.components?.premise_type,
						thoroughfare: a.changes?.components?.thoroughfare,
						thoroughfarePredirection: a.changes?.components?.thoroughfare_predirection,
						thoroughfarePostdirection: a.changes?.components?.thoroughfare_postdirection,
						thoroughfareName: a.changes?.components?.thoroughfare_name,
						thoroughfareTrailingType: a.changes?.components?.thoroughfare_trailing_type,
						thoroughfareType: a.changes?.components?.thoroughfare_type,
						dependentThoroughfare: a.changes?.components?.dependent_thoroughfare,
						dependentThoroughfarePredirection:
							a.changes?.components?.dependent_thoroughfare_predirection,
						dependentThoroughfarePostdirection:
							a.changes?.components?.dependent_thoroughfare_postdirection,
						dependentThoroughfareName: a.changes?.components?.dependent_thoroughfare_name,
						dependentThoroughfareTrailingType:
							a.changes?.components?.dependent_thoroughfare_trailing_type,
						dependentThoroughfareType: a.changes?.components?.dependent_thoroughfare_type,
						building: a.changes?.components?.building,
						buildingLeadingType: a.changes?.components?.building_leading_type,
						buildingName: a.changes?.components?.building_name,
						buildingTrailingType: a.changes?.components?.building_trailing_type,
						subBuildingType: a.changes?.components?.sub_building_type,
						subBuildingNumber: a.changes?.components?.sub_building_number,
						subBuildingName: a.changes?.components?.sub_building_name,
						subBuilding: a.changes?.components?.sub_building,
						levelType: a.changes?.components?.level_type,
						levelNumber: a.changes?.components?.level_number,
						postBox: a.changes?.components?.post_box,
						postBoxType: a.changes?.components?.post_box_type,
						postBoxNumber: a.changes?.components?.post_box_number,
					},
				},
			};
		}
	}
}
