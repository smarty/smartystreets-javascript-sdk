export interface CityEntry {
	city: string;
	stateAbbreviation: string;
	state: string;
	mailableCity: boolean;
}

export interface AlternateCounty {
	countyFips: string;
	countyName: string;
	stateAbbreviation: string;
	state: string;
}

export interface ZipcodeEntry {
	zipcode: string;
	zipcodeType: string;
	defaultCity: string;
	countyFips: string;
	countyName: string;
	latitude: number;
	longitude: number;
	precision: string;
	stateAbbreviation: string;
	state: string;
	alternateCounties: AlternateCounty[];
}

interface RawAlternateCounty {
	county_fips?: string;
	county_name?: string;
	state_abbreviation?: string;
	state?: string;
}

interface RawCityState {
	city?: string;
	state_abbreviation?: string;
	state?: string;
	mailable_city?: boolean;
}

interface RawZipcode {
	zipcode?: string;
	zipcode_type?: string;
	default_city?: string;
	county_fips?: string;
	county_name?: string;
	latitude?: number;
	longitude?: number;
	precision?: string;
	state_abbreviation?: string;
	state?: string;
	alternate_counties?: RawAlternateCounty[];
}

export interface RawZipcodeResult {
	input_index?: number;
	status?: string;
	reason?: string;
	city_states?: RawCityState[];
	zipcodes?: RawZipcode[];
}

export default class Result {
	inputIndex: number;
	status: string | undefined;
	reason: string | undefined;
	valid: boolean;
	cities: CityEntry[];
	zipcodes: ZipcodeEntry[];

	constructor(responseData: RawZipcodeResult) {
		this.inputIndex = responseData.input_index ?? 0;
		this.status = responseData.status;
		this.reason = responseData.reason;
		this.valid = this.status === undefined && this.reason === undefined;

		this.cities = !responseData.city_states
			? []
			: responseData.city_states.map((city): CityEntry => {
					return {
						city: city.city ?? "",
						stateAbbreviation: city.state_abbreviation ?? "",
						state: city.state ?? "",
						mailableCity: city.mailable_city ?? false,
					};
				});

		this.zipcodes = !responseData.zipcodes
			? []
			: responseData.zipcodes.map((zipcode): ZipcodeEntry => {
					return {
						zipcode: zipcode.zipcode ?? "",
						zipcodeType: zipcode.zipcode_type ?? "",
						defaultCity: zipcode.default_city ?? "",
						countyFips: zipcode.county_fips ?? "",
						countyName: zipcode.county_name ?? "",
						latitude: zipcode.latitude ?? 0,
						longitude: zipcode.longitude ?? 0,
						precision: zipcode.precision ?? "",
						stateAbbreviation: zipcode.state_abbreviation ?? "",
						state: zipcode.state ?? "",
						alternateCounties: !zipcode.alternate_counties
							? []
							: zipcode.alternate_counties.map((county): AlternateCounty => {
									return {
										countyFips: county.county_fips ?? "",
										countyName: county.county_name ?? "",
										stateAbbreviation: county.state_abbreviation ?? "",
										state: county.state ?? "",
									};
								}),
					};
				});
	}
}
