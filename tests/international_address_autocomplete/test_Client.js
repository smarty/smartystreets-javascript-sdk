const chai = require("chai");
const expect = chai.expect;
const Client = require("../../src/international_address_autocomplete/Client");
const Lookup = require("../../src/international_address_autocomplete/Lookup");
const Suggestion = require("../../src/international_address_autocomplete/Suggestion");
const errors = require("../../src/Errors");
const MockSender = require("../fixtures/mock_senders").MockSender;
const MockSenderWithResponse = require("../fixtures/mock_senders").MockSenderWithResponse;

describe("An International Address Autocomplete Client", function () {
	it("correctly builds parameter", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup("a", "b");
		lookup.maxResults = 10;
		lookup.includeOnlyAdministrativeArea = "c";
		lookup.includeOnlyLocality = "d";
		lookup.includeOnlyPostalCode = "e";
		let expectedParameters = {
			search: "a",
			country: "b",
			max_results: 10,
			include_only_administrative_area: "c",
			include_only_locality: "d",
			include_only_postal_code: "e",
		};

		client.send(lookup);
		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("builds parameters with different max results", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let search = "(";
		let lookup = new Lookup(search);
		lookup.search = search;
		lookup.maxResults = 10;
		let expectedParameters = {
			country: "United States",
			max_results: 10,
			search: search,
		};

		client.send(lookup);
		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("throws an error if sending without a lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		expect(client.send).to.throw(errors.UndefinedLookupError);
	});

	it("attaches suggestions from a response to a lookup", function () {
		const responseData = {
			candidates: [
				{
					"street": "L alleya",
					"locality": "Novosibirsk",
					"administrative_area": "Novosibirskaya oblast'",
					"postal_code": "40000",
					"country_iso3": "RUS",
				}
			]
		};

		let mockSender = new MockSenderWithResponse(responseData);
		let client = new Client(mockSender);
		let lookup = new Lookup("f");
		let expectedSuggestion = new Suggestion(responseData.candidates[0]);

		return client.send(lookup).then(() => {
			expect(lookup.result[0]).to.deep.equal(expectedSuggestion);
		});
	});
});