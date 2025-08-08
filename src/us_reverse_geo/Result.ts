export interface Address {
	street?: string;
	city?: string;
	state_abbreviation?: string;
	zipcode?: string;
	source?: string;
}

export interface Coordinate {
	latitude?: number;
	longitude?: number;
	accuracy?: string;
	license?: string;
}

export interface ResponseData {
	distance?: number;
	address?: Address;
	coordinate?: Coordinate;
}

/**
 * A candidate is a possible match for an address that was submitted.<br>
 *     A lookup can have multiple candidates if the address was ambiguous.
 *
 * @see "https://www.smarty.com/docs/cloud/us-reverse-geo-api#result"
 */
export default class Result {
	public distance?: number;
	public address: Address = {};
	public coordinate: Coordinate = {};

	constructor(responseData: ResponseData) {
		this.distance = responseData.distance;

		if (responseData.address) {
			this.address.street = responseData.address.street;
			this.address.city = responseData.address.city;
			this.address.state_abbreviation = responseData.address.state_abbreviation;
			this.address.zipcode = responseData.address.zipcode;
			this.address.source = responseData.address.source;
		}

		if (responseData.coordinate) {
			this.coordinate.latitude = responseData.coordinate.latitude;
			this.coordinate.longitude = responseData.coordinate.longitude;
			this.coordinate.accuracy = responseData.coordinate.accuracy;
			switch (String(responseData.coordinate.license)) {
				case "1":
					this.coordinate.license = "SmartyStreets Proprietary";
					break;
				default:
					this.coordinate.license = "SmartyStreets";
			}
		}
	}
}
