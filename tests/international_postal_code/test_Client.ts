import { expect } from "chai";
import Client from "../../src/international_postal_code/Client.js";
import Lookup from "../../src/international_postal_code/Lookup.js";
import { LanguageMode } from "../../src/international_postal_code/LanguageMode.js";
import { MockSender, MockSenderWithResponse } from "../fixtures/mock_senders.js";

describe("An International Postal Code client", function () {
	it("throws an error if sending without a lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);

		expect(() => (client.send as any)()).to.throw();
	});

	it("correctly assigns request parameters based on lookup input.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup("CAN", "ABC DEF", "ON", "Toronto", "Hello, World!");
		lookup.language = LanguageMode.Native;
		lookup.maxResults = 25;
		let expectedParameters = {
			input_id: "Hello, World!",
			country: "CAN",
			language: "native",
			locality: "Toronto",
			administrative_area: "ON",
			postal_code: "ABC DEF",
			max_results: 25,
		};

		client.send(lookup);

		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("omits language and max_results when unset.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup("Brazil", "02516-040");

		client.send(lookup);

		expect(mockSender.request.parameters).to.not.have.property("language");
		expect(mockSender.request.parameters).to.not.have.property("max_results");
	});

	it("sends the latin language value.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup("Brazil", "02516-040");
		lookup.language = LanguageMode.Latin;

		client.send(lookup);

		expect(mockSender.request.parameters["language"]).to.equal("latin");
	});

	it("normalizes a mixed-case language value before sending.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup("Brazil", "02516-040");
		lookup.language = "NATIVE" as LanguageMode;

		client.send(lookup);

		expect(mockSender.request.parameters["language"]).to.equal("native");
	});

	it("omits max_results when set to zero.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup("Brazil", "02516-040");
		lookup.maxResults = 0;

		client.send(lookup);

		expect(mockSender.request.parameters).to.not.have.property("max_results");
	});

	it("attaches a result from a response to a lookup.", function () {
		const expectedMockPayload = [
			{
				input_id: "1234",
				administrative_area: "SP",
				super_administrative_area: undefined,
				sub_administrative_area: undefined,
				locality: "São Paulo",
				dependent_locality: "Casa Verde",
				dependent_locality_name: undefined,
				double_dependent_locality: undefined,
				postal_code: "02516-040",
				postal_code_extra: undefined,
				country_iso_3: "BRA",
				thoroughfare: "Rua Padre Antonio D'Angelo",
			},
		];
		let mockSender = new MockSenderWithResponse(expectedMockPayload);
		const client = new Client(mockSender);
		let lookup = new Lookup("Brazil", "02516-040");

		return client.send(lookup).then(() => {
			expect(lookup.result).to.be.an("array");
			expect(lookup.result.length).to.equal(1);
			expect(lookup.result[0].inputId).to.equal("1234");
			expect(lookup.result[0].administrativeArea).to.equal("SP");
			expect(lookup.result[0].locality).to.equal("São Paulo");
			expect(lookup.result[0].dependentLocality).to.equal("Casa Verde");
			expect(lookup.result[0].postalCode).to.equal("02516-040");
			expect(lookup.result[0].countryIso3).to.equal("BRA");
			expect(lookup.result[0].thoroughfare).to.equal("Rua Padre Antonio D'Angelo");
		});
	});

	it("handles empty results array.", function () {
		const expectedMockPayload = {
			results: [],
		};
		let mockSender = new MockSenderWithResponse(expectedMockPayload);
		const client = new Client(mockSender);
		let lookup = new Lookup("Brazil", "99999-999");

		return client.send(lookup).then(() => {
			expect(lookup.result).to.be.an("array");
			expect(lookup.result.length).to.equal(0);
		});
	});
});
