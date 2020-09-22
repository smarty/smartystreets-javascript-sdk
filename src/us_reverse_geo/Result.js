class Result {
	constructor(responseData) {
		this.address = {};
		if (responseData.address !== undefined) {
			this.address.street = responseData.address.street;
			this.address.city = responseData.address.city;
			this.address.stateAbbreviation = responseData.address.state_abbreviation;
			this.address.zipCode = responseData.address.zip_code;
		}

		this.coordinate = responseData.coordinate;
		this.distance = responseData.distance;
		//
		// this.metadata = {};
		// if (responseData.metadata !== undefined) {
		// 	this.metadata.recordType = responseData.metadata.record_type;
		// 	this.metadata.zipType = responseData.metadata.zip_type;
		// 	this.metadata.countyFips = responseData.metadata.county_fips;
		// 	this.metadata.countyName = responseData.metadata.county_name;
		// 	this.metadata.carrierRoute = responseData.metadata.carrier_route;
		// 	this.metadata.congressionalDistrict = responseData.metadata.congressional_district;
		// 	this.metadata.buildingDefaultIndicator = responseData.metadata.building_default_indicator;
		// 	this.metadata.rdi = responseData.metadata.rdi;
		// 	this.metadata.elotSequence = responseData.metadata.elot_sequence;
		// 	this.metadata.elotSort = responseData.metadata.elot_sort;
		// 	this.metadata.latitude = responseData.metadata.latitude;
		// 	this.metadata.longitude = responseData.metadata.longitude;
		// 	this.metadata.precision = responseData.metadata.precision;
		// 	this.metadata.timeZone = responseData.metadata.time_zone;
		// 	this.metadata.utcOffset = responseData.metadata.utc_offset;
		// 	this.metadata.obeysDst = responseData.metadata.dst;
		// 	this.metadata.isEwsMatch = responseData.metadata.ews_match;
		// }
		//
		// this.analysis = {};
		// if (responseData.analysis !== undefined) {
		// 	this.analysis.dpvMatchCode = responseData.analysis.dpv_match_code;
		// 	this.analysis.dpvFootnotes = responseData.analysis.dpv_footnotes;
		// 	this.analysis.cmra = responseData.analysis.dpv_cmra;
		// 	this.analysis.vacant = responseData.analysis.dpv_vacant;
		// 	this.analysis.active = responseData.analysis.active;
		// 	this.analysis.isEwsMatch = responseData.analysis.ews_match; // Deprecated, refer to metadata.ews_match
		// 	this.analysis.footnotes = responseData.analysis.footnotes;
		// 	this.analysis.lacsLinkCode = responseData.analysis.lacslink_code;
		// 	this.analysis.lacsLinkIndicator = responseData.analysis.lacslink_indicator;
		// 	this.analysis.isSuiteLinkMatch = responseData.analysis.suitelink_match;
		// }
	}
}