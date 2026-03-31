export type CoordinateLicense = "SmartyStreets" | "SmartyStreets Proprietary" | (string & {});

export interface MatchInfo {
	status: string | undefined;
	change: string[] | undefined;
}

export interface UsStreetComponents {
	urbanization: string | undefined;
	primaryNumber: string | undefined;
	streetName: string | undefined;
	streetPredirection: string | undefined;
	streetPostdirection: string | undefined;
	streetSuffix: string | undefined;
	secondaryNumber: string | undefined;
	secondaryDesignator: string | undefined;
	extraSecondaryNumber: string | undefined;
	extraSecondaryDesignator: string | undefined;
	pmbDesignator: string | undefined;
	pmbNumber: string | undefined;
	cityName: string | undefined;
	defaultCityName: string | undefined;
	state: string | undefined;
	zipCode: string | undefined;
	plus4Code: string | undefined;
	deliveryPoint: string | undefined;
	deliveryPointCheckDigit: string | undefined;
}

export interface UsStreetMetadata {
	recordType: string | undefined;
	zipType: string | undefined;
	countyFips: string | undefined;
	countyName: string | undefined;
	carrierRoute: string | undefined;
	congressionalDistrict: string | undefined;
	buildingDefaultIndicator: string | undefined;
	rdi: string | undefined;
	elotSequence: string | undefined;
	elotSort: string | undefined;
	latitude: number | undefined;
	longitude: number | undefined;
	coordinateLicense: CoordinateLicense | undefined;
	precision: string | undefined;
	timeZone: string | undefined;
	utcOffset: number | undefined;
	obeysDst: boolean | undefined;
	ianaTimeZone: string | undefined;
	ianaUtcOffset: number | undefined;
	ianaDst: string | undefined;
	isEwsMatch: boolean | undefined;
}

export interface AnalysisComponents {
	primaryNumber: MatchInfo;
	streetPredirection: MatchInfo;
	streetName: MatchInfo;
	streetPostdirection: MatchInfo;
	streetSuffix: MatchInfo;
	secondaryNumber: MatchInfo;
	secondaryDesignator: MatchInfo;
	extraSecondaryNumber: MatchInfo;
	extraSecondaryDesignator: MatchInfo;
	cityName: MatchInfo;
	stateAbbreviation: MatchInfo;
	zipCode: MatchInfo;
	plus4Code: MatchInfo;
	urbanization: MatchInfo;
}

export interface UsStreetAnalysis {
	dpvMatchCode: string | undefined;
	dpvFootnotes: string | undefined;
	cmra: string | undefined;
	vacant: string | undefined;
	noStat: string | undefined;
	active: string | undefined;
	isEwsMatch: boolean | undefined;
	footnotes: string | undefined;
	lacsLinkCode: string | undefined;
	lacsLinkIndicator: string | undefined;
	isSuiteLinkMatch: boolean | undefined;
	enhancedMatch: string | undefined;
	components: AnalysisComponents;
}

interface RawUsStreetComponents {
	urbanization?: string;
	primary_number?: string;
	street_name?: string;
	street_predirection?: string;
	street_postdirection?: string;
	street_suffix?: string;
	secondary_number?: string;
	secondary_designator?: string;
	extra_secondary_number?: string;
	extra_secondary_designator?: string;
	pmb_designator?: string;
	pmb_number?: string;
	city_name?: string;
	default_city_name?: string;
	state_abbreviation?: string;
	zipcode?: string;
	plus4_code?: string;
	delivery_point?: string;
	delivery_point_check_digit?: string;
}

interface RawUsStreetMetadata {
	record_type?: string;
	zip_type?: string;
	county_fips?: string;
	county_name?: string;
	carrier_route?: string;
	congressional_district?: string;
	building_default_indicator?: string;
	rdi?: string;
	elot_sequence?: string;
	elot_sort?: string;
	latitude?: number;
	longitude?: number;
	coordinate_license?: number;
	precision?: string;
	time_zone?: string;
	utc_offset?: number;
	dst?: boolean;
	iana_time_zone?: string;
	iana_utc_offset?: number;
	iana_dst?: string;
	ews_match?: boolean;
}

interface RawMatchInfo {
	status?: string;
	change?: string[];
}

interface RawUsStreetAnalysisComponents {
	primary_number?: RawMatchInfo;
	street_predirection?: RawMatchInfo;
	street_name?: RawMatchInfo;
	street_postdirection?: RawMatchInfo;
	street_suffix?: RawMatchInfo;
	secondary_number?: RawMatchInfo;
	secondary_designator?: RawMatchInfo;
	extra_secondary_number?: RawMatchInfo;
	extra_secondary_designator?: RawMatchInfo;
	city_name?: RawMatchInfo;
	state_abbreviation?: RawMatchInfo;
	zipcode?: RawMatchInfo;
	plus4_code?: RawMatchInfo;
	urbanization?: RawMatchInfo;
}

interface RawUsStreetAnalysis {
	dpv_match_code?: string;
	dpv_footnotes?: string;
	dpv_cmra?: string;
	dpv_vacant?: string;
	dpv_no_stat?: string;
	active?: string;
	ews_match?: boolean;
	footnotes?: string;
	lacslink_code?: string;
	lacslink_indicator?: string;
	suitelink_match?: boolean;
	enhanced_match?: string;
	components?: RawUsStreetAnalysisComponents;
}

export interface RawUsStreetCandidate {
	input_id?: string;
	input_index?: number;
	candidate_index?: number;
	addressee?: string;
	delivery_line_1?: string;
	delivery_line_2?: string;
	last_line?: string;
	delivery_point_barcode?: string;
	smarty_key?: string;
	smarty_key_ext?: string;
	components?: RawUsStreetComponents;
	metadata?: RawUsStreetMetadata;
	analysis?: RawUsStreetAnalysis;
}

export default class Candidate {
	inputId: string;
	inputIndex: number;
	candidateIndex: number;
	addressee: string;
	deliveryLine1: string;
	deliveryLine2: string;
	lastLine: string;
	deliveryPointBarcode: string;
	smartyKey: string;
	smartyKeyExt: string;
	components: UsStreetComponents;
	metadata: UsStreetMetadata;
	analysis: UsStreetAnalysis;

	constructor(responseData: RawUsStreetCandidate) {
		this.inputId = responseData.input_id ?? "";
		this.inputIndex = responseData.input_index ?? 0;
		this.candidateIndex = responseData.candidate_index ?? 0;
		this.addressee = responseData.addressee ?? "";
		this.deliveryLine1 = responseData.delivery_line_1 ?? "";
		this.deliveryLine2 = responseData.delivery_line_2 ?? "";
		this.lastLine = responseData.last_line ?? "";
		this.deliveryPointBarcode = responseData.delivery_point_barcode ?? "";
		this.smartyKey = responseData.smarty_key ?? "";
		this.smartyKeyExt = responseData.smarty_key_ext ?? "";

		this.components = {} as UsStreetComponents;
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

		this.metadata = {} as UsStreetMetadata;
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
			switch (responseData.metadata.coordinate_license) {
				case 1:
					this.metadata.coordinateLicense = "SmartyStreets Proprietary";
					break;
				default:
					this.metadata.coordinateLicense = "SmartyStreets";
			}
			this.metadata.precision = responseData.metadata.precision;
			this.metadata.timeZone = responseData.metadata.time_zone;
			this.metadata.utcOffset = responseData.metadata.utc_offset;
			this.metadata.obeysDst = responseData.metadata.dst;
			this.metadata.ianaTimeZone = responseData.metadata.iana_time_zone;
			this.metadata.ianaUtcOffset = responseData.metadata.iana_utc_offset;
			this.metadata.ianaDst = responseData.metadata.iana_dst;
			this.metadata.isEwsMatch = responseData.metadata.ews_match;
		}

		this.analysis = {} as UsStreetAnalysis;
		if (responseData.analysis !== undefined) {
			this.analysis.dpvMatchCode = responseData.analysis.dpv_match_code;
			this.analysis.dpvFootnotes = responseData.analysis.dpv_footnotes;
			this.analysis.cmra = responseData.analysis.dpv_cmra;
			this.analysis.vacant = responseData.analysis.dpv_vacant;
			this.analysis.noStat = responseData.analysis.dpv_no_stat;
			this.analysis.active = responseData.analysis.active;
			this.analysis.isEwsMatch = responseData.analysis.ews_match; // Deprecated, refer to metadata.ews_match
			this.analysis.footnotes = responseData.analysis.footnotes;
			this.analysis.lacsLinkCode = responseData.analysis.lacslink_code;
			this.analysis.lacsLinkIndicator = responseData.analysis.lacslink_indicator;
			this.analysis.isSuiteLinkMatch = responseData.analysis.suitelink_match;
			this.analysis.enhancedMatch = responseData.analysis.enhanced_match;
			this.analysis.components = {} as AnalysisComponents;
			if (responseData.analysis.components !== undefined) {
				const toMatchInfo = (raw?: RawMatchInfo): MatchInfo => ({
					status: raw?.status,
					change: raw?.change,
				});
				this.analysis.components.primaryNumber = toMatchInfo(
					responseData.analysis.components.primary_number,
				);
				this.analysis.components.streetPredirection = toMatchInfo(
					responseData.analysis.components.street_predirection,
				);
				this.analysis.components.streetName = toMatchInfo(
					responseData.analysis.components.street_name,
				);
				this.analysis.components.streetPostdirection = toMatchInfo(
					responseData.analysis.components.street_postdirection,
				);
				this.analysis.components.streetSuffix = toMatchInfo(
					responseData.analysis.components.street_suffix,
				);
				this.analysis.components.secondaryNumber = toMatchInfo(
					responseData.analysis.components.secondary_number,
				);
				this.analysis.components.secondaryDesignator = toMatchInfo(
					responseData.analysis.components.secondary_designator,
				);
				this.analysis.components.extraSecondaryNumber = toMatchInfo(
					responseData.analysis.components.extra_secondary_number,
				);
				this.analysis.components.extraSecondaryDesignator = toMatchInfo(
					responseData.analysis.components.extra_secondary_designator,
				);
				this.analysis.components.cityName = toMatchInfo(responseData.analysis.components.city_name);
				this.analysis.components.stateAbbreviation = toMatchInfo(
					responseData.analysis.components.state_abbreviation,
				);
				this.analysis.components.zipCode = toMatchInfo(responseData.analysis.components.zipcode);
				this.analysis.components.plus4Code = toMatchInfo(
					responseData.analysis.components.plus4_code,
				);
				this.analysis.components.urbanization = toMatchInfo(
					responseData.analysis.components.urbanization,
				);
			}
		}
	}
}
