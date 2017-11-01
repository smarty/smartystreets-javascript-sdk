class Candidate {
	constructor(responseData) {
		this.inputIndex = responseData.input_index;
		this.candidateIndex = responseData.candidate_index;
		this.addressee = responseData.addressee;
		this.deliveryLine1 = responseData.delivery_line_1;
		this.deliveryLine2 = responseData.delivery_line_2;
		this.lastLine = responseData.last_line;
		this.deliveryPointBarcode = responseData.delivery_point_barcode;
		this.components = {
			urbanization: responseData.components.urbanization,
			primaryNumber: responseData.components.primary_number,
			streetName: responseData.components.street_name,
			streetPredirection: responseData.components.street_predirection,
			streetPostdirection: responseData.components.street_postdirection,
			streetSuffix: responseData.components.street_suffix,
			secondaryNumber: responseData.components.secondary_number,
			secondaryDesignator: responseData.components.secondary_designator,
			extraSecondaryNumber: responseData.components.extra_secondary_number,
			extraSecondaryDesignator: responseData.components.extra_secondary_designator,
			pmbDesignator: responseData.components.pmb_designator,
			pmbNumber: responseData.components.pmb_number,
			cityName: responseData.components.city_name,
			defaultCityName: responseData.components.default_city_name,
			stateAbbreviation: responseData.components.state_abbreviation,
			zipcode: responseData.components.zipcode,
			plus4Code: responseData.components.plus4_code,
			deliveryPoint: responseData.components.delivery_point,
			deliveryPointCheckDigit: responseData.components.delivery_point_check_digit
		};
		this.metadata = {
			recordType: responseData.metadata.record_type,
			zipType: responseData.metadata.zip_type,
			countyFips: responseData.metadata.county_fips,
			countyName: responseData.metadata.county_name,
			carrierRoute: responseData.metadata.carrier_route,
			congressionalDistrict: responseData.metadata.congressional_district,
			buildingDefaultIndicator: responseData.metadata.building_default_indicator,
			rdi: responseData.metadata.rdi,
			elotSequence: responseData.metadata.elot_sequence,
			elotSort: responseData.metadata.elot_sort,
			latitude: responseData.metadata.latitude,
			longitude: responseData.metadata.longitude,
			precision: responseData.metadata.precision,
			timeZone: responseData.metadata.time_zone,
			utcOffset: responseData.metadata.utc_offset,
			obeysDst: responseData.metadata.dst
		};
		this.analysis = {
			dpvMatchCode: responseData.analysis.dpv_match_code,
			dpvFootnotes: responseData.analysis.dpv_footnotes,
			cmra: responseData.analysis.dpv_cmra,
			vacant: responseData.analysis.dpv_vacant,
			active: responseData.analysis.active,
			isEwsMatch: responseData.analysis.ews_match,
			footnotes: responseData.analysis.footnotes,
			lacsLinkCode: responseData.analysis.lacslink_code,
			lacsLinkIndicator: responseData.analysis.lacslink_indicator,
			isSuiteLinkMatch: responseData.analysis.suitelink_match
		};
	}
}

module.exports = Candidate;