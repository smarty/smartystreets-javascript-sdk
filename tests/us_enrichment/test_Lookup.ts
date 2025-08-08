import { expect } from "chai";
import Lookup from "../../src/us_enrichment/Lookup.js";

describe("A US Enrichment Lookup", function () {
    it("can be newed up with all basic fields.", function () {
        const expectedSmartyKey = "a";
        const expectedInclude = "b";
        const expectedExclude = "c";
        const expectedDataset = "d";
        const expectedDataSubset = "e";

        let lookup = new Lookup(expectedSmartyKey, expectedInclude, expectedExclude, expectedDataset, expectedDataSubset);
        expect(lookup.smartyKey).to.equal(expectedSmartyKey);
        expect(lookup.include).to.equal(expectedInclude);
        expect(lookup.exclude).to.equal(expectedExclude);
        expect(lookup.dataset).to.equal(expectedDataset);
        expect(lookup.dataSubset).to.equal(expectedDataSubset);
    });


});