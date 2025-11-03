const chai = require("chai");
const expect = chai.expect;
const Client = require("../../src/international_postal_code/Client");
const Lookup = require("../../src/international_postal_code/Lookup");
const MockSender = require("../fixtures/mock_senders").MockSender;
const MockSenderWithResponse = require("../fixtures/mock_senders").MockSenderWithResponse;

describe("An International Postal Code client", function () {
	it("has an inner sender.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);

		expect(client.sender).to.deep.equal(mockSender);
	});

	it("throws an error if sending without a lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);

		expect(() => client.send()).to.throw();
	});

	it("attaches a result from a response to a lookup.", function () {
		const expectedMockPayload = [
			{
				input_id: "1234",
				administrative_area: "SP",
				super_administrative_area: undefined,
				sub_administrative_area: undefined,
				locality: "São Paulo",
				dependent_locality: "Casa Verde",
				dependent_locality_name: undefined,
				double_dependent_locality: undefined,
				postal_code: "02516-040",
				postal_code_extra: undefined,
				country_iso_3: "BRA",
			},
		];
		let mockSender = new MockSenderWithResponse(expectedMockPayload);
		const client = new Client(mockSender);
		let lookup = new Lookup("Brazil", "02516-040");

		return client.send(lookup).then(() => {
			expect(lookup.result).to.be.an("array");
			expect(lookup.result.length).to.equal(1);
			expect(lookup.result[0].inputId).to.equal("1234");
			expect(lookup.result[0].administrativeArea).to.equal("SP");
			expect(lookup.result[0].locality).to.equal("São Paulo");
			expect(lookup.result[0].dependentLocality).to.equal("Casa Verde");
			expect(lookup.result[0].postalCode).to.equal("02516-040");
			expect(lookup.result[0].countryIso3).to.equal("BRA");
		});
	});

	it("handles empty results array.", function () {
		const expectedMockPayload = {
			results: [],
		};
		let mockSender = new MockSenderWithResponse(expectedMockPayload);
		const client = new Client(mockSender);
		let lookup = new Lookup("Brazil", "99999-999");

		return client.send(lookup).then(() => {
			expect(lookup.result).to.be.an("array");
			expect(lookup.result.length).to.equal(0);
		});
	});
});
