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

	it("correctly builds a payload for a text only lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let mockText = "yump.";
		let lookup = new Lookup(mockText);
		let expectedPayload = {
			text: mockText,
			html: undefined,
			aggressive: undefined,
			addr_line_breaks: undefined,
			addr_per_line: undefined,
		};

		client.send(lookup);

		expect(mockSender.request.payload).to.deep.equal(expectedPayload);
	});

	it("correctly builds parameters for a fully-populated lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		const mockText = "The flocculated scunge is subprime for human consumption.";
		let lookup = new Lookup(mockText);
		lookup.html = 1;
		lookup.aggressive = 2;
		lookup.addressesHaveLineBreaks = 3;
		lookup.addressesPerLine = 4;

		let expectedPayload = {
			text: mockText,
			html: 1,
			aggressive: 2,
			addr_line_breaks: 3,
			addr_per_line: 4,
		};

		client.send(lookup);

		expect(mockSender.request.payload).to.deep.equal(expectedPayload);
	});

	it("rejects with an exception if the response comes back with an error.", function () {
		let expectedError = new Error("I'm the error.");
		let mockSender = new MockSenderWithResponse("", expectedError);
		let client = new Client(mockSender);
		let lookup = new Lookup("Shine on you crazy diamond.");

		return expect(client.send(lookup)).to.eventually.be.rejectedWith(expectedError);
	});
});