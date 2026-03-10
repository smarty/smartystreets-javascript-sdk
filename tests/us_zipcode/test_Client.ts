import { expect } from "chai";
import Client from "../../src/us_zipcode/Client.js";
import Lookup from "../../src/us_zipcode/Lookup.js";
import Result from "../../src/us_zipcode/Result.js";
import Batch from "../../src/Batch.js";
import errors from "../../src/Errors.js";
import { MockSender, MockSenderWithResponse } from "../fixtures/mock_senders.js";

describe("A US Zipcode client", function () {
	it("calls its inner sender's send function.", function () {
		const mockSender = {
			send: function (_request: any) {
				sentFlag = true;
				return new Promise((_resolve) => {});
			},
		};
		const client = new Client(mockSender as any);
		let lookup = new Lookup();
		let sentFlag = false;

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
		const expectedPayload = [{ city: "lookup0" }, { city: "lookup1" }, { city: "lookup2" }];

		batch.add(lookup0);
		batch.add(lookup1);
		batch.add(lookup2);

		client.send(batch);

		expect(mockSender.request.payload).to.deep.equal(expectedPayload);
	});

	it("attaches a match candidate from a response to a lookup.", function () {
		const expectedMockPayload = [{ input_index: 0 }];
		let mockSender = new MockSenderWithResponse(expectedMockPayload);
		const client = new Client(mockSender);
		let lookup = new Lookup();
		let expectedResult = new Result({ input_index: 0 });

		return client.send(lookup).then((_response) => {
			expect(lookup.result[0]).to.deep.equal(expectedResult);
		});
	});

	it("attaches match candidates to their corresponding lookups.", function () {
		const expectedMockPayload = [
			{ status: "Status 0", input_index: 0 },
			{ status: "Alternate status 0", input_index: 0 },
			{ status: "Status 1", input_index: 1 },
			{ status: "Status 3", input_index: 3 },
		];
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

		return client.send(batch).then((_response) => {
			const get = (i: number) => batch.getByIndex(i) as Lookup;
			expect(get(0).result[0].status).to.equal("Status 0");
			expect(get(0).result[1].status).to.equal("Alternate status 0");
			expect(get(1).result[0].status).to.equal("Status 1");
			expect(get(2).result).to.deep.equal([]);
			expect(get(3).result[0].status).to.equal("Status 3");
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

		return client.send(lookup).catch((e) => {
			expect(e).to.equal(expectedMockError);
		});
	});

	it("throws an exception if a lookup is undefined.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);

		expect(() => (client.send as any)()).to.throw(errors.UndefinedLookupError);
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
