const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const Client = require("../../source/us_extract/Client");
const Lookup = require("../../source/us_extract/Lookup");
const MockSender = require("../fixtures/mock_senders").MockSender;
const MockSenderWithResponse = require("../fixtures/mock_senders").MockSenderWithResponse;
const errors = require("../../source/errors");

describe("A US Extract Client", function () {
	it("throws an error if sending without a lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);

		expect(client.send).to.throw(errors.UndefinedLookupError);
	});
	// it("calls its inner sender's send function.", function () {
	// 	let mockSender = new MockSender();
	// 	let client = new Client(mockSender);
	// 	let mockText = "yump.";
	// 	let lookup = new Lookup(mockText);
	// 	let expectedPayload = {
	// 		text: mockText,
	// 		html: undefined,
	// 		aggressive: undefined,
	// 		addr_line_breaks: undefined,
	// 		addr_per_line: undefined,
	// 	};
	//
	// 	client.send(lookup);
	//
	// 	expect(mockSender.request.payload).to.deep.equal(expectedPayload);
	// });
});