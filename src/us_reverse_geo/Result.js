/**
 * A candidate is a possible match for an address that was submitted.<br>
 *     A lookup can have multiple candidates if the address was ambiguous.
 *
 * @see "https://www.smarty.com/docs/cloud/us-reverse-geo-api#result"
 */
class Result {
	constructor(responseData) {
		this.distance = responseData.distance;

		this.address = {};
		if (responseData.address) {
			this.address.street = responseData.address.street;
			this.address.city = responseData.address.city;
			this.address.state_abbreviation = responseData.address.state_abbreviation;
			this.address.zipcode = responseData.address.zipcode;
		}

		this.coordinate = {};
		if (responseData.coordinate) {
			this.coordinate.latitude = responseData.coordinate.latitude;
			this.coordinate.longitude = responseData.coordinate.longitude;
			this.coordinate.accuracy = responseData.coordinate.accuracy;
			switch (responseData.coordinate.license) {
				case 1:
					this.coordinate.license = "SmartyStreets Proprietary";
					break;
				default:
					this.coordinate.license = "SmartyStreets";
			}
		}
	}
}

module.exports = Result;