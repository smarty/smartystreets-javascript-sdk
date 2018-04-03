const chai = require("chai");
const expect = chai.expect;
const Result = require("../../src/us_zipcode/Result");

describe("A US Zipcode result", function () {
	it("populates accurately on a valid lookup.", function () {
		let sampleResponse = {
			"input_index": 0,
			"city_states": [
				{
					"city": "1",
					"state_abbreviation": "2",
					"state": "3",
					"mailable_city": "4"
				}
			],
			"zipcodes": [
				{
					"zipcode": "5",
					"zipcode_type": "6",
					"default_city": "7",
					"county_fips": "8",
					"county_name": "9",
					"latitude": 10,
					"longitude": 11,
					"precision": "12",
					"alternate_counties": [
						{
							"county_fips": "13",
							"county_name": "14",
							"state_abbreviation": "15",
							"state": "16"
						}
					],
					"state_abbreviation": "17",
					"state": "18"
				}
			]
		};
		let result = new Result(sampleResponse);

		expect(result.inputIndex).to.equal(0);
		expect(result.status).to.equal(undefined);
		expect(result.reason).to.equal(undefined);

		expect(result.cities[0].city).to.equal('1');
		expect(result.cities[0].stateAbbreviation).to.equal('2');
		expect(result.cities[0].state).to.equal('3');
		expect(result.cities[0].mailableCity).to.equal('4');

		expect(result.zipcodes[0].zipcode).to.equal('5');
		expect(result.zipcodes[0].zipcodeType).to.equal('6');
		expect(result.zipcodes[0].defaultCity).to.equal('7');
		expect(result.zipcodes[0].countyFips).to.equal('8');
		expect(result.zipcodes[0].countyName).to.equal('9');
		expect(result.zipcodes[0].latitude).to.equal(10);
		expect(result.zipcodes[0].longitude).to.equal(11);
		expect(result.zipcodes[0].precision).to.equal('12');
		expect(result.zipcodes[0].alternateCounties[0].countyFips).to.equal('13');
		expect(result.zipcodes[0].alternateCounties[0].countyName).to.equal('14');
		expect(result.zipcodes[0].alternateCounties[0].stateAbbreviation).to.equal('15');
		expect(result.zipcodes[0].alternateCounties[0].state).to.equal('16');
		expect(result.zipcodes[0].stateAbbreviation).to.equal('17');
		expect(result.zipcodes[0].state).to.equal('18');

		expect(result.valid).to.equal(true);
	});

	it("populates accurately on an invalid lookup", function () {
		let sampleResponse = {
			"status": "testing_status",
			"reason": "We are testing."
		};

		let result = new Result(sampleResponse);

		expect(result.status).to.equal("testing_status");
		expect(result.reason).to.equal("We are testing.");

	});
});