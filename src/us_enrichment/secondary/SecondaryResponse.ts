interface RawRootAddress {
	secondary_count?: number;
	smarty_key?: string;
	primary_number?: string;
	street_predirection?: string;
	street_name?: string;
	street_suffix?: string;
	street_postdirection?: string;
	city_name?: string;
	state_abbreviation?: string;
	zipcode?: string;
	plus4_code?: string;
}

interface RawAlias {
	smarty_key?: string;
	primary_number?: string;
	street_predirection?: string;
	street_name?: string;
	street_suffix?: string;
	street_postdirection?: string;
	city_name?: string;
	state_abbreviation?: string;
	zipcode?: string;
	plus4_code?: string;
}

interface RawSecondaryEntry {
	smarty_key?: string;
	secondary_designator?: string;
	secondary_number?: string;
	plus4_code?: string;
}

interface RawSecondaryResponse {
	smarty_key?: string;
	root_address?: RawRootAddress;
	aliases?: RawAlias[];
	secondaries?: RawSecondaryEntry[];
}

export class RootAddress {
	secondaryCount: number | undefined;
	smartyKey: string | undefined;
	primaryNumber: string | undefined;
	streetPredirection: string | undefined;
	streetName: string | undefined;
	streetSuffix: string | undefined;
	streetPostdirection: string | undefined;
	cityName: string | undefined;
	stateAbbreviation: string | undefined;
	zipcode: string | undefined;
	plus4Code: string | undefined;

	constructor(raw?: RawRootAddress) {
		this.secondaryCount = raw?.secondary_count;
		this.smartyKey = raw?.smarty_key;
		this.primaryNumber = raw?.primary_number;
		this.streetPredirection = raw?.street_predirection;
		this.streetName = raw?.street_name;
		this.streetSuffix = raw?.street_suffix;
		this.streetPostdirection = raw?.street_postdirection;
		this.cityName = raw?.city_name;
		this.stateAbbreviation = raw?.state_abbreviation;
		this.zipcode = raw?.zipcode;
		this.plus4Code = raw?.plus4_code;
	}
}

export class Alias {
	smartyKey: string | undefined;
	primaryNumber: string | undefined;
	streetPredirection: string | undefined;
	streetName: string | undefined;
	streetSuffix: string | undefined;
	streetPostdirection: string | undefined;
	cityName: string | undefined;
	stateAbbreviation: string | undefined;
	zipcode: string | undefined;
	plus4Code: string | undefined;

	constructor(raw?: RawAlias) {
		this.smartyKey = raw?.smarty_key;
		this.primaryNumber = raw?.primary_number;
		this.streetPredirection = raw?.street_predirection;
		this.streetName = raw?.street_name;
		this.streetSuffix = raw?.street_suffix;
		this.streetPostdirection = raw?.street_postdirection;
		this.cityName = raw?.city_name;
		this.stateAbbreviation = raw?.state_abbreviation;
		this.zipcode = raw?.zipcode;
		this.plus4Code = raw?.plus4_code;
	}
}

export class SecondaryEntry {
	smartyKey: string | undefined;
	secondaryDesignator: string | undefined;
	secondaryNumber: string | undefined;
	plus4Code: string | undefined;

	constructor(raw?: RawSecondaryEntry) {
		this.smartyKey = raw?.smarty_key;
		this.secondaryDesignator = raw?.secondary_designator;
		this.secondaryNumber = raw?.secondary_number;
		this.plus4Code = raw?.plus4_code;
	}
}

export default class SecondaryResponse {
	smartyKey: string | undefined;
	rootAddress: RootAddress;
	aliases: Alias[];
	secondaries: SecondaryEntry[];

	constructor(raw?: RawSecondaryResponse) {
		this.smartyKey = raw?.smarty_key;
		this.rootAddress = new RootAddress(raw?.root_address);
		this.aliases = (raw?.aliases ?? []).map((a) => new Alias(a));
		this.secondaries = (raw?.secondaries ?? []).map((s) => new SecondaryEntry(s));
	}
}
