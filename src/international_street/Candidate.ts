export interface IntlStreetComponents {
	countryIso3: string | undefined;
	superAdministrativeArea: string | undefined;
	administrativeArea: string | undefined;
	administrativeAreaIso2: string | undefined;
	administrativeAreaShort: string | undefined;
	administrativeAreaLong: string | undefined;
	subAdministrativeArea: string | undefined;
	dependentLocality: string | undefined;
	dependentLocalityName: string | undefined;
	doubleDependentLocality: string | undefined;
	locality: string | undefined;
	postalCode: string | undefined;
	postalCodeShort: string | undefined;
	postalCodeExtra: string | undefined;
	premise: string | undefined;
	premiseExtra: string | undefined;
	premisePrefixNumber: string | undefined;
	premiseNumber: string | undefined;
	premiseType: string | undefined;
	thoroughfare: string | undefined;
	thoroughfarePredirection: string | undefined;
	thoroughfarePostdirection: string | undefined;
	thoroughfareName: string | undefined;
	thoroughfareTrailingType: string | undefined;
	thoroughfareType: string | undefined;
	dependentThoroughfare: string | undefined;
	dependentThoroughfarePredirection: string | undefined;
	dependentThoroughfarePostdirection: string | undefined;
	dependentThoroughfareName: string | undefined;
	dependentThoroughfareTrailingType: string | undefined;
	dependentThoroughfareType: string | undefined;
	building: string | undefined;
	buildingLeadingType: string | undefined;
	buildingName: string | undefined;
	buildingTrailingType: string | undefined;
	subBuildingType: string | undefined;
	subBuildingNumber: string | undefined;
	subBuildingName: string | undefined;
	subBuilding: string | undefined;
	levelType: string | undefined;
	levelNumber: string | undefined;
	postBox: string | undefined;
	postBoxType: string | undefined;
	postBoxNumber: string | undefined;
	additionalContent: string | undefined;
	deliveryInstallation: string | undefined;
	deliveryInstallationType: string | undefined;
	deliveryInstallationQualifierName: string | undefined;
	route: string | undefined;
	routeNumber: string | undefined;
	routeType: string | undefined;
}

export interface IntlChangesComponents {
	countryIso3: string | undefined;
	superAdministrativeArea: string | undefined;
	administrativeArea: string | undefined;
	administrativeAreaIso2: string | undefined;
	administrativeAreaShort: string | undefined;
	administrativeAreaLong: string | undefined;
	subAdministrativeArea: string | undefined;
	dependentLocality: string | undefined;
	dependentLocalityName: string | undefined;
	doubleDependentLocality: string | undefined;
	locality: string | undefined;
	postalCode: string | undefined;
	postalCodeShort: string | undefined;
	postalCodeExtra: string | undefined;
	premise: string | undefined;
	premiseExtra: string | undefined;
	premisePrefixNumber: string | undefined;
	premiseNumber: string | undefined;
	premiseType: string | undefined;
	thoroughfare: string | undefined;
	thoroughfarePredirection: string | undefined;
	thoroughfarePostdirection: string | undefined;
	thoroughfareName: string | undefined;
	thoroughfareTrailingType: string | undefined;
	thoroughfareType: string | undefined;
	dependentThoroughfare: string | undefined;
	dependentThoroughfarePredirection: string | undefined;
	dependentThoroughfarePostdirection: string | undefined;
	dependentThoroughfareName: string | undefined;
	dependentThoroughfareTrailingType: string | undefined;
	dependentThoroughfareType: string | undefined;
	building: string | undefined;
	buildingLeadingType: string | undefined;
	buildingName: string | undefined;
	buildingTrailingType: string | undefined;
	subBuildingType: string | undefined;
	subBuildingNumber: string | undefined;
	subBuildingName: string | undefined;
	subBuilding: string | undefined;
	levelType: string | undefined;
	levelNumber: string | undefined;
	postBox: string | undefined;
	postBoxType: string | undefined;
	postBoxNumber: string | undefined;
}

export interface IntlChanges {
	organization: string | undefined;
	address1: string | undefined;
	address2: string | undefined;
	address3: string | undefined;
	address4: string | undefined;
	address5: string | undefined;
	address6: string | undefined;
	address7: string | undefined;
	address8: string | undefined;
	address9: string | undefined;
	address10: string | undefined;
	address11: string | undefined;
	address12: string | undefined;
	components: IntlChangesComponents;
}

export interface IntlStreetAnalysis {
	verificationStatus: string | undefined;
	addressPrecision: string | undefined;
	maxAddressPrecision: string | undefined;
	changes: IntlChanges;
}

export interface IntlStreetMetadata {
	latitude: number | undefined;
	longitude: number | undefined;
	geocodePrecision: string | undefined;
	maxGeocodePrecision: string | undefined;
	addressFormat: string | undefined;
	occupantUse: string | undefined;
}

export default class Candidate {
	organization: string;
	address1: string;
	address2: string;
	address3: string;
	address4: string;
	address5: string;
	address6: string;
	address7: string;
	address8: string;
	address9: string;
	address10: string;
	address11: string;
	address12: string;
	components: IntlStreetComponents;
	analysis: IntlStreetAnalysis;
	metadata: IntlStreetMetadata;

	constructor(responseData: Record<string, any>) {
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

		this.components = {} as IntlStreetComponents;
		if (responseData.components !== undefined) {
			this.components.countryIso3 = responseData.components.country_iso_3;
			this.components.superAdministrativeArea = responseData.components.super_administrative_area;
			this.components.administrativeArea = responseData.components.administrative_area;
			this.components.administrativeAreaIso2 = responseData.components.administrative_area_iso2;
			this.components.administrativeAreaShort = responseData.components.administrative_area_short;
			this.components.administrativeAreaLong = responseData.components.administrative_area_long;
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
			this.components.thoroughfarePostdirection =
				responseData.components.thoroughfare_postdirection;
			this.components.thoroughfareName = responseData.components.thoroughfare_name;
			this.components.thoroughfareTrailingType = responseData.components.thoroughfare_trailing_type;
			this.components.thoroughfareType = responseData.components.thoroughfare_type;
			this.components.dependentThoroughfare = responseData.components.dependent_thoroughfare;
			this.components.dependentThoroughfarePredirection =
				responseData.components.dependent_thoroughfare_predirection;
			this.components.dependentThoroughfarePostdirection =
				responseData.components.dependent_thoroughfare_postdirection;
			this.components.dependentThoroughfareName =
				responseData.components.dependent_thoroughfare_name;
			this.components.dependentThoroughfareTrailingType =
				responseData.components.dependent_thoroughfare_trailing_type;
			this.components.dependentThoroughfareType =
				responseData.components.dependent_thoroughfare_type;
			this.components.building = responseData.components.building;
			this.components.buildingLeadingType = responseData.components.building_leading_type;
			this.components.buildingName = responseData.components.building_name;
			this.components.buildingTrailingType = responseData.components.building_trailing_type;
			this.components.subBuildingType = responseData.components.sub_building_type;
			this.components.subBuildingNumber = responseData.components.sub_building_number;
			this.components.subBuildingName = responseData.components.sub_building_name;
			this.components.subBuilding = responseData.components.sub_building;
			this.components.levelType = responseData.components.level_type;
			this.components.levelNumber = responseData.components.level_number;
			this.components.postBox = responseData.components.post_box;
			this.components.postBoxType = responseData.components.post_box_type;
			this.components.postBoxNumber = responseData.components.post_box_number;
			this.components.additionalContent = responseData.components.additional_content;
			this.components.deliveryInstallation = responseData.components.delivery_installation;
			this.components.deliveryInstallationType = responseData.components.delivery_installation_type;
			this.components.deliveryInstallationQualifierName =
				responseData.components.delivery_installation_qualifier_name;
			this.components.route = responseData.components.route;
			this.components.routeNumber = responseData.components.route_number;
			this.components.routeType = responseData.components.route_type;
		}

		this.analysis = {} as IntlStreetAnalysis;
		if (responseData.analysis !== undefined) {
			this.analysis.verificationStatus = responseData.analysis.verification_status;
			this.analysis.addressPrecision = responseData.analysis.address_precision;
			this.analysis.maxAddressPrecision = responseData.analysis.max_address_precision;

			this.analysis.changes = {} as IntlChanges;
			if (responseData.analysis.changes !== undefined) {
				this.analysis.changes.organization = responseData.analysis.changes.organization;
				this.analysis.changes.address1 = responseData.analysis.changes.address1;
				this.analysis.changes.address2 = responseData.analysis.changes.address2;
				this.analysis.changes.address3 = responseData.analysis.changes.address3;
				this.analysis.changes.address4 = responseData.analysis.changes.address4;
				this.analysis.changes.address5 = responseData.analysis.changes.address5;
				this.analysis.changes.address6 = responseData.analysis.changes.address6;
				this.analysis.changes.address7 = responseData.analysis.changes.address7;
				this.analysis.changes.address8 = responseData.analysis.changes.address8;
				this.analysis.changes.address9 = responseData.analysis.changes.address9;
				this.analysis.changes.address10 = responseData.analysis.changes.address10;
				this.analysis.changes.address11 = responseData.analysis.changes.address11;
				this.analysis.changes.address12 = responseData.analysis.changes.address12;

				this.analysis.changes.components = {} as IntlChangesComponents;
				if (responseData.analysis.changes.components !== undefined) {
					this.analysis.changes.components.countryIso3 =
						responseData.analysis.changes.components.country_iso_3;
					this.analysis.changes.components.superAdministrativeArea =
						responseData.analysis.changes.components.super_administrative_area;
					this.analysis.changes.components.administrativeArea =
						responseData.analysis.changes.components.administrative_area;
					this.analysis.changes.components.administrativeAreaIso2 =
						responseData.analysis.changes.components.administrative_area_iso2;
					this.analysis.changes.components.administrativeAreaShort =
						responseData.analysis.changes.components.administrative_area_short;
					this.analysis.changes.components.administrativeAreaLong =
						responseData.analysis.changes.components.administrative_area_long;
					this.analysis.changes.components.subAdministrativeArea =
						responseData.analysis.changes.components.sub_administrative_area;
					this.analysis.changes.components.dependentLocality =
						responseData.analysis.changes.components.dependent_locality;
					this.analysis.changes.components.dependentLocalityName =
						responseData.analysis.changes.components.dependent_locality_name;
					this.analysis.changes.components.doubleDependentLocality =
						responseData.analysis.changes.components.double_dependent_locality;
					this.analysis.changes.components.locality =
						responseData.analysis.changes.components.locality;
					this.analysis.changes.components.postalCode =
						responseData.analysis.changes.components.postal_code;
					this.analysis.changes.components.postalCodeShort =
						responseData.analysis.changes.components.postal_code_short;
					this.analysis.changes.components.postalCodeExtra =
						responseData.analysis.changes.components.postal_code_extra;
					this.analysis.changes.components.premise =
						responseData.analysis.changes.components.premise;
					this.analysis.changes.components.premiseExtra =
						responseData.analysis.changes.components.premise_extra;
					this.analysis.changes.components.premisePrefixNumber =
						responseData.analysis.changes.components.premise_prefix_number;
					this.analysis.changes.components.premiseNumber =
						responseData.analysis.changes.components.premise_number;
					this.analysis.changes.components.premiseType =
						responseData.analysis.changes.components.premise_type;
					this.analysis.changes.components.thoroughfare =
						responseData.analysis.changes.components.thoroughfare;
					this.analysis.changes.components.thoroughfarePredirection =
						responseData.analysis.changes.components.thoroughfare_predirection;
					this.analysis.changes.components.thoroughfarePostdirection =
						responseData.analysis.changes.components.thoroughfare_postdirection;
					this.analysis.changes.components.thoroughfareName =
						responseData.analysis.changes.components.thoroughfare_name;
					this.analysis.changes.components.thoroughfareTrailingType =
						responseData.analysis.changes.components.thoroughfare_trailing_type;
					this.analysis.changes.components.thoroughfareType =
						responseData.analysis.changes.components.thoroughfare_type;
					this.analysis.changes.components.dependentThoroughfare =
						responseData.analysis.changes.components.dependent_thoroughfare;
					this.analysis.changes.components.dependentThoroughfarePredirection =
						responseData.analysis.changes.components.dependent_thoroughfare_predirection;
					this.analysis.changes.components.dependentThoroughfarePostdirection =
						responseData.analysis.changes.components.dependent_thoroughfare_postdirection;
					this.analysis.changes.components.dependentThoroughfareName =
						responseData.analysis.changes.components.dependent_thoroughfare_name;
					this.analysis.changes.components.dependentThoroughfareTrailingType =
						responseData.analysis.changes.components.dependent_thoroughfare_trailing_type;
					this.analysis.changes.components.dependentThoroughfareType =
						responseData.analysis.changes.components.dependent_thoroughfare_type;
					this.analysis.changes.components.building =
						responseData.analysis.changes.components.building;
					this.analysis.changes.components.buildingLeadingType =
						responseData.analysis.changes.components.building_leading_type;
					this.analysis.changes.components.buildingName =
						responseData.analysis.changes.components.building_name;
					this.analysis.changes.components.buildingTrailingType =
						responseData.analysis.changes.components.building_trailing_type;
					this.analysis.changes.components.subBuildingType =
						responseData.analysis.changes.components.sub_building_type;
					this.analysis.changes.components.subBuildingNumber =
						responseData.analysis.changes.components.sub_building_number;
					this.analysis.changes.components.subBuildingName =
						responseData.analysis.changes.components.sub_building_name;
					this.analysis.changes.components.subBuilding =
						responseData.analysis.changes.components.sub_building;
					this.analysis.changes.components.levelType =
						responseData.analysis.changes.components.level_type;
					this.analysis.changes.components.levelNumber =
						responseData.analysis.changes.components.level_number;
					this.analysis.changes.components.postBox =
						responseData.analysis.changes.components.post_box;
					this.analysis.changes.components.postBoxType =
						responseData.analysis.changes.components.post_box_type;
					this.analysis.changes.components.postBoxNumber =
						responseData.analysis.changes.components.post_box_number;
				}
				//TODO: Fill in the rest of these fields and their corresponding tests.
			}
		}

		this.metadata = {} as IntlStreetMetadata;
		if (responseData.metadata !== undefined) {
			this.metadata.latitude = responseData.metadata.latitude;
			this.metadata.longitude = responseData.metadata.longitude;
			this.metadata.geocodePrecision = responseData.metadata.geocode_precision;
			this.metadata.maxGeocodePrecision = responseData.metadata.max_geocode_precision;
			this.metadata.addressFormat = responseData.metadata.address_format;
			this.metadata.occupantUse = responseData.metadata.occupant_use;
		}
	}
}
