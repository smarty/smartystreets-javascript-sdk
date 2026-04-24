import { expect } from "chai";
import SummaryLookup from "../../src/us_enrichment/business/SummaryLookup.js";
import DetailLookup from "../../src/us_enrichment/business/DetailLookup.js";
import EnrichmentLookupBase from "../../src/us_enrichment/EnrichmentLookupBase.js";

describe("Business SummaryLookup", function () {
	it("stores smartyKey when constructed with one", function () {
		const l = new SummaryLookup("sk");
		expect(l.smartyKey).to.equal("sk");
	});

	it("defaults all fields to undefined and customParameters to empty object", function () {
		const l = new SummaryLookup();
		expect(l.smartyKey).to.equal(undefined);
		expect(l.street).to.equal(undefined);
		expect(l.city).to.equal(undefined);
		expect(l.state).to.equal(undefined);
		expect(l.zipcode).to.equal(undefined);
		expect(l.freeform).to.equal(undefined);
		expect(l.results).to.equal(undefined);
		expect(l.customParameters).to.deep.equal({});
	});

	it("inherits ETag fields and addCustomParameter from the base class", function () {
		const l = new SummaryLookup("sk");
		expect(l).to.be.an.instanceOf(EnrichmentLookupBase);
		l.requestEtag = "r1";
		l.addCustomParameter("foo", "bar");
		expect(l.requestEtag).to.equal("r1");
		expect(l.customParameters).to.deep.equal({ foo: "bar" });
	});
});

describe("Business DetailLookup", function () {
	it("stores businessId when constructed with one", function () {
		const l = new DetailLookup("ABC123");
		expect(l.businessId).to.equal("ABC123");
	});

	it("leaves businessId undefined when constructed with no argument", function () {
		const l = new DetailLookup();
		expect(l.businessId).to.equal(undefined);
	});

	it("initializes result to undefined", function () {
		const l = new DetailLookup("ABC");
		expect(l.result).to.equal(undefined);
	});

	it("inherits ETag fields and addCustomParameter from the base class", function () {
		const l = new DetailLookup("ABC");
		expect(l).to.be.an.instanceOf(EnrichmentLookupBase);
		l.requestEtag = "r1";
		l.addCustomParameter("foo", "bar");
		expect(l.requestEtag).to.equal("r1");
		expect(l.customParameters).to.deep.equal({ foo: "bar" });
	});
});
