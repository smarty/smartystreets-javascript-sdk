const chai = require("chai");
const expect = chai.expect;
const Client = require("../../source/us_zipcode/client");
const Lookup = require("../../source/us_zipcode/lookup");
const Result = require("../../source/us_zipcode/result");
const Batch = require("../../source/batch");
const Response = require("../../source/response");
const errors = require("../../source/errors");
const Promise = require("promise");

describe("A US Zipcode client", function () {
	it("has a sender.", function () {
		const mockSender = {};
		const client = new Client(mockSender);

		expect(client.sender).to.deep.equal(mockSender);
	});

	it("calls its inner sender's send function.", function () {
		const mockSender = {
			send: function (request) {
				sentFlag = true;
				mockSenderRequest = request;
				return new Promise((resolve, reject) => {});
			}
		};
		const client = new Client(mockSender);
		let lookup = new Lookup();
		let sentFlag = false;
		let mockSenderRequest = {};

		client.sendLookup(lookup);

		expect(sentFlag).to.equal(true);
	});

	it("doesn't send an empty batch.", function () {
		let mockSender = new MockSender();
		const client = new Client(mockSender);
		let batch = new Batch();

		expect(() => client.sendBatch(batch)).to.throw(errors.BatchEmptyError);
	});

	it("builds a request for a batch lookup with the correct JSON payload.", function () {
		let mockSender = new MockSender();
		const client = new Client(mockSender);
		let lookup0 = new Lookup("lookup0");
		let lookup1 = new Lookup("lookup1");
		let lookup2 = new Lookup("lookup2");
		let batch = new Batch();
		const expectedPayload = [
			{"city": "lookup0"},
			{"city": "lookup1"},
			{"city": "lookup2"}
		];

		batch.add(lookup0);
		batch.add(lookup1);
		batch.add(lookup2);

		client.sendBatch(batch);

		expect(mockSender.request.payload).to.deep.equal(expectedPayload);
	});

	it("attaches a match candidate from a response to a lookup.", function () {
		const expectedMockPayload = [{input_index: 0}];
		let mockSender = new MockSenderWithResponse(expectedMockPayload);
		const client = new Client(mockSender);
		let lookup = new Lookup();
		let expectedResult = new Result({input_index: 0});

		return client.sendLookup(lookup).then(response => {
			expect(lookup.result[0]).to.deep.equal(expectedResult);
		});
	});

});

function MockSender() {
	let request = {
		payload: undefined,
		parameters: undefined
	};
	this.request = request;

	this.send = function (clientRequest) {
		request.payload = clientRequest.payload;
		request.parameters = clientRequest.parameters;
		return new Promise((resolve, reject) => {});
	}
}

function MockSenderWithResponse(expectedPayload, expectedError) {
	this.send = function () {
		return new Promise((resolve, reject) => {
			resolve(new Response("", expectedPayload, expectedError));
		});
	}
}
