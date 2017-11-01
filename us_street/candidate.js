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
			primary_number: responseData.components.primary_number,
			street_name: responseData.components.street_name,
			street_predirection: responseData.components.street_predirection,
			street_postdirection: responseData.components.street_postdirection,
			street_suffix: responseData.components.street_suffix,
			secondary_number: responseData.components.secondary_number,
			secondary_designator: responseData.components.secondary_designator,
			extra_secondary_number: responseData.components.extra_secondary_number,
			extra_secondary_designator: responseData.components.extra_secondary_designator,
			pmb_designator: responseData.components.pmb_designator,
			pmb_number: responseData.components.pmb_number,
			city_name: responseData.components.city_name,
			default_city_name: responseData.components.default_city_name,
			state_abbreviation: responseData.components.state_abbreviation,
			zipcode: responseData.components.zipcode,
			plus4_code: responseData.components.plus4_code,
			delivery_point: responseData.components.delivery_point,
			delivery_point_check_digit: responseData.components.delivery_point_check_digit
		};
		this.metadata = {
			record_type: responseData.metadata.record_type,
			zip_type: responseData.metadata.zip_type,
			county_fips: responseData.metadata.county_fips,
			county_name: responseData.metadata.county_name,
			carrier_route: responseData.metadata.carrier_route,
			congressional_district: responseData.metadata.congressional_district,
			building_default_indicator: responseData.metadata.building_default_indicator,
			rdi: responseData.metadata.rdi,
			elot_sequence: responseData.metadata.elot_sequence,
			elot_sort: responseData.metadata.elot_sort,
			latitude: responseData.metadata.latitude,
			longitude: responseData.metadata.longitude,
			precision: responseData.metadata.precision,
			time_zone: responseData.metadata.time_zone,
			utc_offset: responseData.metadata.utc_offset,
			obeys_dst: responseData.metadata.dst
		};

		this.analysis = {
			dpv_match_code: responseData.analysis.dpv_match_code,
			dpv_footnotes: responseData.analysis.dpv_footnotes,
			cmra: responseData.analysis.dpv_cmra,
			vacant: responseData.analysis.dpv_vacant,
			active: responseData.analysis.active,
			is_ews_match: responseData.analysis.ews_match,
			footnotes: responseData.analysis.footnotes,
			lacs_link_code: responseData.analysis.lacslink_code,
			lacs_link_indicator: responseData.analysis.lacslink_indicator,
			is_suite_link_match: responseData.analysis.suitelink_match
		};
	}
}

module.exports = Candidate;