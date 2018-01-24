const chai = require("chai");
const expect = chai.expect;
const Client = require("../../source/us_zipcode/client");
const Lookup = require("../../source/us_zipcode/lookup");
const Batch = require("../../source/batch");
const Promise = require("promise");
const errors = require("../../source/errors");

describe("A US Zipcode client", function () {
	it("has a sender.", function () {
		const mockSender = {};
		const client = new Client(mockSender);

		expect(client.sender).to.deep.equal(mockSender);
	});

	// it("calls its inner sender's send function.", function () {
	// 	const mockSender = {
	// 		send: function (request) {
	// 			sentFlag = true;
	// 			mockSenderRequest = request;
	// 		}
	// 	};
	// 	const client = new Client(mockSender);
	// 	let lookup = new Lookup();
	// 	let sentFlag = false;
	// 	let mockSenderRequest = {};
	//
	// 	client.sendLookup(lookup);
	//
	// 	expect(sentFlag).to.equal(true);
	// });

	it("doesn't send an empty batch.", function () {
		let mockSender = new MockSender();
		const client = new Client(mockSender);
		let batch = new Batch();

		expect(() => client.sendBatch(batch)).to.throw(errors.BatchEmptyError);
	});


});

function MockSender() {
	let request = {
		data: undefined,
		parameters: undefined
	};
	this.request = request;

	this.send = function (clientRequest) {
		request.data = clientRequest.data;
		request.parameters = clientRequest.parameters
	}
}

function MockSenderWithResponse(expectedPayload, expectedError) {
	this.send = function () {
		return new Promise((resolve, reject) => {
			resolve(new Response("", expectedPayload, expectedError));
		});
	}
}
