const chai = require("chai");
const expect = chai.expect;
const Client = require("../../source/us_street/client");
const Lookup = require("../../source/us_street/lookup");

describe("A client", function () {
	it ("has a sender.", function () {
		const mockSender = {};
		const client = new Client(mockSender);

		expect(client.sender).to.deep.equal(mockSender);
	});

	it ("calls its inner sender's send function.", function () {
		const mockSender = {
			send: function(request) {
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

	// it ("builds a request with the correct JSON payload.", function () {
	// 	function MockSender () {
	// 		let request = {
	// 			payload: ""
	// 		};
	// 		this.request = request;
	//
	// 		this.send = function (clientRequest) {
	// 			request.payload = clientRequest.payload;
	// 		}
	// 	}
	//
	// 	let mockSender = new MockSender();
	// 	const client = new Client(mockSender);
	// 	let lookup = new Lookup("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12");
	// 	let expectedPayloadObject = {
	// 		street: "1",
	// 		street2: "2",
	// 		secondary: "3",
	// 		city: "4",
	// 		state: "5",
	// 		zip_code: "6",
	// 		last_line: "7",
	// 		addressee: "8",
	// 		urbanization: "9",
	// 		match: "10",
	// 		max_candidates: "11",
	// 		input_id: "12"
	// 	};
	// 	let expectedPayload = JSON.stringify(expectedPayloadObject);
	//
	// 	client.sendLookup(lookup);
	//
	// 	expect(mockSender.request.payload).to.equal(expectedPayload);
	// });
});
