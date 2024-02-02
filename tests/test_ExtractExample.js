const chai = require("chai");
const expect = chai.expect;
const SmartySDK = require("../index");

describe("Extract example test", () => {
    it("Check multi-line test", async () => {
        const SmartyCore = SmartySDK.core;

        const authId = "";
        const authToken = "";

        if (authId && authToken) {
            const credentials = new SmartyCore.StaticCredentials(authId, authToken);
            const clientBuilder = new SmartyCore.ClientBuilder(credentials);
            clientBuilder.withBaseUrl("https://us-extract.api.hobbes.smartyops.net");

            const usExtractClient = clientBuilder.buildUsExtractClient();

            const lookup = new SmartySDK.usExtract.Lookup("1476 Sandhill Rd, Orem, UT\n417 W 1300 S, Orem, UT");

            lookup.addressesHaveLineBreaks = true;
            lookup.addressesPerLine = 1;

            const result = await usExtractClient.send(lookup);

            expect(result.result.meta.lines).to.equal(2);
        } else {
            expect("bypass").to.equal("bypass");
        }
    });
});