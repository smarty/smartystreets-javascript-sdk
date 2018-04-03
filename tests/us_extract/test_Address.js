const chai = require("chai");
const expect = chai.expect;
const Address = require("../../src/us_extract/Address");
const Candidate = require("../../src/us_street/Candidate");

describe("A US Extract Address", function () {
	it("populates fields correctly.", function () {
		let mockResponseAddress = {
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
					},
				},
			],
		};
		let address = new Address(mockResponseAddress);
		expect(address.candidates[0]).to.be.an.instanceOf(Candidate);
		expect(address.text).to.equal(mockResponseAddress.text);
		expect(address.verified).to.equal(mockResponseAddress.verified);
		expect(address.line).to.equal(mockResponseAddress.line);
		expect(address.start).to.equal(mockResponseAddress.start);
		expect(address.end).to.equal(mockResponseAddress.end);
	});
});
