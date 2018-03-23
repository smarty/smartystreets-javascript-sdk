const chai = require("chai");
const expect = chai.expect;
const Promise = require("promise");
const Response = require("../../source/response");
const Client = require("../../source/us_autocomplete/client");
const Lookup = require("../../source/us_autocomplete/lookup");

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
});

function MockSender() {
	let request = {
		payload: undefined,
		parameters: undefined,
	};
	this.request = request;

	this.send = function (clientRequest) {
		request.payload = clientRequest.payload;
		request.parameters = clientRequest.parameters;
	}
}

function MockSenderWithResponse(expectedPayload, expectedError) {
	this.send = function () {
		return new Promise((resolve, reject) => {
			resolve(new Response("", expectedPayload, expectedError));
		});
	}
}