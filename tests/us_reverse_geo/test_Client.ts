import { expect } from "chai";
import Client from "../../src/us_reverse_geo/Client.js";
import Lookup from "../../src/us_reverse_geo/Lookup.js";
import { MockSender } from "../fixtures/mock_senders.js";
import { MockSenderWithResponse } from "../fixtures/mock_senders.js";
import Response from "../../src/us_reverse_geo/Response.js";

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
						"zipcode": "84606",
						"source": "postal"
					}
				},
			]
		};
		let mockSender = new MockSenderWithResponse(expectedMockPayload);
		const client = new Client(mockSender);
		let lookup = new Lookup(44.888888888, -111.111111111, "postal");

		return client.send(lookup).then(() => {
			expect(lookup.response).to.deep.equal(expectedMockPayload);
			expect(lookup.response).to.be.an.instanceOf(Response);
		});
	});
});
