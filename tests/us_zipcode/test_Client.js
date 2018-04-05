let chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
const Client = require("../../src/us_zipcode/Client");
const Lookup = require("../../src/us_zipcode/Lookup");
const Result = require("../../src/us_zipcode/Result");
const Batch = require("../../src/Batch");
const errors = require("../../src/Errors");
const Promise = require("promise");
const MockSender = require("../fixtures/mock_senders").MockSender;
const MockSenderWithResponse = require("../fixtures/mock_senders").MockSenderWithResponse;

describe("A US Zipcode client", function () {
	it("calls its inner sender's send function.", function () {
		const mockSender = {
			send: function (request) {
				sentFlag = true;
				mockSenderRequest = request;
				return new Promise((resolve, reject) => {
				});
			}
		};
		const client = new Client(mockSender);
		let lookup = new Lookup();
		let sentFlag = false;
		let mockSenderRequest = {};

		client.send(lookup);

		expect(sentFlag).to.equal(true);
	});

	it("doesn't send an empty batch.", function () {
		let mockSender = new MockSender();
		const client = new Client(mockSender);
		let batch = new Batch();

		expect(() => client.send(batch)).to.throw(errors.BatchEmptyError);
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

		client.send(batch);

		expect(mockSender.request.payload).to.deep.equal(expectedPayload);
	});

	it("attaches a match candidate from a response to a lookup.", function () {
		const expectedMockPayload = [{input_index: 0}];
		let mockSender = new MockSenderWithResponse(expectedMockPayload);
		const client = new Client(mockSender);
		let lookup = new Lookup();
		let expectedResult = new Result({input_index: 0});

		return client.send(lookup).then(response => {
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

		client.send(batch).then(response => {
			expect(batch.getByIndex(0).result[0].city).to.equal("City 0");
			expect(batch.getByIndex(0).result[1].city).to.equal("Alternate city 0");
			expect(batch.getByIndex(1).result[0].city).to.equal("City 1");
			expect(batch.getByIndex(2).result).to.deep.equal([]);
			expect(batch.getByIndex(3).result[0].city).to.equal("City 3");
		});
	});

	it("attaches request parameters for batches with a single lookup and a request payload for batches with more than 1 lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup1 = new Lookup("a");
		let lookup2 = new Lookup("b");
		let batch = new Batch();

		batch.add(lookup1);
		client.send(batch);

		expect(mockSender.request.parameters).not.to.deep.equal({});

		batch.add(lookup2);
		client.send(batch);

		expect(mockSender.request.payload).not.to.equal(undefined);
	});

	it("rejects with an exception if the response comes back with an error.", function () {
		const expectedMockError = new Error("Stamn! She's a tough one!");
		let mockSender = new MockSenderWithResponse([], expectedMockError);
		let client = new Client(mockSender);
		let lookup = new Lookup();

		return expect(client.send(lookup)).to.eventually.be.rejectedWith(expectedMockError);
	});

	it("throws an exception if a lookup is undefined.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);

		expect(() => client.send()).to.throw(errors.UndefinedLookupError);
	});

	it("builds a request for a single lookup with the correct request parameters.", function () {
		let mockSender = new MockSender();
		const client = new Client(mockSender);
		let lookup = new Lookup("4", "5", "6");
		let expectedParameters = {
			city: "4",
			state: "5",
			zipcode: "6",
		};

		client.send(lookup);

		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});
});
