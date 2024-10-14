import {mockSenders} from "../fixtures/mock_senders.js";
import {UndefinedLookupError} from "../../src/Errors.js";
import {Lookup} from "../../src/international_street/Lookup.js";
import {Candidate} from "../../src/international_street/Candidate.js";
import { Client} from "../../src/international_street/Client.js";
import { expect } from "chai";


describe("An International Street client", function () {
	it("has an inner sender.", function () {
		let mockSender = new mockSenders.MockSender();
		let client = new Client(mockSender);

		expect(client.sender).to.deep.equal(mockSender);
	});

	it("throws an error if sending without a lookup.", function () {
		let mockSender = new mockSenders.MockSender();
		let client = new Client(mockSender);

		expect(client.send).to.throw(UndefinedLookupError);
	});

	it("correctly assigns request parameters based on lookup input.", function () {
		let mockSender = new mockSenders.MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup("a", "b");
		lookup.address1 = "c";
		lookup.address2 = "d";
		lookup.address3 = "e";
		lookup.address4 = "f";
		lookup.organization = "g";
		lookup.locality = "h";
		lookup.administrativeArea = "i";
		lookup.postalCode = "j";
		lookup.geocode = "k";
		lookup.language = "l";
		let expectedParameters = {
			country: "a",
			freeform: "b",
			address1: "c",
			address2: "d",
			address3: "e",
			address4: "f",
			organization: "g",
			locality: "h",
			administrative_area: "i",
			postal_code: "j",
			geocode: "k",
			language: "l",
		};

		client.send(lookup);

		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("attaches a match candidate from a response to a lookup.", function () {
		const expectedMockPayload = [{address1: "A", }];
		let mockSender = new mockSenders.MockSenderWithResponse(expectedMockPayload);
		const client = new Client(mockSender);
		let lookup = new Lookup();
		let expectedResult = new Candidate({address1: "A"});

		return client.send(lookup).then(response => {
			expect(lookup.result[0]).to.deep.equal(expectedResult);
		});
	});
});
