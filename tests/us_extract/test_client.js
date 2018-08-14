const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const Client = require("../../src/us_extract/Client");
const Lookup = require("../../src/us_extract/Lookup");
const Result = require("../../src/us_extract/Result");
const MockSender = require("../fixtures/mock_senders").MockSender;
const MockSenderWithResponse = require("../fixtures/mock_senders").MockSenderWithResponse;
const errors = require("../../src/Errors");

describe("A US Extract Client", function () {
	it("throws an error if sending without a lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);

		expect(client.send).to.throw(errors.UndefinedLookupError);
	});

	it("correctly builds a payload for a text only lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		let mockText = "yump.";
		let lookup = new Lookup(mockText);
		let expectedPayload = mockText;

		client.send(lookup);

		expect(mockSender.request.payload).to.deep.equal(expectedPayload);
	});

	it("correctly builds a payload for a fully-populated lookup.", function () {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		const mockText = "The flocculated scunge is subprime for human consumption.";
		let lookup = new Lookup(mockText);
		let expectedPayload = mockText;

		client.send(lookup);

		expect(mockSender.request.payload).to.deep.equal(expectedPayload);
	});

	it("correctly builds parameters for a lookup.", () => {
		let mockSender = new MockSender();
		let client = new Client(mockSender);
		const mockText = "Picard is coming back. All power to the engines.";
		let lookup = new Lookup(mockText);
		lookup.html = 1;
		lookup.aggressive = 2;
		lookup.addressesHaveLineBreaks = 3;
		lookup.addressesPerLine = 4;

		let expectedParams = {
			html: 1,
			aggressive: 2,
			addr_line_breaks: 3,
			addr_per_line: 4,
		};

		client.send(lookup);

		expect(mockSender.request.parameters).to.deep.equal(expectedParams);
	});

	it("rejects with an exception if the response comes back with an error.", function () {
		let expectedError = new Error("I'm the error.");
		let mockSender = new MockSenderWithResponse("", expectedError);
		let client = new Client(mockSender);
		let lookup = new Lookup("Shine on you crazy diamond.");

		return expect(client.send(lookup)).to.eventually.be.rejectedWith(expectedError);
	});

	it("attaches result from a response to a lookup.", function () {
		const responseData = {
			"meta": {
				"lines": 6,
				"unicode": false,
				"address_count": 1,
				"verified_count": 1,
				"bytes": 53,
				"character_count": 53
			},
			"addresses": [
				{
					"text": "5732 Lincoln Drive Minneapolis MN",
					"verified": true,
					"line": 4,
					"start": 16,
					"end": 49,
					"api_output": [
						{
							"candidate_index": 0,
							"delivery_line_1": "5732 Lincoln Dr",
							"last_line": "Minneapolis MN 55436-1608",
							"delivery_point_barcode": "554361608327",
							"components": {
								"primary_number": "5732",
								"street_name": "Lincoln",
								"street_suffix": "Dr",
								"city_name": "Minneapolis",
								"state_abbreviation": "MN",
								"zipcode": "55436",
								"plus4_code": "1608",
								"delivery_point": "32",
								"delivery_point_check_digit": "7"
							},
							"metadata": {
								"record_type": "S",
								"zip_type": "Standard",
								"county_fips": "27053",
								"county_name": "Hennepin",
								"carrier_route": "C009",
								"congressional_district": "03",
								"rdi": "Commercial",
								"elot_sequence": "0035",
								"elot_sort": "A",
								"latitude": 44.90127,
								"longitude": -93.40045,
								"precision": "Zip9",
								"time_zone": "Central",
								"utc_offset": -6,
								"dst": true
							},
							"analysis": {
								"dpv_match_code": "Y",
								"dpv_footnotes": "AABB",
								"dpv_cmra": "N",
								"dpv_vacant": "N",
								"active": "Y",
								"footnotes": "N#"
							}
						}
					]
				}
			]
		};

		let mockSender = new MockSenderWithResponse(responseData);
		let client = new Client(mockSender);
		let lookup = new Lookup("Sometimes when you're testing this field doesn't matter too much.");
		let expectedResult = new Result(responseData);

		return client.send(lookup).then(response => {
			expect(lookup.result).to.deep.equal(expectedResult);
		});
	})
});