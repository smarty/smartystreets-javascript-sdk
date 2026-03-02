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

export default class Result {
	inputIndex: number;
	status: string | undefined;
	reason: string | undefined;
	valid: boolean;
	cities: CityEntry[];
	zipcodes: ZipcodeEntry[];

	constructor(responseData: Record<string, any>) {
		this.inputIndex = responseData.input_index;
		this.status = responseData.status;
		this.reason = responseData.reason;
		this.valid = this.status === undefined && this.reason === undefined;

		this.cities = !responseData.city_states
			? []
			: responseData.city_states.map((city: Record<string, any>): CityEntry => {
					return {
						city: city.city,
						stateAbbreviation: city.state_abbreviation,
						state: city.state,
						mailableCity: city.mailable_city,
					};
				});

		this.zipcodes = !responseData.zipcodes
			? []
			: responseData.zipcodes.map((zipcode: Record<string, any>): ZipcodeEntry => {
					return {
						zipcode: zipcode.zipcode,
						zipcodeType: zipcode.zipcode_type,
						defaultCity: zipcode.default_city,
						countyFips: zipcode.county_fips,
						countyName: zipcode.county_name,
						latitude: zipcode.latitude,
						longitude: zipcode.longitude,
						precision: zipcode.precision,
						stateAbbreviation: zipcode.state_abbreviation,
						state: zipcode.state,
						alternateCounties: !zipcode.alternate_counties
							? []
							: zipcode.alternate_counties.map(
									(county: Record<string, any>): AlternateCounty => {
										return {
											countyFips: county.county_fips,
											countyName: county.county_name,
											stateAbbreviation: county.state_abbreviation,
											state: county.state,
										};
									},
								),
					};
				});
	}
}
