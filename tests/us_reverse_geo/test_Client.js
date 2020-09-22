const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
const Client = require("../../src/us_reverse_geo/Client");
const Lookup = require("../../src/us_reverse_geo/Lookup");
const MockSender = require("../fixtures/mock_senders").MockSender;

describe("A US Reverse Geo client", function () {
	it("has an inner sender.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);

		expect(client.sender).to.deep.equal(mockSender);
	});

	it("builds a request for a single lookup with the correct request parameters.", function () {
		let mockSender = new MockSender();
		const client = new Client(mockSender);
		let lookup = new Lookup(44.888888888, -111.111111111);
		let expectedParameters = {
			latitude: "44.88888889",
			longitude: "-111.11111111",
		};

		client.send(lookup);

		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});
});
