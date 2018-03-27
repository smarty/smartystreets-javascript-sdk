const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
const Client = require("../../source/us_street/client");
const Lookup = require("../../source/us_street/lookup");
const Candidate = require("../../source/us_street/candidate");
const Batch = require("../../source/batch");
const errors = require("../../source/errors");
const MockSender = require("../fixtures/mock_senders").MockSender;
const MockSenderWithResponse = require("../fixtures/mock_senders").MockSenderWithResponse;

describe("A US Street client", function () {
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
			}
		};
		const client = new Client(mockSender);
		let lookup = new Lookup();
		let sentFlag = false;
		let mockSenderRequest = {};

		client.sendLookup(lookup);

		expect(sentFlag).to.equal(true);
	});

	it("builds a request for a single lookup with the correct request parameters.", function () {
		let mockSender = new MockSender();
		const client = new Client(mockSender);
		let lookup = new Lookup("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12");
		let expectedParameters = {
			street: "1",
			street2: "2",
			secondary: "3",
			city: "4",
			state: "5",
			zipcode: "6",
			lastline: "7",
			addressee: "8",
			urbanization: "9",
			match: "10",
			candidates: "11",
		};

		client.sendLookup(lookup);

		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("builds a request for a batch lookup with the correct JSON payload.", function () {
		let mockSender = new MockSender();
		const client = new Client(mockSender);
		let lookup0 = new Lookup("lookup0");
		let lookup1 = new Lookup("lookup1");
		let lookup2 = new Lookup("lookup2");
		let batch = new Batch();
		const expectedPayload = JSON.stringify([
			{"street": "lookup0"},
			{"street": "lookup1"},
			{"street": "lookup2"}
		]);

		batch.add(lookup0);
		batch.add(lookup1);
		batch.add(lookup2);

		client.sendBatch(batch);

		expect(mockSender.request.payload).to.equal(expectedPayload);
	});

	it("doesn't send an empty batch.", function () {
		let mockSender = new MockSender();
		const client = new Client(mockSender);
		let batch = new Batch();

		expect(() => client.sendBatch(batch)).to.throw(errors.BatchEmptyError);
	});

	it("attaches a match candidate from a response to a lookup.", function () {
		const expectedMockPayload = [{delivery_line_1: "An address", input_index: 0}];
		let mockSender = new MockSenderWithResponse(expectedMockPayload);
		const client = new Client(mockSender);
		let lookup = new Lookup();
		let expectedResult = new Candidate({delivery_line_1: "An address", input_index: 0});

		return client.sendLookup(lookup).then(response => {
			expect(lookup.result[0]).to.deep.equal(expectedResult);
		});
	});

	it("attaches match candidates to their corresponding lookups.", function () {
		const expectedMockPayload = JSON.stringify([
			{delivery_line_1: "Address 0", input_index: 0},
			{delivery_line_1: "Alternate address 0", input_index: 0},
			{delivery_line_1: "Address 1", input_index: 1},
			{delivery_line_1: "Address 3", input_index: 3},
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
			expect(batch.getByIndex(0).result[0].deliveryLine1).to.equal("Address 0");
			expect(batch.getByIndex(0).result[1].deliveryLine1).to.equal("Alternate address 0");
			expect(batch.getByIndex(1).result[0].deliveryLine1).to.equal("Address 1");
			expect(batch.getByIndex(2).result).to.deep.equal([]);
			expect(batch.getByIndex(3).result[0].deliveryLine1).to.equal("Address 3");
		});
	});

	it("rejects with an exception if the response comes back with an error.", function () {
		const expectedMockError = new Error("Stamn! She's a tough one!");
		let mockSender = new MockSenderWithResponse([], expectedMockError);
		let client = new Client(mockSender);
		let lookup = new Lookup();

		return expect(client.sendLookup(lookup)).to.eventually.be.rejectedWith(expectedMockError);
	});

	it("throws an exception if a lookup is undefined.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);

		expect(() => client.sendLookup()).to.throw(errors.UndefinedLookupError);
	});

	it("attaches request parameters for batches with a single lookup and a request payload for batches with more than 1 lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup1 = new Lookup("a");
		let lookup2 = new Lookup("b");
		let batch = new Batch();

		batch.add(lookup1);
		client.sendBatch(batch);

		expect(mockSender.request.parameters).not.to.deep.equal({});

		batch.add(lookup2);
		client.sendBatch(batch);

		expect(mockSender.request.payload).not.to.equal(undefined);
	});
});
