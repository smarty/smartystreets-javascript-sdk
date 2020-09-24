class Result {
	constructor(responseData) {
		this.address = {};
		if (responseData.address !== undefined) {
			this.address.street = responseData.address.street;
			this.address.city = responseData.address.city;
			this.address.stateAbbreviation = responseData.address.state_abbreviation;
			this.address.zipCode = responseData.address.zip_code;
		}
		this.coordinate = {};
		if (responseData.coordinate !== undefined) {
			this.coordinate.latitude = responseData.coordinate.latitude;
			this.coordinate.longitude = responseData.coordinate.longitude;
			this.coordinate.license = responseData.coordinate.license;
			this.coordinate.accuracy = responseData.coordinate.accuracy;
		}
		this.distance = responseData.distance;
	}
}