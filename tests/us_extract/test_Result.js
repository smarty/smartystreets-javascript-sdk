const chai = require("chai");
const expect = chai.expect;
const Result = require("../../src/us_extract/Result");
const Address = require("../../src/us_extract/Address");

describe("A US Extract Result", function () {
	it("correctly populates fields.", function () {
		const mockResponseData = {
			"meta": {
				"lines": 6,
				"unicode": false,
				"address_count": 1,
				"verified_count": 1,
				"bytes": 53,
				"character_count": 53,
			},
			"addresses": [
				{
					"text": "5732 Lincoln Drive Minneapolis MN",
					"verified": true,
					"line": 4,
					"start": 16,
					"end": 49,
					"api_output": [{}]
				}
			]
		};
		let result = new Result(mockResponseData);

		expect(result.meta.lines).to.equal(6);
		expect(result.meta.unicode).to.equal(false);
		expect(result.meta.addressCount).to.equal(1);
		expect(result.meta.verifiedCount).to.equal(1);
		expect(result.meta.bytes).to.equal(53);
		expect(result.meta.characterCount).to.equal(53);

		expect(result.addresses[0]).to.be.an.instanceOf(Address);
	});
});
