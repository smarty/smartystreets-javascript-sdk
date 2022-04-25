const chai = require("chai");
const expect = chai.expect;
const Client = require("../../src/us_reverse_geo/Client");
const Lookup = require("../../src/us_reverse_geo/Lookup");
const MockSender = require("../fixtures/mock_senders").MockSender;
const MockSenderWithResponse = require("../fixtures/mock_senders").MockSenderWithResponse;
const Response = require("../../src/us_reverse_geo/Response");

describe("A US Reverse Geo client", function () {
	it("has an inner sender.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);

		expect(client.sender).to.deep.equal(mockSender);
	});


	it("attaches a result from a response to a lookup.", function () {
		const expectedMockPayload = {
			"results": [
				{
					"coordinate": {
						"latitude": 40.111111,
						"longitude": -111.111111,
						"accuracy": "Rooftop",
						"license": "SmartyStreets"
					},
					"distance": 2.7207432,
					"address": {
						"street": "2335 S State St",
						"city": "Provo",
						"state_abbreviation": "UT",
						"zipcode": "84606"
					}
				},
			]
		};
		let mockSender = new MockSenderWithResponse(expectedMockPayload);
		const client = new Client(mockSender);
		let lookup = new Lookup(44.888888888, -111.111111111);

		return client.send(lookup).then(() => {
			expect(lookup.response).to.deep.equal(expectedMockPayload);
			expect(lookup.response).to.be.an.instanceOf(Response);
		});
	});
});
