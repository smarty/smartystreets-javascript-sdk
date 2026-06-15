import { expect } from "chai";
import Client from "../../src/us_reverse_geo/Client.js";
import Lookup from "../../src/us_reverse_geo/Lookup.js";
import { MockSender, MockSenderWithResponse } from "../fixtures/mock_senders.js";
import Response from "../../src/us_reverse_geo/Response.js";

describe("A US Reverse Geo client", function () {
	it("correctly builds parameters with source all.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup(44.888888888, -111.111111111, "all");

		client.send(lookup);

		expect(mockSender.request.parameters).to.deep.equal({
			latitude: "44.88888889",
			longitude: "-111.11111111",
			source: "all",
		});
	});

	it("correctly builds parameters with source postal.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup(44.888888888, -111.111111111, "postal");

		client.send(lookup);

		expect(mockSender.request.parameters).to.deep.equal({
			latitude: "44.88888889",
			longitude: "-111.11111111",
			source: "postal",
		});
	});

	it("correctly builds parameters with no source.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup(44.888888888, -111.111111111);

		client.send(lookup);

		expect(mockSender.request.parameters).to.deep.equal({
			latitude: "44.88888889",
			longitude: "-111.11111111",
		});
	});

	it("attaches a result from a response to a lookup.", function () {
		const mockPayload = {
			results: [
				{
					coordinate: {
						latitude: 40.111111,
						longitude: -111.111111,
						accuracy: "Rooftop",
						license: 1,
					},
					distance: 2.7207432,
					address: {
						street: "2335 S State St",
						city: "Provo",
						state_abbreviation: "UT",
						zipcode: "84606",
						source: "postal",
					},
				},
			],
		};
		const expectedResult = {
			results: [
				{
					coordinate: {
						latitude: 40.111111,
						longitude: -111.111111,
						accuracy: "Rooftop",
						license: "SmartyStreets Proprietary",
					},
					distance: 2.7207432,
					address: {
						street: "2335 S State St",
						city: "Provo",
						stateAbbreviation: "UT",
						zipcode: "84606",
						source: "postal",
						smartyKey: undefined,
					},
				},
			],
		};
		let mockSender = new MockSenderWithResponse(mockPayload);
		const client = new Client(mockSender);
		let lookup = new Lookup(44.888888888, -111.111111111, "postal");

		return client.send(lookup).then(() => {
			expect(lookup.response).to.deep.equal(expectedResult);
			expect(lookup.response).to.be.an.instanceOf(Response);
		});
	});
});
