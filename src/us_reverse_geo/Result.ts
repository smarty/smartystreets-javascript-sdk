export default class Result {
	distance: number;
	address: Record<string, any>;
	coordinate: Record<string, any>;

	constructor(responseData: Record<string, any>) {
		this.distance = responseData.distance;

		this.address = {};
		if (responseData.address) {
			this.address.street = responseData.address.street;
			this.address.city = responseData.address.city;
			this.address.stateAbbreviation = responseData.address.state_abbreviation;
			this.address.zipcode = responseData.address.zipcode;
			this.address.source = responseData.address.source;
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
