const chai = require("chai");
const expect = chai.expect;
const SmartyResponse = require("../../src/us_reverse_geo/SmartyResponse");

describe("A US Reverse Geo response", function () {
	it("populates with the appropriate fields.", function () {
		const sampleResponse = {
			"results": [
				{
					"address": {
						"street": "2335 S State St",
						"city": "Provo",
						"state_abbreviation": "UT",
						"zipcode": "84606"
					},
					"coordinate": {
						"latitude": 40.111111,
						"longitude": -111.111111,
						"license": 0,
						"accuracy": "Zip9"
					},
					"distance": 2.225084,
				},
			],
		};

		const response = new SmartyResponse(sampleResponse);

		expect(response.results[0].distance).to.equal(2.225084);
		let address = response.results[0].address;
		expect(address.street).to.equal("2335 S State St");
		expect(address.city).to.equal("Provo");
		expect(address.state_abbreviation).to.equal("UT");
		expect(address.zipcode).to.equal("84606");
		let coordinate = response.results[0].coordinate;
		expect(coordinate.latitude).to.equal(40.111111);
		expect(coordinate.longitude).to.equal(-111.111111);
		expect(coordinate.license).to.equal(0);
		expect(coordinate.accuracy).to.equal("Zip9");
	});
});
