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

		client.send(lookup);
		expect(mockSender.request.parameters).to.equal(prefix)
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