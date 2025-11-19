const chai = require("chai");
const expect = chai.expect;
const Lookup = require("../../src/us_enrichment/Lookup");

describe("A US Enrichment Lookup", function () {
	it("can be newed up with all basic fields.", function () {
		const expectedSmartyKey = "a";
		const expectedInclude = "b";
		const expectedExclude = "c";
		const expectedDataset = "d";
		const expectedDataSubset = "e";
		const expectedFeatures = "f";

		let lookup = new Lookup(
			expectedSmartyKey,
			expectedInclude,
			expectedExclude,
			expectedDataset,
			expectedDataSubset,
		);
		lookup.features = expectedFeatures;
		expect(lookup.smartyKey).to.equal(expectedSmartyKey);
		expect(lookup.include).to.equal(expectedInclude);
		expect(lookup.exclude).to.equal(expectedExclude);
		expect(lookup.dataset).to.equal(expectedDataset);
		expect(lookup.dataSubset).to.equal(expectedDataSubset);
		expect(lookup.features).to.equal(expectedFeatures);
	});
});