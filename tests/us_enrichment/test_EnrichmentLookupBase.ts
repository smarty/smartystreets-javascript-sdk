import { expect } from "chai";
import EnrichmentLookupBase from "../../src/us_enrichment/EnrichmentLookupBase.js";

class Concrete extends EnrichmentLookupBase {}

describe("EnrichmentLookupBase", function () {
	it("initializes customParameters to an empty object", function () {
		const lookup = new Concrete();
		expect(lookup.customParameters).to.deep.equal({});
	});

	it("leaves include/exclude/requestEtag/responseEtag undefined by default", function () {
		const lookup = new Concrete();
		expect(lookup.include).to.equal(undefined);
		expect(lookup.exclude).to.equal(undefined);
		expect(lookup.requestEtag).to.equal(undefined);
		expect(lookup.responseEtag).to.equal(undefined);
	});

	it("addCustomParameter stores the value", function () {
		const lookup = new Concrete();
		lookup.addCustomParameter("foo", "bar");
		expect(lookup.customParameters).to.deep.equal({ foo: "bar" });
	});

	it("addCustomParameter overwrites on duplicate keys", function () {
		const lookup = new Concrete();
		lookup.addCustomParameter("foo", "bar");
		lookup.addCustomParameter("foo", "baz");
		expect(lookup.customParameters).to.deep.equal({ foo: "baz" });
	});

	it("allows direct assignment to requestEtag and responseEtag", function () {
		const lookup = new Concrete();
		lookup.requestEtag = "req-1";
		lookup.responseEtag = "res-1";
		expect(lookup.requestEtag).to.equal("req-1");
		expect(lookup.responseEtag).to.equal("res-1");
	});
});
