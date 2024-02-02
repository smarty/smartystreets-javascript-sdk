const chai = require("chai");
const expect = chai.expect;
const SmartySDK = require("../index");

describe("Extract example test", () => {
    const authId = "";
    const authToken = "";
    const SmartyCore = SmartySDK.core;
    const credentials = new SmartyCore.StaticCredentials(authId, authToken);
    const clientBuilder = new SmartyCore.ClientBuilder(credentials);
    clientBuilder.withBaseUrl("https://us-extract.api.hobbes.smartyops.net");

    const usExtractClient = clientBuilder.buildUsExtractClient();

    it("Check multi-line test", async () => {
        if (!(authId && authToken)) {
            expect("bypass").to.equal("bypass");
        } else {
            const lookup = new SmartySDK.usExtract.Lookup(`
        1476 Sandhill Rd, Orem, UT asdlfkjasldfkja sldfj 350 E University Pkwy, Orem, UT 84058 asldfkjasldfj asldkfjasldfj
        417 W 1300 S, Orem, UT asdlfkjasldfkjal skdjf alskdjf 309 E University Pkwy, Orem, UT 84058
        `);

            lookup.addressesHaveLineBreaks = true;
            lookup.addressesPerLine = 1;

            const result = await usExtractClient.send(lookup);

            expect(result.result.meta.addressCount).to.equal(2);
            expect(result.result.meta.verifiedCount).to.equal(2);

        }
    });

    it("Check HTML test", async () => {
        if (!(authId && authToken)) {
            expect("bypass").to.equal("bypass");
        } else {
            const lookup = new SmartySDK.usExtract.Lookup(`
HTML is automatically detected and, if found, ignored. You can override this behavior with API calls by manually setting the 'html' parameter to true or false.

For input with <b>HTML code</code> like this, addresses will be scraped from outside the tags. The HTML should be properly formatted, valid HTML.<br><br>

7584<span class='street-name'>Big Canyon</span> Anaheim Hills, CA <span class='zip-code'>92808</span><br><br>

You can force HTML mode if auto-detect doesn't work properly.
            `);

            const result = await usExtractClient.send(lookup);

            expect(result.result.meta.addressCount).to.equal(1);
        }
    });

    it("Check addresses with line breaks", async () => {
        if (!(authId && authToken)) {
            expect("bypass").to.equal("bypass");
        } else {
            const lookup = new SmartySDK.usExtract.Lookup(`
This address is valid:

1109 Ninth 85007

but this one is not:

3777 Las Vegas Blvd
Las Vegas, Nevada

However, this nearby location is valid, despite the poor spelling:

3785 Las Vegs Av.
Los Vegas, Nevada
            `);

            lookup.addressesHaveLineBreaks = true;

            const result = await usExtractClient.send(lookup);

            expect(result.result.meta.addressCount).to.equal(3);
            expect(result.result.meta.verifiedCount).to.equal(2);
        }
    });

    it("Check addresses needing aggressive mode", async () => {
        if (!(authId && authToken)) {
            expect("bypass").to.equal("bypass");
        } else {
            const lookup = new SmartySDK.usExtract.Lookup(`
With aggressive mode on, popular US cities may be matched if no state or ZIP code can be found.

This means addresses like 5455 North 250 West, Provo, can be found even though it doesn't have anything looking like a state or ZIP code following it.
            `);

            lookup.aggressive = true;

            const result = await usExtractClient.send(lookup);

            expect(result.result.meta.addressCount).to.equal(1);
            expect(result.result.meta.verifiedCount).to.equal(1);
        }
    });

    it("Check addresses in URLs", async () => {
        if (!(authId && authToken)) {
            expect("bypass").to.equal("bypass");
        } else {
            const lookup = new SmartySDK.usExtract.Lookup(`
Smarty can handle addresses in URLs, as long as there are no spaces in them or they are surrounded by quotes.

Address in one parameter: https://maps.google.com/?q=1+Rosedale+St+Baltimore+MD&ie=UTF8
or,
same URL with spaces surrounded by quotes: "https://maps.google.com/?q=1 Rosedale St Baltimore MD&ie=UTF8"
...

Address across multiple parameters: https://example.com/?street=4004%20Grant%20St%20&state=WA&zipcode=98660&city=Vancouver
We can find them either way.
            `);

            const result = await usExtractClient.send(lookup);

            expect(result.result.meta.addressCount).to.equal(3);
            expect(result.result.meta.verifiedCount).to.equal(3);
        }
    });

    it("Check address with unicode character", async () => {
        if (!(authId && authToken)) {
            expect("bypass").to.equal("bypass");
        } else {
            const lookup = new SmartySDK.usExtract.Lookup(`
This address has a Unicode character in it (the special í in María): 123 María Lane Tempe, AZ, 85284

Addresses with Unicode can still be found and verified.
            `);

            const result = await usExtractClient.send(lookup);

            expect(result.result.meta.addressCount).to.equal(1);
            expect(result.result.meta.verifiedCount).to.equal(1);
        }
    });

    it("Check more addresses needing aggressive mode", async () => {
        if (!(authId && authToken)) {
            expect("bypass").to.equal("bypass");
        } else {
            const lookup = new SmartySDK.usExtract.Lookup(`
Try this one with and without aggressive mode. The '10379' looks like a ZIP code but is actually a primary number:

8465 Park Meadows Center Drive
Lone Tree, CO
303-799-3400

10379 South State Street
Sandy, UT 84070
801-432-5100

This input has two addresses and only one is found without aggressive mode.
            `);

            const result = await usExtractClient.send(lookup);

            expect(result.result.meta.addressCount).to.equal(1);
            expect(result.result.meta.verifiedCount).to.equal(1);
        }
    });
});