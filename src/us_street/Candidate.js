/**
 * A candidate is a possible match for an address that was submitted.<br>
 *     A lookup can have multiple candidates if the address was ambiguous, and<br>
 *     the maxCandidates field is set higher than 1.
 *
 * @see "https://smartystreets.com/docs/cloud/us-street-api#root"
 */
class Candidate {
	constructor(responseData) {
		this.inputIndex = responseData.input_index;
		this.candidateIndex = responseData.candidate_index;
		this.addressee = responseData.addressee;
		this.deliveryLine1 = responseData.delivery_line_1;
		this.deliveryLine2 = responseData.delivery_line_2;
		this.lastLine = responseData.last_line;
		this.deliveryPointBarcode = responseData.delivery_point_barcode;

		this.components = {};
		if (responseData.components !== undefined) {
			this.components.urbanization = responseData.components.urbanization;
			this.components.primaryNumber = responseData.components.primary_number;
			this.components.streetName = responseData.components.street_name;
			this.components.streetPredirection = responseData.components.street_predirection;
			this.components.streetPostdirection = responseData.components.street_postdirection;
			this.components.streetSuffix = responseData.components.street_suffix;
			this.components.secondaryNumber = responseData.components.secondary_number;
			this.components.secondaryDesignator = responseData.components.secondary_designator;
			this.components.extraSecondaryNumber = responseData.components.extra_secondary_number;
			this.components.extraSecondaryDesignator = responseData.components.extra_secondary_designator;
			this.components.pmbDesignator = responseData.components.pmb_designator;
			this.components.pmbNumber = responseData.components.pmb_number;
			this.components.cityName = responseData.components.city_name;
			this.components.defaultCityName = responseData.components.default_city_name;
			this.components.state = responseData.components.state_abbreviation;
			this.components.zipCode = responseData.components.zipcode;
			this.components.plus4Code = responseData.components.plus4_code;
			this.components.deliveryPoint = responseData.components.delivery_point;
			this.components.deliveryPointCheckDigit = responseData.components.delivery_point_check_digit;
		}

		this.metadata = {};
		if (responseData.metadata !== undefined) {
			this.metadata.recordType = responseData.metadata.record_type;
			this.metadata.zipType = responseData.metadata.zip_type;
			this.metadata.countyFips = responseData.metadata.county_fips;
			this.metadata.countyName = responseData.metadata.county_name;
			this.metadata.carrierRoute = responseData.metadata.carrier_route;
			this.metadata.congressionalDistrict = responseData.metadata.congressional_district;
			this.metadata.buildingDefaultIndicator = responseData.metadata.building_default_indicator;
			this.metadata.rdi = responseData.metadata.rdi;
			this.metadata.elotSequence = responseData.metadata.elot_sequence;
			this.metadata.elotSort = responseData.metadata.elot_sort;
			this.metadata.latitude = responseData.metadata.latitude;
			this.metadata.longitude = responseData.metadata.longitude;
			this.metadata.precision = responseData.metadata.precision;
			this.metadata.timeZone = responseData.metadata.time_zone;
			this.metadata.utcOffset = responseData.metadata.utc_offset;
			this.metadata.obeysDst = responseData.metadata.dst;
			this.metadata.isEwsMatch = responseData.metadata.ews_match;
		}

		this.analysis = {};
		if (responseData.analysis !== undefined) {
			this.analysis.dpvMatchCode = responseData.analysis.dpv_match_code;
			this.analysis.dpvFootnotes = responseData.analysis.dpv_footnotes;
			this.analysis.cmra = responseData.analysis.dpv_cmra;
			this.analysis.vacant = responseData.analysis.dpv_vacant;
			this.analysis.active = responseData.analysis.active;
			this.analysis.isEwsMatch = responseData.analysis.ews_match; // Deprecated, refer to metadata.ews_match
			this.analysis.footnotes = responseData.analysis.footnotes;
			this.analysis.lacsLinkCode = responseData.analysis.lacslink_code;
			this.analysis.lacsLinkIndicator = responseData.analysis.lacslink_indicator;
			this.analysis.isSuiteLinkMatch = responseData.analysis.suitelink_match;
		}
	}
}

module.exports = Candidate;