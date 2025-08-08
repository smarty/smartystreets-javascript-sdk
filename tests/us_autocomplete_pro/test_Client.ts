import { expect } from "chai";
import Client from "../../src/us_autocomplete_pro/Client.js";
import Lookup from "../../src/us_autocomplete_pro/Lookup.js";
import Suggestion from "../../src/us_autocomplete_pro/Suggestion.js";
import * as errors from "../../src/Errors.js";
import { MockSender } from "../fixtures/mock_senders.js";
import { MockSenderWithResponse } from "../fixtures/mock_senders.js";

describe("A US Autocomplete Pro Client", function () {
	it("correctly builds parameters for a prefix only lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let search = '(>")>#';
		let lookup = new Lookup(search);
		let expectedParameters = {
			exclude_states: "",
			include_only_cities: "",
			include_only_states: "",
			include_only_zip_codes: "",
			prefer_cities: "",
			prefer_states: "",
			prefer_zip_codes: "",
			search: search,
		};

		client.send(lookup);

		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("correctly builds parameters for a fully-populated lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup();
		lookup.search = "1";
		lookup.selected = "2";
		lookup.maxResults = "3";
		lookup.includeOnlyCities = ["a,b", "c,d"];
		lookup.includeOnlyStates = ["e", "f"];
		lookup.includeOnlyZIPCodes = ["g", "h"];
		lookup.excludeStates = ["i", "j"];
		lookup.preferCities = ["k,l", "m,n"];
		lookup.preferStates = ["o", "p"];
		lookup.preferZIPCodes = ["q", "r"];
		lookup.preferRatio = "s";
		lookup.preferGeolocation = "t";
		lookup.source = "all";

		let expectedParameters = {
			search: "1",
			selected: "2",
			max_results: "3",
			include_only_cities: "a,b;c,d",
			include_only_states: "e;f",
			include_only_zip_codes: "g;h",
			exclude_states: "i;j",
			prefer_cities: "k,l;m,n",
			prefer_states: "o;p",
			prefer_zip_codes: "q;r",
			prefer_ratio: "s",
			prefer_geolocation: "t",
			source: "all",
		};

		client.send(lookup);
		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("throws an error if sending without a lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		expect(client.send).to.throw(errors.UndefinedLookupError);
	});

	it("rejects with an exception if the response comes back with an error.", function () {
		let expectedError = new Error("I'm the error.");
		let mockSender = new MockSenderWithResponse("", expectedError);
		let client = new Client(mockSender);
		let lookup = new Lookup("¯\\_(ツ)_/¯");

		return client.send(lookup).catch((e) => {expect(e).to.equal(expectedError);});
	});

	it("returns an empty array when no suggestions are returned.", () => {
		let mockExpectedPayload = {suggestions: null};
		let mockSender = new MockSenderWithResponse(mockExpectedPayload);
		let client = new Client(mockSender);
		let lookup = new Lookup("Please let this be easy to test.");
		let expectedSuggestion = [];

		return client.send(lookup).then(response => {
			expect(lookup.result).to.deep.equal(expectedSuggestion);
		});
	});

	it("attaches suggestions from a response to a lookup.", function () {
		const responseData = {
			streetLine: "a",
			secondary: "b",
			city: "c",
			state: "d",
			zipcode: "e",
			entries: "f",
		};
		let mockExpectedPayload = {suggestions: [responseData]};
		let mockSender = new MockSenderWithResponse(mockExpectedPayload);
		let client = new Client(mockSender);
		let lookup = new Lookup("Trevor the Vampire");
		let expectedSuggestion = new Suggestion(responseData);

		return client.send(lookup).then(response => {
			expect(lookup.result[0]).to.deep.equal(expectedSuggestion);
		});
	})
});
