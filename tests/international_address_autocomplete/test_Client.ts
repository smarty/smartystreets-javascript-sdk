import { expect } from "chai";
import Client from "../../src/international_address_autocomplete/Client.js";
import Lookup from "../../src/international_address_autocomplete/Lookup.js";
import { LanguageMode } from "../../src/international_address_autocomplete/LanguageMode.js";
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

	it("builds parameters without a language when it is not set", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup({ search: "(" });

		client.send(lookup);

		expect(mockSender.request.parameters).to.not.have.property("language");
	});

	it("builds parameters with a native language", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let search = "(";
		let lookup = new Lookup({ search, language: LanguageMode.Native });
		let expectedParameters = {
			max_results: 5,
			max_group_results: 100,
			search: search,
			language: "native",
		};

		client.send(lookup);
		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("builds parameters with a latin language", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let search = "(";
		let lookup = new Lookup({ search, language: LanguageMode.Latin });
		let expectedParameters = {
			max_results: 5,
			max_group_results: 100,
			search: search,
			language: "latin",
		};

		client.send(lookup);
		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("normalizes a mixed-case language value before sending.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup({ search: "(", language: "Latin" as LanguageMode });

		client.send(lookup);

		expect(mockSender.request.parameters["language"]).to.equal("latin");
	});

	it("does not mutate the original language value when normalizing.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup({ search: "(", language: "Latin" as LanguageMode });

		client.send(lookup);

		expect(lookup.language).to.equal("Latin");
	});

	it("omits the language parameter when it is set to a blank value", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup({ search: "(", language: "   " as LanguageMode });

		client.send(lookup);

		expect(mockSender.request.parameters).to.not.have.property("language");
	});

	it("throws an error if sending a lookup with an invalid language.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup({ search: "(", language: "Rubberduckian" as LanguageMode });

		expect(() => client.send(lookup)).to.throw(errors.UnprocessableEntityError);
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
