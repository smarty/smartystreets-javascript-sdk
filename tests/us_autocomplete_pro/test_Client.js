const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const Client = require("../../src/us_autocomplete_pro/Client");
const Lookup = require("../../src/us_autocomplete_pro/Lookup");
const Suggestion = require("../../src/us_autocomplete_pro/Suggestion");
const errors = require("../../src/Errors");
const MockSender = require("../fixtures/mock_senders").MockSender;
const MockSenderWithResponse = require("../fixtures/mock_senders").MockSenderWithResponse;

describe("A US Autocomplete Pro Client", function () {
	it("correctly builds parameters for a prefix only lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let search = '(>")>#';
		let lookup = new Lookup(search);
		let expectedParameters = {
			search: search,
			selected: undefined,
			max_results: undefined,
			include_only_cities: undefined,
			include_only_states: undefined,
			include_only_zip_codes: undefined,
			exclude_states: undefined,
			prefer_cities: undefined,
			prefer_states: undefined,
			prefer_zip_codes: undefined,
			prefer_ratio: undefined,
			prefer_geolocation: undefined,
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

		return expect(client.send(lookup)).to.eventually.be.rejectedWith(expectedError);
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
