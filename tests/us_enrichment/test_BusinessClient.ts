import { expect } from "chai";
import Client from "../../src/us_enrichment/Client.js";
import SummaryLookup from "../../src/us_enrichment/business/SummaryLookup.js";
import DetailLookup from "../../src/us_enrichment/business/DetailLookup.js";
import DetailResult from "../../src/us_enrichment/business/DetailResult.js";
import SummaryResult, { BusinessEntry } from "../../src/us_enrichment/business/SummaryResult.js";
import errors, { SmartyError } from "../../src/Errors.js";
import { MockSender, MockSenderWithResponse } from "../fixtures/mock_senders.js";

describe("Client.sendBusinessSummary", function () {
	it("targets /<smartyKey>/business when only smartyKey is set", function () {
		const mockSender = new MockSender();
		const client = new Client(mockSender);
		const lookup = new SummaryLookup("sk-42");

		client.sendBusinessSummary(lookup);

		expect(mockSender.request.baseUrlParam).to.equal("sk-42/business");
	});

	it("targets /search/business and carries component params when smartyKey is absent", function () {
		const mockSender = new MockSender();
		const client = new Client(mockSender);
		const lookup = new SummaryLookup();
		lookup.street = "1 Main";
		lookup.city = "Provo";
		lookup.state = "UT";
		lookup.zipcode = "84601";

		client.sendBusinessSummary(lookup);

		expect(mockSender.request.baseUrlParam).to.equal("search/business");
		expect(mockSender.request.parameters).to.deep.equal({
			street: "1 Main",
			city: "Provo",
			state: "UT",
			zipcode: "84601",
		});
	});

	it("targets /search/business with a freeform param", function () {
		const mockSender = new MockSender();
		const client = new Client(mockSender);
		const lookup = new SummaryLookup();
		lookup.freeform = "1 Main St Provo UT 84601";

		client.sendBusinessSummary(lookup);

		expect(mockSender.request.baseUrlParam).to.equal("search/business");
		expect(mockSender.request.parameters).to.deep.equal({
			freeform: "1 Main St Provo UT 84601",
		});
	});

	it("sends include, exclude, and custom parameters when set", function () {
		const mockSender = new MockSender();
		const client = new Client(mockSender);
		const lookup = new SummaryLookup("sk");
		lookup.include = "a,b";
		lookup.exclude = "c,d";
		lookup.addCustomParameter("foo", "bar");

		client.sendBusinessSummary(lookup);

		expect(mockSender.request.parameters).to.deep.equal({
			include: "a,b",
			exclude: "c,d",
			foo: "bar",
		});
	});

	it("sends the Etag request header when requestEtag is set", function () {
		const mockSender = new MockSender();
		const client = new Client(mockSender);
		const lookup = new SummaryLookup("sk");
		lookup.requestEtag = "abc";

		client.sendBusinessSummary(lookup);

		expect(mockSender.request.headers["Etag"]).to.equal("abc");
	});

	it("throws when the lookup has no smartyKey, street, or freeform", function () {
		const client = new Client(new MockSender());
		expect(() => client.sendBusinessSummary(new SummaryLookup())).to.throw(SmartyError);
	});

	it("throws UndefinedLookupError when the lookup itself is missing", function () {
		const client = new Client(new MockSender());
		expect(() => client.sendBusinessSummary(undefined as any)).to.throw(
			errors.UndefinedLookupError,
		);
	});

	it("captures responseEtag from a lowercase etag response header", function () {
		const mockSender = new MockSenderWithResponse([], null, { etag: "srv-1" });
		const client = new Client(mockSender);
		const lookup = new SummaryLookup("sk");

		return client.sendBusinessSummary(lookup).then(() => {
			expect(lookup.responseEtag).to.equal("srv-1");
		});
	});

	it("deserializes an array of SummaryResult with nested BusinessEntry items", function () {
		const payload = [
			{
				smarty_key: "sk-1",
				data_set_name: "business",
				businesses: [
					{ company_name: "Foo Inc", business_id: "bid-1" },
					{ company_name: "Bar LLC", business_id: "bid-2" },
				],
			},
		];
		const mockSender = new MockSenderWithResponse(payload);
		const client = new Client(mockSender);
		const lookup = new SummaryLookup("sk-1");

		return client.sendBusinessSummary(lookup).then(() => {
			expect(lookup.results).to.have.length(1);
			const r = lookup.results![0]!;
			expect(r).to.be.an.instanceOf(SummaryResult);
			expect(r.smartyKey).to.equal("sk-1");
			expect(r.dataSetName).to.equal("business");
			expect(r.businesses).to.have.length(2);
			expect(r.businesses[0]).to.be.an.instanceOf(BusinessEntry);
			expect(r.businesses[0]!.companyName).to.equal("Foo Inc");
			expect(r.businesses[0]!.businessId).to.equal("bid-1");
			expect(r.businesses[1]!.companyName).to.equal("Bar LLC");
		});
	});

	it("returns an empty results array when the server returns an empty array", function () {
		const mockSender = new MockSenderWithResponse([]);
		const client = new Client(mockSender);
		const lookup = new SummaryLookup("sk-1");

		return client.sendBusinessSummary(lookup).then(() => {
			expect(lookup.results).to.deep.equal([]);
		});
	});
});

describe("Client.sendBusinessDetail", function () {
	it("targets /business/<businessId> when businessId is set", function () {
		const mockSender = new MockSender();
		const client = new Client(mockSender);

		client.sendBusinessDetail(new DetailLookup("ABC123"));

		expect(mockSender.request.baseUrlParam).to.equal("business/ABC123");
	});

	it("URL-encodes reserved characters in businessId", function () {
		const mockSender = new MockSender();
		const client = new Client(mockSender);

		client.sendBusinessDetail(new DetailLookup("a/b?c#d"));

		expect(mockSender.request.baseUrlParam).to.equal("business/a%2Fb%3Fc%23d");
	});

	it("sends the Etag request header when requestEtag is set", function () {
		const mockSender = new MockSender();
		const client = new Client(mockSender);
		const lookup = new DetailLookup("ABC");
		lookup.requestEtag = "client-etag";

		client.sendBusinessDetail(lookup);

		expect(mockSender.request.headers["Etag"]).to.equal("client-etag");
	});

	it("sends include, exclude, and custom parameters when set", function () {
		const mockSender = new MockSender();
		const client = new Client(mockSender);
		const lookup = new DetailLookup("ABC");
		lookup.include = "companyName";
		lookup.exclude = "creditScore";
		lookup.addCustomParameter("tier", "gold");

		client.sendBusinessDetail(lookup);

		expect(mockSender.request.parameters).to.deep.equal({
			include: "companyName",
			exclude: "creditScore",
			tier: "gold",
		});
	});

	it("throws when the lookup is undefined", function () {
		const client = new Client(new MockSender());
		expect(() => client.sendBusinessDetail(undefined as any)).to.throw(SmartyError);
	});

	it("throws when the lookup has a missing businessId", function () {
		const client = new Client(new MockSender());
		expect(() => client.sendBusinessDetail(new DetailLookup())).to.throw(SmartyError);
	});

	it("throws when the businessId is an empty string", function () {
		const client = new Client(new MockSender());
		expect(() => client.sendBusinessDetail(new DetailLookup(""))).to.throw(SmartyError);
	});

	it("throws when the businessId is whitespace only", function () {
		const client = new Client(new MockSender());
		expect(() => client.sendBusinessDetail(new DetailLookup("   "))).to.throw(SmartyError);
	});

	it("deserializes a single-element array into a DetailResult", function () {
		const payload = [
			{
				smarty_key: "sk-1",
				data_set_name: "business",
				business_id: "bid-1",
				attributes: {
					company_name: "Foo Inc",
					city_name: "Provo",
					primary_sic_2digit_code: "73",
				},
			},
		];
		const mockSender = new MockSenderWithResponse(payload);
		const client = new Client(mockSender);
		const lookup = new DetailLookup("bid-1");

		return client.sendBusinessDetail(lookup).then(() => {
			expect(lookup.result).to.be.an.instanceOf(DetailResult);
			expect(lookup.result!.smartyKey).to.equal("sk-1");
			expect(lookup.result!.dataSetName).to.equal("business");
			expect(lookup.result!.businessId).to.equal("bid-1");
			expect(lookup.result!.attributes.companyName).to.equal("Foo Inc");
			expect(lookup.result!.attributes.cityName).to.equal("Provo");
			expect(lookup.result!.attributes.primarySic2DigitCode).to.equal("73");
		});
	});

	it("leaves result undefined when the response array is empty", function () {
		const mockSender = new MockSenderWithResponse([]);
		const client = new Client(mockSender);
		const lookup = new DetailLookup("bid-1");

		return client.sendBusinessDetail(lookup).then(() => {
			expect(lookup.result).to.equal(undefined);
		});
	});

	it("rejects with SmartyError when the response contains more than one result", function () {
		const mockSender = new MockSenderWithResponse([{}, {}]);
		const client = new Client(mockSender);
		const lookup = new DetailLookup("bid-1");

		return client.sendBusinessDetail(lookup).then(
			() => {
				throw new Error("expected rejection");
			},
			(err) => {
				expect(err).to.be.an.instanceOf(SmartyError);
				expect(err.message).to.match(/expected at most 1/);
			},
		);
	});

	it("captures responseEtag from a lowercase etag response header", function () {
		const mockSender = new MockSenderWithResponse([], null, { etag: "srv-1" });
		const client = new Client(mockSender);
		const lookup = new DetailLookup("bid-1");

		return client.sendBusinessDetail(lookup).then(() => {
			expect(lookup.responseEtag).to.equal("srv-1");
		});
	});

	it("captures responseEtag from a mixed-case Etag response header", function () {
		const mockSender = new MockSenderWithResponse([], null, { ETag: "srv-2" });
		const client = new Client(mockSender);
		const lookup = new DetailLookup("bid-1");

		return client.sendBusinessDetail(lookup).then(() => {
			expect(lookup.responseEtag).to.equal("srv-2");
		});
	});

	it("leaves responseEtag undefined when the Etag response header is absent", function () {
		const mockSender = new MockSenderWithResponse([], null, {});
		const client = new Client(mockSender);
		const lookup = new DetailLookup("bid-1");

		return client.sendBusinessDetail(lookup).then(() => {
			expect(lookup.responseEtag).to.equal(undefined);
		});
	});

	it("keeps requestEtag and responseEtag as separate fields", function () {
		const mockSender = new MockSenderWithResponse([], null, { Etag: "srv-new" });
		const client = new Client(mockSender);
		const lookup = new DetailLookup("bid-1");
		lookup.requestEtag = "req-orig";

		return client.sendBusinessDetail(lookup).then(() => {
			expect(lookup.requestEtag).to.equal("req-orig");
			expect(lookup.responseEtag).to.equal("srv-new");
		});
	});
});

describe("Client error unwrapping", function () {
	it("rejects with NotModifiedError directly when the sender rejects with a Response wrapper (304)", function () {
		const notModified = new errors.NotModifiedError(undefined, "srv-etag");
		const wrapper = {
			statusCode: 304,
			payload: null,
			error: notModified,
			headers: { etag: "srv-etag" },
		};
		const failingSender = { send: () => Promise.reject(wrapper) };
		const client = new Client(failingSender as any);

		return client.sendBusinessSummary(new SummaryLookup("sk")).then(
			() => {
				throw new Error("expected rejection");
			},
			(err) => {
				expect(err).to.be.an.instanceOf(errors.NotModifiedError);
				expect(err.responseEtag).to.equal("srv-etag");
			},
		);
	});

	it("rejects with the inner InternalServerError for a wrapped 500", function () {
		const internal = new errors.InternalServerError();
		const wrapper = { statusCode: 500, payload: null, error: internal, headers: {} };
		const failingSender = { send: () => Promise.reject(wrapper) };
		const client = new Client(failingSender as any);

		return client.sendBusinessDetail(new DetailLookup("bid")).then(
			() => {
				throw new Error("expected rejection");
			},
			(err) => {
				expect(err).to.be.an.instanceOf(errors.InternalServerError);
			},
		);
	});

	it("passes through a plain Error rejection unchanged", function () {
		const plain = new Error("boom");
		const failingSender = { send: () => Promise.reject(plain) };
		const client = new Client(failingSender as any);

		return client.sendBusinessSummary(new SummaryLookup("sk")).then(
			() => {
				throw new Error("expected rejection");
			},
			(err) => {
				expect(err).to.equal(plain);
			},
		);
	});
});
