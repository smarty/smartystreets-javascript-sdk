const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const Client = require("../../src/us_autocomplete/Client");
const Lookup = require("../../src/us_autocomplete/Lookup");
const Suggestion = require("../../src/us_autocomplete/Suggestion");
const errors = require("../../src/Errors");
const MockSender = require("../fixtures/mock_senders").MockSender;
const MockSenderWithResponse = require("../fixtures/mock_senders").MockSenderWithResponse;

describe("A US Autocomplete Client", function () {
	it("correctly builds parameters for a prefix only lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let prefix = '(>")>#';
		let lookup = new Lookup(prefix);
		let expectedParameters = {
			prefix: prefix,
			suggestions: undefined,
			city_filter: undefined,
			state_filter: undefined,
			prefer: undefined,
			prefer_ratio: undefined,
			geolocate: undefined,
			geolocate_precision: undefined,
		};

		client.send(lookup);

		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("correctly builds parameters for a fully-populated lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup();
		lookup.prefix = "1";
		lookup.maxSuggestions = "2";
		lookup.cityFilter.push("a");
		lookup.cityFilter.push("b");
		lookup.stateFilter = ["c", "d"];
		lookup.prefer = ["e", "f", "g"];
		lookup.preferRatio = "5";
		lookup.geolocate = "6";
		lookup.geolocatePrecision = "7";

		let expectedParameters = {
			prefix: "1",
			suggestions: "2",
			city_filter: "a,b",
			state_filter: "c,d",
			prefer: "e;f;g",
			prefer_ratio: "5",
			geolocate: "6",
			geolocate_precision: "7",
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
			text: "a",
			street_line: "b",
			city: "c",
			state: "d",
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
