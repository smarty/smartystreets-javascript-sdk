import { expect } from "chai";
import Client from "../../src/international_address_autocomplete/Client.js";
import Lookup from "../../src/international_address_autocomplete/Lookup.js";
import Suggestion from "../../src/international_address_autocomplete/Suggestion.js";
import errors from "../../src/Errors.js";
import { MockSender, MockSenderWithResponse } from "../fixtures/mock_senders.js";

describe("An International Address Autocomplete Client", function () {
	it("correctly builds parameter", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let search = "(";
		let lookup = new Lookup({ search });
		let expectedParameters = {
			max_results: 5,
			max_group_results: 100,
			search: "(",
		};

		client.send(lookup);
		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("builds parameters for different country", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let search = "(";
		let lookup = new Lookup({ search });
		lookup.search = search;
		lookup.country = "Russia";
		let expectedParameters = {
			country: "Russia",
			max_results: 5,
			max_group_results: 100,
			search: search,
		};

		client.send(lookup);
		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("builds parameters with different max results", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let search = "(";
		let lookup = new Lookup({ search });
		lookup.search = search;
		lookup.maxResults = 10;
		let expectedParameters = {
			max_results: 10,
			max_group_results: 100,
			search: search,
		};

		client.send(lookup);
		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("builds parameters with different max group results", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let search = "(";
		let lookup = new Lookup({ search, maxGroupResults: 50 });
		let expectedParameters = {
			max_results: 5,
			max_group_results: 50,
			search: search,
		};

		client.send(lookup);
		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("builds parameters with geolocation", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let search = "(";
		let lookup = new Lookup({ search, geolocation: true });
		let expectedParameters = {
			max_results: 5,
			max_group_results: 100,
			search: search,
			geolocation: "on",
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
					street: "L alleya",
					locality: "Novosibirsk",
					administrative_area: "Novosibirskaya oblast'",
					postal_code: "40000",
					country_iso3: "RUS",
				},
			],
		};

		let mockSender = new MockSenderWithResponse(responseData);
		let client = new Client(mockSender);
		let lookup = new Lookup({ search: "f" });
		let expectedSuggestion = new Suggestion(responseData.candidates[0]);

		return client.send(lookup).then(() => {
			expect(lookup.result[0]).to.deep.equal(expectedSuggestion);
		});
	});
});
