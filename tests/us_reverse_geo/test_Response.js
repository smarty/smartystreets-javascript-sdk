const chai = require("chai");
const expect = chai.expect;
const Response = require("../../src/us_reverse_geo/Response");

describe("A US Reverse Geo match response", function () {
	it("populates with the appropriate fields.", function () {
		const sampleResponse = {
			results: [
				{
					coordinate: {
						latitude: 1.1,
						longitude: 2.2,
						accuracy: "3",
						license: 1
					},
					distance: 4.4,
					address: {
						street: "5",
						city: "6",
						state_abbreviation: "7",
						zipcode: "8"
					}
				},
			]
		};

		const response = new Response(sampleResponse);
		const result = response.results[0];

		expect(result.distance).to.equal(4.4);
		let address = result.address;
		expect(address.street).to.equal("5");
		expect(address.city).to.equal("6");
		expect(address.state_abbreviation).to.equal("7");
		expect(address.zipcode).to.equal("8");
		let coordinate = result.coordinate;
		expect(coordinate.latitude).to.equal(1.1);
		expect(coordinate.longitude).to.equal(2.2);
		expect(coordinate.accuracy).to.equal("3");
		expect(coordinate.license).to.equal("SmartyStreets Proprietary");
	});
});
