import {mockSenders} from "../fixtures/mock_senders.js";
import {Lookup} from "../../src/us_enrichment/Lookup.js";
import {UndefinedLookupError} from "../../src/Errors.js";
import {FinancialResponse, GeoResponse} from "../../src/us_enrichment/Response.js";
import { Response} from "../../src/Response.js";
import { Client} from "../../src/us_enrichment/Client.js";
import { expect } from "chai";


describe("A US Enrichment Client", function () {
    it("composes principal url path properly", function () {
        let mockSender = new mockSenders.MockSender();
        let client = new Client(mockSender);
        let smartyKey = "0";
        let lookup = new Lookup(smartyKey);

        client.sendPrincipal(lookup);

        expect(mockSender.request.baseUrlParam).to.deep.equal("0/property/principal");
    })

    it("composes financial url path properly", function () {
        let mockSender = new mockSenders.MockSender();
        let client = new Client(mockSender);
        let smartyKey = "0";
        let lookup = new Lookup(smartyKey);

        client.sendFinancial(lookup);

        expect(mockSender.request.baseUrlParam).to.deep.equal("0/property/financial");
    })

    it("composes geo url path properly", function () {
        let mockSender = new mockSenders.MockSender();
        let client = new Client(mockSender);
        let smartyKey = "0";
        let lookup = new Lookup(smartyKey);

        client.sendGeo(lookup);

        expect(mockSender.request.baseUrlParam).to.deep.equal("0/geo-reference");
    })

    it("composes secondary url path properly", function () {
        let mockSender = new mockSenders.MockSender();
        let client = new Client(mockSender);
        let smartyKey = "0";
        let lookup = new Lookup(smartyKey);

        client.sendSecondary(lookup);

        expect(mockSender.request.baseUrlParam).to.deep.equal("0/secondary");
    })

    it("composes secondary count url path properly", function () {
        let mockSender = new mockSenders.MockSender();
        let client = new Client(mockSender);
        let smartyKey = "0";
        let lookup = new Lookup(smartyKey);

        client.sendSecondaryCount(lookup);

        expect(mockSender.request.baseUrlParam).to.deep.equal("0/secondary/count");
    })

    it("correctly builds parameters for a smartyKey only principal lookup.", function () {
        let mockSender = new mockSenders.MockSender();
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
        let mockSender = new mockSenders.MockSender();
        let client = new Client(mockSender);
        let smartyKey = '(>")>#';
        let include = "1";
        let lookup = new Lookup(smartyKey, include);
        let expectedParameters = {
            include: include,
        };

        client.sendFinancial(lookup);

        expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
    });

    it("correctly builds parameters for a smartyKey only geo lookup.", function () {
        let mockSender = new mockSenders.MockSender();
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
        let mockSender = new mockSenders.MockSender();
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
        let mockSender = new mockSenders.MockSender();
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
        let mockSender = new mockSenders.MockSender();
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
        let mockSender = new mockSenders.MockSender();
        let client = new Client(mockSender);
        let lookup = new Lookup("0", "1", "2", "3", "4");

        let expectedParameters = {
            include: "1",
            exclude: "2",
            dataset: "3",
            data_subset: "4",
        };

        client.sendFinancial(lookup);
        expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
    });

    it("correctly builds parameters for a fully-populated geo lookup.", function () {
        let mockSender = new mockSenders.MockSender();
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
        let mockSender = new mockSenders.MockSender();
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
        let mockSender = new mockSenders.MockSender();
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
        let mockSender = new mockSenders.MockSender();
        let client = new Client(mockSender);
        expect(client.sendPrincipal).to.throw(UndefinedLookupError);
    });

    it("throws an error if sending without a financial lookup.", function () {
        let mockSender = new mockSenders.MockSender();
        let client = new Client(mockSender);
        expect(client.sendFinancial).to.throw(UndefinedLookupError);
    });

    it("throws an error if sending without a geo lookup.", function () {
        let mockSender = new mockSenders.MockSender();
        let client = new Client(mockSender);
        expect(client.sendGeo).to.throw(UndefinedLookupError);
    });

    it("throws an error if sending without a secondary lookup.", function () {
        let mockSender = new mockSenders.MockSender();
        let client = new Client(mockSender);
        expect(client.sendSecondary).to.throw(UndefinedLookupError);
    });

    it("throws an error if sending without a secondary count lookup.", function () {
        let mockSender = new mockSenders.MockSender();
        let client = new Client(mockSender);
        expect(client.sendSecondaryCount).to.throw(UndefinedLookupError);
    });

    it("rejects with an exception if the principal response comes back with an error.", function () {
        let expectedError = new Error("I'm the error.");
        let mockSender = new mockSenders.MockSenderWithResponse("", expectedError);
        let client = new Client(mockSender);
        let lookup = new Lookup("¯\\_(ツ)_/¯");

        return client.sendPrincipal(lookup).catch((e) => {
            expect(e).to.equal(expectedError);
        });
    });

    it("rejects with an exception if the financial response comes back with an error.", function () {
        let expectedError = new Error("I'm the error.");
        let mockSender = new mockSenders.MockSenderWithResponse("", expectedError);
        let client = new Client(mockSender);
        let lookup = new Lookup("¯\\_(ツ)_/¯");

        return client.sendFinancial(lookup).catch((e) => {
            expect(e).to.equal(expectedError);
        });
    });

    it("rejects with an exception if the geo response comes back with an error.", function () {
        let expectedError = new Error("I'm the error.");
        let mockSender = new mockSenders.MockSenderWithResponse("", expectedError);
        let client = new Client(mockSender);
        let lookup = new Lookup("¯\\_(ツ)_/¯");

        return client.sendGeo(lookup).catch((e) => {
            expect(e).to.equal(expectedError);
        });
    });

    it("rejects with an exception if the secondary response comes back with an error.", function () {
        let expectedError = new Error("I'm the error.");
        let mockSender = new mockSenders.MockSenderWithResponse("", expectedError);
        let client = new Client(mockSender);
        let lookup = new Lookup("¯\\_(ツ)_/¯");

        return client.sendSecondary(lookup).catch((e) => {
            expect(e).to.equal(expectedError);
        });
    });

    it("rejects with an exception if the secondary count response comes back with an error.", function () {
        let expectedError = new Error("I'm the error.");
        let mockSender = new mockSenders.MockSenderWithResponse("", expectedError);
        let client = new Client(mockSender);
        let lookup = new Lookup("¯\\_(ツ)_/¯");

        return client.sendSecondaryCount(lookup).catch((e) => {
            expect(e).to.equal(expectedError);
        });
    });

    it("returns an empty array when no principal respo are returned.", () => {
        let mockSender = new mockSenders.MockSenderWithResponse({});
        let client = new Client(mockSender);
        let lookup = new Lookup("smartyKey");

        return client.sendPrincipal(lookup).then(response => {
            expect(lookup.response).to.deep.equal({});
        });
    });

    it("returns an empty array when no financial suggestions are returned.", () => {
        let mockSender = new mockSenders.MockSenderWithResponse({});
        let client = new Client(mockSender);
        let lookup = new Lookup("smartyKey");

        return client.sendFinancial(lookup).then(response => {
            expect(lookup.response).to.deep.equal({});
        });
    });

    it("returns an empty array when no geo suggestions are returned.", () => {
        let mockSender = new mockSenders.MockSenderWithResponse({});
        let client = new Client(mockSender);
        let lookup = new Lookup("smartyKey");

        return client.sendGeo(lookup).then(response => {
            expect(lookup.response).to.deep.equal({});
        });
    });

    it("returns an empty array when no secondary suggestions are returned.", () => {
        let mockSender = new mockSenders.MockSenderWithResponse({});
        let client = new Client(mockSender);
        let lookup = new Lookup("smartyKey");

        return client.sendSecondary(lookup).then(response => {
            expect(lookup.response).to.deep.equal({});
        });
    });

    it("returns an empty array when no secondary count suggestions are returned.", () => {
        let mockSender = new mockSenders.MockSenderWithResponse({});
        let client = new Client(mockSender);
        let lookup = new Lookup("smartyKey");

        return client.sendSecondaryCount(lookup).then(response => {
            expect(lookup.response).to.deep.equal({});
        });
    });

    it("attaches response to a principal lookup.", function () {
        const rawMockResponse = {
            smarty_key: "a",
            data_set_name: "b",
            data_subset_name: "c",
            attributes: {
                assessed_improvement_percent: "1"
            },
        };
        let mockResponse = new Response(rawMockResponse);

        let mockSender = new mockSenders.MockSenderWithResponse(mockResponse);
        let client = new Client(mockSender);
        let lookup = new Lookup("smartyKey");

        return client.sendPrincipal(lookup).then(response => {
            expect(lookup.response).to.deep.equal(mockResponse);
        });
    })

    it("attaches response to a financial lookup.", function () {
        const rawMockResponse = {
            smarty_key: "a",
            data_set_name: "b",
            data_subset_name: "c",
            attributes: {
                assessed_improvement_percent: "1"
            },
        };
        let mockResponse = new FinancialResponse(rawMockResponse);

        let mockSender = new mockSenders.MockSenderWithResponse(mockResponse);
        let client = new Client(mockSender);
        let lookup = new Lookup("smartyKey");

        return client.sendFinancial(lookup).then(response => {
            expect(lookup.response).to.deep.equal(mockResponse);
        });
    })

    it("attaches response to a geo lookup.", function () {
        const rawMockResponse = {
            smarty_key: "a",
            data_set_name: "b",
            data_subset_name: "c",
            attributes: {
                assessed_improvement_percent: "1"
            },
        };
        let mockResponse = new GeoResponse(rawMockResponse);

        let mockSender = new mockSenders.MockSenderWithResponse(mockResponse);
        let client = new Client(mockSender);
        let lookup = new Lookup("smartyKey");

        return client.sendGeo(lookup).then(response => {
            expect(lookup.response).to.deep.equal(mockResponse);
        });
    })

    it("attaches response to a secondary lookup.", function () {
        const rawMockResponse = {
            smarty_key: "a",
            data_set_name: "b",
            data_subset_name: "c",
            attributes: {
                assessed_improvement_percent: "1"
            },
        };
        let mockResponse = new Response(rawMockResponse);

        let mockSender = new mockSenders.MockSenderWithResponse(mockResponse);
        let client = new Client(mockSender);
        let lookup = new Lookup("smartyKey");

        return client.sendSecondary(lookup).then(response => {
            expect(lookup.response).to.deep.equal(mockResponse);
        });
    })

    it("attaches response to a secondary count lookup.", function () {
        const rawMockResponse = {
            smarty_key: "a",
            data_set_name: "b",
            data_subset_name: "c",
            attributes: {
                assessed_improvement_percent: "1"
            },
        };
        let mockResponse = new Response(rawMockResponse);

        let mockSender = new mockSenders.MockSenderWithResponse(mockResponse);
        let client = new Client(mockSender);
        let lookup = new Lookup("smartyKey");

        return client.sendSecondaryCount(lookup).then(response => {
            expect(lookup.response).to.deep.equal(mockResponse);
        });
    })
});
