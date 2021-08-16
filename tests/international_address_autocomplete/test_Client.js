const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const Client = require("../../src/international_address_autocomplete/Client");
const Lookup = require("../../src/international_address_autocomplete/Lookup");
const errors = require("../../src/Errors");
const MockSender = require("../fixtures/mock_senders").MockSender;
const MockSenderWithResponse = require("../fixtures/mock_senders").MockSenderWithResponse;

describe("An International Address Autocomplete Client", function () {
	it ("correctly builds parameter", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let search = "(";
		let lookup = new Lookup(search);
		let expectedParameters = {
			search: search,
			country: "United States",
		};

		client.send(lookup);
		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	})

	it ("builds parameters for different country", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let search = "(";
		let lookup = new Lookup(search);
		lookup.search = search;
		lookup.country = "Russia"
		let expectedParameters = {
			search: search,
			country: "Russia",
		};

		client.send(lookup);
		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	})
})