import { expect } from "chai";
import Client from "../../src/us_enrichment/Client.js";
import Lookup from "../../src/us_enrichment/Lookup.js";
import errors from "../../src/Errors.js";
import { MockSender, MockSenderWithResponse } from "../fixtures/mock_senders.js";
import { Response, GeoResponse } from "../../src/us_enrichment/Response.js";
import SecondaryResponse from "../../src/us_enrichment/secondary/SecondaryResponse.js";
import SecondaryCountResponse from "../../src/us_enrichment/secondary/SecondaryCountResponse.js";

describe("A US Enrichment Client", function () {
	it("composes principal url path properly", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let smartyKey = "0";
		let lookup = new Lookup(smartyKey);

		client.sendPrincipal(lookup);

		expect(mockSender.request.baseUrlParam).to.deep.equal("0/property/principal");
	});

	it("composes financial url path properly", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let smartyKey = "0";
		let lookup = new Lookup(smartyKey);

		client.sendFinancial(lookup);

		expect(mockSender.request.baseUrlParam).to.deep.equal("0/property/principal");
	});

	it("composes geo url path properly", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let smartyKey = "0";
		let lookup = new Lookup(smartyKey);

		client.sendGeo(lookup);

		expect(mockSender.request.baseUrlParam).to.deep.equal("0/geo-reference");
	});

	it("composes secondary url path properly", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let smartyKey = "0";
		let lookup = new Lookup(smartyKey);

		client.sendSecondary(lookup);

		expect(mockSender.request.baseUrlParam).to.deep.equal("0/secondary");
	});

	it("composes secondary count url path properly", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let smartyKey = "0";
		let lookup = new Lookup(smartyKey);

		client.sendSecondaryCount(lookup);

		expect(mockSender.request.baseUrlParam).to.deep.equal("0/secondary/count");
	});

	it("correctly builds parameters for a smartyKey only principal lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let smartyKey = '(>")>#';
		let include = "1";
		let lookup = new Lookup(smartyKey, include);
		let expectedParameters = {
			include: include,
		};

		client.sendPrincipal(lookup);

		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("correctly builds parameters for a smartyKey only financial lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let smartyKey = '(>")>#';
		let include = "1";
		let lookup = new Lookup(smartyKey, include);
		let expectedParameters = {
			include: include,
			features: "financial",
		};

		client.sendFinancial(lookup);

		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("correctly builds parameters for a smartyKey only geo lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let smartyKey = '(>")>#';
		let include = "1";
		let lookup = new Lookup(smartyKey, include);
		let expectedParameters = {
			include: include,
		};

		client.sendGeo(lookup);

		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("correctly builds parameters for a smartyKey only secondary lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let smartyKey = '(>")>#';
		let include = "1";
		let lookup = new Lookup(smartyKey, include);
		let expectedParameters = {
			include: include,
		};

		client.sendSecondary(lookup);

		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("correctly builds parameters for a smartyKey only secondary count lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let smartyKey = '(>")>#';
		let include = "1";
		let lookup = new Lookup(smartyKey, include);
		let expectedParameters = {
			include: include,
		};

		client.sendSecondaryCount(lookup);

		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("correctly builds parameters for a fully-populated principal lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup("0", "1", "2", "3", "4");

		let expectedParameters = {
			include: "1",
			exclude: "2",
			dataset: "3",
			data_subset: "4",
		};

		client.sendPrincipal(lookup);
		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("correctly builds parameters for a fully-populated financial lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup("0", "1", "2", "3", "4");

		let expectedParameters = {
			include: "1",
			exclude: "2",
			dataset: "3",
			data_subset: "4",
			features: "financial",
		};

		client.sendFinancial(lookup);
		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("correctly builds parameters for a fully-populated geo lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup("0", "1", "2", "3", "4");

		let expectedParameters = {
			include: "1",
			exclude: "2",
			dataset: "3",
			data_subset: "4",
		};

		client.sendGeo(lookup);
		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("correctly builds parameters for a fully-populated secondary lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup("0", "1", "2", "3", "4");

		let expectedParameters = {
			include: "1",
			exclude: "2",
			dataset: "3",
			data_subset: "4",
		};

		client.sendSecondary(lookup);
		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("correctly builds parameters for a fully-populated secondary count lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let lookup = new Lookup("0", "1", "2", "3", "4");

		let expectedParameters = {
			include: "1",
			exclude: "2",
			dataset: "3",
			data_subset: "4",
		};

		client.sendSecondaryCount(lookup);
		expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
	});

	it("throws an error if sending without a principal lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		expect(client.sendPrincipal).to.throw(errors.UndefinedLookupError);
	});

	it("throws an error if sending without a financial lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		expect(client.sendFinancial).to.throw(errors.UndefinedLookupError);
	});

	it("throws an error if sending without a geo lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		expect(client.sendGeo).to.throw(errors.UndefinedLookupError);
	});

	it("throws an error if sending without a secondary lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		expect(client.sendSecondary).to.throw(errors.UndefinedLookupError);
	});

	it("throws an error if sending without a secondary count lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		expect(client.sendSecondaryCount).to.throw(errors.UndefinedLookupError);
	});

	it("rejects with an exception if the principal response comes back with an error.", function () {
		let expectedError = new Error("I'm the error.");
		let mockSender = new MockSenderWithResponse("", expectedError);
		let client = new Client(mockSender);
		let lookup = new Lookup("¯\\_(ツ)_/¯");

		return client.sendPrincipal(lookup).catch((e) => {
			expect(e).to.equal(expectedError);
		});
	});

	it("rejects with an exception if the financial response comes back with an error.", function () {
		let expectedError = new Error("I'm the error.");
		let mockSender = new MockSenderWithResponse("", expectedError);
		let client = new Client(mockSender);
		let lookup = new Lookup("¯\\_(ツ)_/¯");

		return client.sendFinancial(lookup).catch((e) => {
			expect(e).to.equal(expectedError);
		});
	});

	it("rejects with an exception if the geo response comes back with an error.", function () {
		let expectedError = new Error("I'm the error.");
		let mockSender = new MockSenderWithResponse("", expectedError);
		let client = new Client(mockSender);
		let lookup = new Lookup("¯\\_(ツ)_/¯");

		return client.sendGeo(lookup).catch((e) => {
			expect(e).to.equal(expectedError);
		});
	});

	it("rejects with an exception if the secondary response comes back with an error.", function () {
		let expectedError = new Error("I'm the error.");
		let mockSender = new MockSenderWithResponse("", expectedError);
		let client = new Client(mockSender);
		let lookup = new Lookup("¯\\_(ツ)_/¯");

		return client.sendSecondary(lookup).catch((e) => {
			expect(e).to.equal(expectedError);
		});
	});

	it("rejects with an exception if the secondary count response comes back with an error.", function () {
		let expectedError = new Error("I'm the error.");
		let mockSender = new MockSenderWithResponse("", expectedError);
		let client = new Client(mockSender);
		let lookup = new Lookup("¯\\_(ツ)_/¯");

		return client.sendSecondaryCount(lookup).catch((e) => {
			expect(e).to.equal(expectedError);
		});
	});

	it("returns an empty response when no principal data is returned.", () => {
		let mockSender = new MockSenderWithResponse({});
		let client = new Client(mockSender);
		let lookup = new Lookup("smartyKey");

		return client.sendPrincipal(lookup).then((_response) => {
			expect(lookup.response).to.deep.equal(new Response({}));
		});
	});

	it("returns an empty response when no financial data is returned.", () => {
		let mockSender = new MockSenderWithResponse({});
		let client = new Client(mockSender);
		let lookup = new Lookup("smartyKey");

		return client.sendFinancial(lookup).then((_response) => {
			expect(lookup.response).to.deep.equal(new Response({}));
		});
	});

	it("returns an empty response when no geo data is returned.", () => {
		let mockSender = new MockSenderWithResponse({});
		let client = new Client(mockSender);
		let lookup = new Lookup("smartyKey");

		return client.sendGeo(lookup).then((_response) => {
			expect(lookup.response).to.deep.equal(new GeoResponse({}));
		});
	});

	it("returns an empty response when no secondary data is returned.", () => {
		let mockSender = new MockSenderWithResponse({});
		let client = new Client(mockSender);
		let lookup = new Lookup("smartyKey");

		return client.sendSecondary(lookup).then((_response) => {
			expect(lookup.response).to.deep.equal(new SecondaryResponse({}));
		});
	});

	it("returns an empty response when no secondary count data is returned.", () => {
		let mockSender = new MockSenderWithResponse({});
		let client = new Client(mockSender);
		let lookup = new Lookup("smartyKey");

		return client.sendSecondaryCount(lookup).then((_response) => {
			expect(lookup.response).to.deep.equal(new SecondaryCountResponse({}));
		});
	});

	it("attaches response to a principal lookup.", function () {
		const rawMockPayload = {
			smarty_key: "a",
			data_set_name: "b",
			data_subset_name: "c",
			attributes: {
				assessed_improvement_percent: "1",
			},
		};
		let expectedResponse = new Response(rawMockPayload);

		let mockSender = new MockSenderWithResponse(rawMockPayload);
		let client = new Client(mockSender);
		let lookup = new Lookup("smartyKey");

		return client.sendPrincipal(lookup).then((_response) => {
			expect(lookup.response).to.deep.equal(expectedResponse);
		});
	});

	it("attaches response to a financial lookup.", function () {
		const rawMockPayload = {
			smarty_key: "a",
			data_set_name: "b",
			data_subset_name: "c",
			attributes: {
				assessed_improvement_percent: "1",
			},
		};
		let expectedResponse = new Response(rawMockPayload);

		let mockSender = new MockSenderWithResponse(rawMockPayload);
		let client = new Client(mockSender);
		let lookup = new Lookup("smartyKey");

		return client.sendFinancial(lookup).then((_response) => {
			expect(lookup.response).to.deep.equal(expectedResponse);
		});
	});

	it("attaches response to a geo lookup.", function () {
		const rawMockPayload = {
			smarty_key: "a",
			data_set_name: "b",
			attributes: {
				census_block: {
					accuracy: "high",
					geoid: "12345",
				},
			},
		};
		let expectedResponse = new GeoResponse(rawMockPayload);

		let mockSender = new MockSenderWithResponse(rawMockPayload);
		let client = new Client(mockSender);
		let lookup = new Lookup("smartyKey");

		return client.sendGeo(lookup).then((_response) => {
			expect(lookup.response).to.deep.equal(expectedResponse);
		});
	});

	it("attaches response to a secondary lookup.", function () {
		const rawMockPayload = {
			smarty_key: "a",
			root_address: {
				secondary_count: 3,
				smarty_key: "a",
				primary_number: "11401",
				street_name: "Main",
				street_suffix: "St",
			},
			secondaries: [
				{ smarty_key: "s1", secondary_designator: "Apt", secondary_number: "101" },
			],
		};
		let expectedResponse = new SecondaryResponse(rawMockPayload);

		let mockSender = new MockSenderWithResponse(rawMockPayload);
		let client = new Client(mockSender);
		let lookup = new Lookup("smartyKey");

		return client.sendSecondary(lookup).then((_response) => {
			expect(lookup.response).to.deep.equal(expectedResponse);
		});
	});

	it("attaches response to a secondary count lookup.", function () {
		const rawMockPayload = { smarty_key: "a", count: 12 };
		let expectedResponse = new SecondaryCountResponse(rawMockPayload);

		let mockSender = new MockSenderWithResponse(rawMockPayload);
		let client = new Client(mockSender);
		let lookup = new Lookup("smartyKey");

		return client.sendSecondaryCount(lookup).then((_response) => {
			expect(lookup.response).to.deep.equal(expectedResponse);
		});
	});

	it("sends an Etag request header when requestEtag is set on the lookup", function () {
		const mockSender = new MockSender();
		const client = new Client(mockSender);
		const lookup = new Lookup("sk");
		lookup.requestEtag = "client-etag";

		client.sendPrincipal(lookup);

		expect(mockSender.request.headers["Etag"]).to.equal("client-etag");
	});

	it("omits the Etag header when requestEtag is not set", function () {
		const mockSender = new MockSender();
		const client = new Client(mockSender);
		const lookup = new Lookup("sk");

		client.sendPrincipal(lookup);

		expect(mockSender.request.headers).to.not.have.property("Etag");
	});

	it("captures responseEtag from lowercase etag header on sendPrincipal", function () {
		const mockSender = new MockSenderWithResponse({}, null, { etag: "srv-1" });
		const client = new Client(mockSender);
		const lookup = new Lookup("sk");

		return client.sendPrincipal(lookup).then(() => {
			expect(lookup.responseEtag).to.equal("srv-1");
		});
	});

	it("captures responseEtag from mixed-case Etag header on sendFinancial", function () {
		const mockSender = new MockSenderWithResponse({}, null, { ETag: "srv-2" });
		const client = new Client(mockSender);
		const lookup = new Lookup("sk");

		return client.sendFinancial(lookup).then(() => {
			expect(lookup.responseEtag).to.equal("srv-2");
		});
	});

	it("captures responseEtag on sendGeo, sendSecondary, and sendSecondaryCount", async function () {
		const runOne = async (method: "sendGeo" | "sendSecondary" | "sendSecondaryCount") => {
			const mockSender = new MockSenderWithResponse({}, null, { Etag: "srv-" + method });
			const client = new Client(mockSender);
			const lookup = new Lookup("sk");
			await client[method](lookup);
			return lookup.responseEtag;
		};
		expect(await runOne("sendGeo")).to.equal("srv-sendGeo");
		expect(await runOne("sendSecondary")).to.equal("srv-sendSecondary");
		expect(await runOne("sendSecondaryCount")).to.equal("srv-sendSecondaryCount");
	});

	it("leaves responseEtag undefined when no Etag header is returned", function () {
		const mockSender = new MockSenderWithResponse({}, null, {});
		const client = new Client(mockSender);
		const lookup = new Lookup("sk");

		return client.sendPrincipal(lookup).then(() => {
			expect(lookup.responseEtag).to.equal(undefined);
		});
	});

	it("throws UndefinedLookupError when smartyKey is an empty string", function () {
		const client = new Client(new MockSender());
		expect(() => client.sendPrincipal(new Lookup(""))).to.throw(errors.UndefinedLookupError);
	});

	it("throws UndefinedLookupError when smartyKey is whitespace only", function () {
		const client = new Client(new MockSender());
		expect(() => client.sendPrincipal(new Lookup("   "))).to.throw(errors.UndefinedLookupError);
	});

	it("throws UndefinedLookupError on every send* method when smartyKey is whitespace", function () {
		const client = new Client(new MockSender());
		const blank = () => new Lookup("\t\n ");
		expect(() => client.sendPrincipal(blank())).to.throw(errors.UndefinedLookupError);
		expect(() => client.sendFinancial(blank())).to.throw(errors.UndefinedLookupError);
		expect(() => client.sendGeo(blank())).to.throw(errors.UndefinedLookupError);
		expect(() => client.sendSecondary(blank())).to.throw(errors.UndefinedLookupError);
		expect(() => client.sendSecondaryCount(blank())).to.throw(errors.UndefinedLookupError);
	});

	it("keeps responseEtag and requestEtag as separate fields", function () {
		const mockSender = new MockSenderWithResponse({}, null, { Etag: "srv-new" });
		const client = new Client(mockSender);
		const lookup = new Lookup("sk");
		lookup.requestEtag = "req-orig";

		return client.sendPrincipal(lookup).then(() => {
			expect(lookup.requestEtag).to.equal("req-orig");
			expect(lookup.responseEtag).to.equal("srv-new");
		});
	});

	it("sendFinancial targets /property/principal (not /property/financial) and adds features=financial.", function () {
		const mockSender = new MockSender();
		const client = new Client(mockSender);

		client.sendFinancial(new Lookup("sk-42"));

		expect(mockSender.request.baseUrlParam).to.equal("sk-42/property/principal");
		expect(mockSender.request.parameters["features"]).to.equal("financial");
	});

	it("sendFinancial merges 'financial' into existing features rather than overwriting them.", function () {
		const mockSender = new MockSender();
		const client = new Client(mockSender);
		const lookup = new Lookup("sk");
		lookup.features = "other_feature";

		client.sendFinancial(lookup);

		expect(mockSender.request.parameters["features"]).to.equal("other_feature,financial");
	});

	it("sends lookup.features as the features query param on all core send methods.", function () {
		const mockSender = new MockSender();
		const client = new Client(mockSender);
		const lookup = new Lookup("sk");
		lookup.features = "custom";

		client.sendPrincipal(lookup);

		expect(mockSender.request.parameters["features"]).to.equal("custom");
	});

	it("unwraps the first element when the API returns an array payload (real API shape).", function () {
		const rawMockPayload = {
			smarty_key: "a",
			data_set_name: "b",
			data_subset_name: "c",
			attributes: { assessed_improvement_percent: "1" },
		};
		const expectedResponse = new Response(rawMockPayload);
		const mockSender = new MockSenderWithResponse([rawMockPayload]);
		const client = new Client(mockSender);
		const lookup = new Lookup("smartyKey");

		return client.sendPrincipal(lookup).then(() => {
			expect(lookup.response).to.deep.equal(expectedResponse);
		});
	});

	it("returns an empty response when the API returns an empty array.", function () {
		const mockSender = new MockSenderWithResponse([]);
		const client = new Client(mockSender);
		const lookup = new Lookup("smartyKey");

		return client.sendPrincipal(lookup).then(() => {
			expect(lookup.response).to.deep.equal(new Response({}));
		});
	});

	it("unwraps array payloads on financial, geo, secondary, and secondary count too.", async function () {
		const geoPayload = { smarty_key: "g", data_set_name: "geo", attributes: {} };
		const objectPayload = {
			smarty_key: "k",
			data_set_name: "d",
			data_subset_name: "s",
			attributes: {},
		};

		const financial = new MockSenderWithResponse([objectPayload]);
		const finLookup = new Lookup("k");
		await new Client(financial).sendFinancial(finLookup);
		expect(finLookup.response).to.deep.equal(new Response(objectPayload));

		const geo = new MockSenderWithResponse([geoPayload]);
		const geoLookup = new Lookup("g");
		await new Client(geo).sendGeo(geoLookup);
		expect(geoLookup.response).to.deep.equal(new GeoResponse(geoPayload));

		const secondaryPayload = {
			smarty_key: "k",
			root_address: { secondary_count: 2, smarty_key: "k" },
			secondaries: [{ smarty_key: "s1", secondary_number: "101" }],
		};
		const secondary = new MockSenderWithResponse([secondaryPayload]);
		const secLookup = new Lookup("k");
		await new Client(secondary).sendSecondary(secLookup);
		expect(secLookup.response).to.deep.equal(new SecondaryResponse(secondaryPayload));

		const countPayload = { smarty_key: "k", count: 2 };
		const count = new MockSenderWithResponse([countPayload]);
		const countLookup = new Lookup("k");
		await new Client(count).sendSecondaryCount(countLookup);
		expect(countLookup.response).to.deep.equal(new SecondaryCountResponse(countPayload));
	});
});
