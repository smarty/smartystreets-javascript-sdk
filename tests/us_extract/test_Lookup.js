import { Lookup } from "../../src/us_extract/Lookup.js";
import { expect } from "chai";

describe("A US Extract Lookup", function () {
  it("correctly populates fields.", function () {
    let lookup = new Lookup("some text");
    lookup.html = true;
    lookup.aggressive = true;
    lookup.addressesHaveLineBreaks = true;
    lookup.addressesPerLine = 10;

    expect(lookup.text).to.equal("some text");
    expect(lookup.html).to.equal(true);
    expect(lookup.aggressive).to.equal(true);
    expect(lookup.addressesHaveLineBreaks).to.equal(true);
    expect(lookup.addressesPerLine).to.equal(10);
  });
});
