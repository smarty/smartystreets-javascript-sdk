/**
 * A candidate is a possible match for an address that was submitted.<br>
 *     A lookup can have multiple candidates if the address was ambiguous.
 *
 * @see "https://smartystreets.com/docs/cloud/us-reverse-geo-api#result"
 */
class Result {
	constructor(responseData) {
		this.coordinate = {};
		if (respoonseData.coordinate !== undefined) {
			this.coordinate.latitude = responseData.coordinate.latitude;
			this.coordinate.longitude = responseData.coordinate.longitude;
			this.coordinate.accuracy = responseData.coordinate.accuracy;
			switch (responseData.coordinate.license) {
				case 1:
					this.coordinate.license = "SmartyStreets Proprietary";
				default:
					this.coordinate.license = "SmartyStreets";
			}
		}

		this.distance = responseData.distance;

		this.address = {};
		if (responseData.address !== undefined) {
			this.address.street = responseData.address.street;
			this.address.city = responseData.address.city;
			this.address.stateAbbreviation = responseData.address.state_abbreviation;
			this.address.zipCode = responseData.address.zip_code;
		}
	}
}

module.exports = Result;