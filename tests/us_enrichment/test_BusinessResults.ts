import { expect } from "chai";
import DetailResult from "../../src/us_enrichment/business/DetailResult.js";
import SummaryResult, { BusinessEntry } from "../../src/us_enrichment/business/SummaryResult.js";

describe("Business SummaryResult / BusinessEntry", function () {
	it("maps snake_case fields on Summary result", function () {
		const r = new SummaryResult({
			smarty_key: "sk-1",
			data_set_name: "business",
			businesses: [{ company_name: "Foo", business_id: "bid" }],
		});
		expect(r.smartyKey).to.equal("sk-1");
		expect(r.dataSetName).to.equal("business");
		expect(r.businesses).to.have.length(1);
		expect(r.businesses[0]).to.be.an.instanceOf(BusinessEntry);
		expect(r.businesses[0]!.companyName).to.equal("Foo");
		expect(r.businesses[0]!.businessId).to.equal("bid");
	});

	it("defaults businesses to an empty array when the raw field is missing", function () {
		const r = new SummaryResult({ smarty_key: "sk-1" });
		expect(r.businesses).to.deep.equal([]);
	});

	it("leaves optional fields undefined when raw is empty", function () {
		const r = new SummaryResult({});
		expect(r.smartyKey).to.equal(undefined);
		expect(r.dataSetName).to.equal(undefined);
		expect(r.businesses).to.deep.equal([]);
	});

	it("BusinessEntry leaves fields undefined when raw is missing", function () {
		const e = new BusinessEntry();
		expect(e.companyName).to.equal(undefined);
		expect(e.businessId).to.equal(undefined);
	});
});

describe("Business DetailResult", function () {
	it("maps top-level fields and nested attributes", function () {
		const r = new DetailResult({
			smarty_key: "sk-1",
			data_set_name: "business",
			business_id: "bid-1",
			attributes: { company_name: "Foo Inc" },
		});
		expect(r.smartyKey).to.equal("sk-1");
		expect(r.dataSetName).to.equal("business");
		expect(r.businessId).to.equal("bid-1");
		expect(r.attributes.companyName).to.equal("Foo Inc");
	});

	it("produces an empty attributes object when raw.attributes is missing", function () {
		const r = new DetailResult({ smarty_key: "sk-1", business_id: "bid-1" });
		expect(r.smartyKey).to.equal("sk-1");
		expect(r.businessId).to.equal("bid-1");
		expect(r.attributes.companyName).to.equal(undefined);
		expect(r.attributes.zipcode).to.equal(undefined);
	});

	it("leaves all fields undefined when raw is missing entirely", function () {
		const r = new DetailResult();
		expect(r.smartyKey).to.equal(undefined);
		expect(r.dataSetName).to.equal(undefined);
		expect(r.businessId).to.equal(undefined);
		expect(r.attributes.companyName).to.equal(undefined);
	});
});
