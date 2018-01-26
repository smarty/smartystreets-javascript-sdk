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

	it("attaches match candidates to their corresponding lookups.", function () {
		const expectedMockPayload = JSON.stringify([
			{city: "City 0", input_index: 0},
			{city: "Alternate city 0", input_index: 0},
			{city: "City 1", input_index: 1},
			{city: "City 3", input_index: 3},
		]);
		let mockSender = new MockSenderWithResponse(expectedMockPayload);
		let client = new Client(mockSender);
		let lookup0 = new Lookup();
		let lookup1 = new Lookup();
		let lookup2 = new Lookup();
		let lookup3 = new Lookup();
		let batch = new Batch();

		batch.add(lookup0);
		batch.add(lookup1);
		batch.add(lookup2);
		batch.add(lookup3);

		client.sendBatch(batch).then(response => {
			expect(batch.getByIndex(0).result[0].city).to.equal("City 0");
			expect(batch.getByIndex(0).result[1].city).to.equal("Alternate city 0");
			expect(batch.getByIndex(1).result[0].city).to.equal("City 1");
			expect(batch.getByIndex(2).result).to.deep.equal([]);
			expect(batch.getByIndex(3).result[0].city).to.equal("City 3");
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
