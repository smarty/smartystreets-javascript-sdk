import { expect } from "chai";
import SecondaryResponse, {
	RootAddress,
	Alias,
	SecondaryEntry,
} from "../../src/us_enrichment/secondary/SecondaryResponse.js";
import SecondaryCountResponse from "../../src/us_enrichment/secondary/SecondaryCountResponse.js";

describe("SecondaryResponse", function () {
	it("maps top-level fields and nested root_address / aliases / secondaries.", function () {
		const raw = {
			smarty_key: "1106658436",
			root_address: {
				secondary_count: 3,
				smarty_key: "1106658436",
				primary_number: "11401",
				street_name: "Dr Martin Luther King Jr",
				street_suffix: "St",
				street_postdirection: "N",
				city_name: "Saint Petersburg",
				state_abbreviation: "FL",
				zipcode: "33716",
				plus4_code: "2345",
			},
			aliases: [
				{
					smarty_key: "1106658436",
					primary_number: "11401",
					street_name: "9th",
					street_suffix: "St",
					street_postdirection: "N",
					city_name: "Saint Petersburg",
					state_abbreviation: "FL",
					zipcode: "33716",
					plus4_code: "2345",
				},
			],
			secondaries: [
				{ smarty_key: "347247266", secondary_designator: "Apt", secondary_number: "101" },
				{ smarty_key: "1301723551", secondary_designator: "Apt", secondary_number: "102" },
			],
		};
		const r = new SecondaryResponse(raw);
		expect(r.smartyKey).to.equal("1106658436");
		expect(r.rootAddress).to.be.an.instanceOf(RootAddress);
		expect(r.rootAddress.secondaryCount).to.equal(3);
		expect(r.rootAddress.streetName).to.equal("Dr Martin Luther King Jr");
		expect(r.rootAddress.zipcode).to.equal("33716");
		expect(r.aliases).to.have.length(1);
		expect(r.aliases[0]).to.be.an.instanceOf(Alias);
		expect(r.aliases[0]!.streetName).to.equal("9th");
		expect(r.secondaries).to.have.length(2);
		expect(r.secondaries[0]).to.be.an.instanceOf(SecondaryEntry);
		expect(r.secondaries[0]!.secondaryNumber).to.equal("101");
		expect(r.secondaries[1]!.smartyKey).to.equal("1301723551");
	});

	it("defaults aliases and secondaries to empty arrays when missing.", function () {
		const r = new SecondaryResponse({ smarty_key: "k" });
		expect(r.smartyKey).to.equal("k");
		expect(r.aliases).to.deep.equal([]);
		expect(r.secondaries).to.deep.equal([]);
		expect(r.rootAddress).to.be.an.instanceOf(RootAddress);
		expect(r.rootAddress.smartyKey).to.equal(undefined);
	});

	it("leaves everything undefined / empty when raw is missing.", function () {
		const r = new SecondaryResponse();
		expect(r.smartyKey).to.equal(undefined);
		expect(r.aliases).to.deep.equal([]);
		expect(r.secondaries).to.deep.equal([]);
		expect(r.rootAddress.secondaryCount).to.equal(undefined);
	});
});

describe("SecondaryCountResponse", function () {
	it("maps smarty_key and count.", function () {
		const r = new SecondaryCountResponse({ smarty_key: "1166392406", count: 12 });
		expect(r.smartyKey).to.equal("1166392406");
		expect(r.count).to.equal(12);
	});

	it("leaves fields undefined when raw is missing.", function () {
		const r = new SecondaryCountResponse();
		expect(r.smartyKey).to.equal(undefined);
		expect(r.count).to.equal(undefined);
	});
});
