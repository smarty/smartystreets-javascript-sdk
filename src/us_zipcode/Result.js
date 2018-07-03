/**
 * @see "https://smartystreets.com/docs/cloud/us-zipcode-api#root"
 */
class Result {
	constructor(responseData) {
		this.inputIndex = responseData.input_index;
		this.status = responseData.status;
		this.reason = responseData.reason;
		this.valid = this.status === undefined && this.reason === undefined;

		this.cities = !responseData.city_states ? [] : responseData.city_states.map(city => {
			return {
				city: city.city,
				stateAbbreviation: city.state_abbreviation,
				state: city.state,
				mailableCity: city.mailable_city,
			};
		});

		this.zipcodes = !responseData.zipcodes ? [] : responseData.zipcodes.map(zipcode => {
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
				alternateCounties: !zipcode.alternate_counties ? [] : zipcode.alternate_counties.map(county => {
					return {
						countyFips: county.county_fips,
						countyName: county.county_name,
						stateAbbreviation: county.state_abbreviation,
						state: county.state,
					}
				}),
			};
		});
	}
}

module.exports = Result;