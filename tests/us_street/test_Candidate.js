const chai = require("chai");
const expect = chai.expect;
const Candidate = require("../../src/us_street/Candidate");

describe("A match candidate", function () {
	it("has populated fields.", function () {
		const sampleResponse = {
			input_index: 0,
			candidate_index: 1,
			addressee: "2",
			delivery_line_1: "3",
			delivery_line_2: "4",
			last_line: "5",
			delivery_point_barcode: "6",
			components: {
				urbanization: "7",
				primary_number: "8",
				street_name: "9",
				street_predirection: "10",
				street_postdirection: "11",
				street_suffix: "12",
				secondary_number: "13",
				secondary_designator: "14",
				extra_secondary_number: "15",
				extra_secondary_designator: "16",
				pmb_designator: "17",
				pmb_number: "18",
				city_name: "19",
				default_city_name: "20",
				state_abbreviation: "21",
				zipcode: "22",
				plus4_code: "23",
				delivery_point: "24",
				delivery_point_check_digit: "25"
			},
			metadata: {
				record_type: "26",
				zip_type: "27",
				county_fips: "28",
				county_name: "29",
				carrier_route: "30",
				congressional_district: "31",
				building_default_indicator: "32",
				rdi: "33",
				elot_sequence: "34",
				elot_sort: "35",
				latitude: 36.0,
				longitude: 37.0,
				precision: "38",
				time_zone: "39",
				utc_offset: 40.0,
				dst: "41",
				ews_match: "47"
			},
			analysis: {
				dpv_match_code: "42",
				dpv_footnotes: "43",
				dpv_cmra: "44",
				dpv_vacant: "45",
				active: "46",
				footnotes: "48",
				lacslink_code: "49",
				lacslink_indicator: "50",
				suitelink_match: "51"
			}
		};
		const candidate = new Candidate(sampleResponse);

		expect(candidate.inputIndex).to.equal(0);
		expect(candidate.candidateIndex).to.equal(1);
		expect(candidate.addressee).to.equal('2');
		expect(candidate.deliveryLine1).to.equal('3');
		expect(candidate.deliveryLine2).to.equal('4');
		expect(candidate.lastLine).to.equal('5');
		expect(candidate.deliveryPointBarcode).to.equal('6');

		expect(candidate.components.urbanization).to.equal('7');
		expect(candidate.components.primaryNumber).to.equal('8');
		expect(candidate.components.streetName).to.equal('9');
		expect(candidate.components.streetPredirection).to.equal('10');
		expect(candidate.components.streetPostdirection).to.equal('11');
		expect(candidate.components.streetSuffix).to.equal('12');
		expect(candidate.components.secondaryNumber).to.equal('13');
		expect(candidate.components.secondaryDesignator).to.equal('14');
		expect(candidate.components.extraSecondaryNumber).to.equal('15');
		expect(candidate.components.extraSecondaryDesignator).to.equal('16');
		expect(candidate.components.pmbDesignator).to.equal('17');
		expect(candidate.components.pmbNumber).to.equal('18');
		expect(candidate.components.cityName).to.equal('19');
		expect(candidate.components.defaultCityName).to.equal('20');
		expect(candidate.components.state).to.equal('21');
		expect(candidate.components.zipCode).to.equal('22');
		expect(candidate.components.plus4Code).to.equal('23');
		expect(candidate.components.deliveryPoint).to.equal('24');
		expect(candidate.components.deliveryPointCheckDigit).to.equal('25');

		expect(candidate.metadata.recordType).to.equal('26');
		expect(candidate.metadata.zipType).to.equal('27');
		expect(candidate.metadata.countyFips).to.equal('28');
		expect(candidate.metadata.countyName).to.equal('29');
		expect(candidate.metadata.carrierRoute).to.equal('30');
		expect(candidate.metadata.congressionalDistrict).to.equal('31');
		expect(candidate.metadata.buildingDefaultIndicator).to.equal('32');
		expect(candidate.metadata.rdi).to.equal('33');
		expect(candidate.metadata.elotSequence).to.equal('34');
		expect(candidate.metadata.elotSort).to.equal('35');
		expect(candidate.metadata.latitude).to.equal(36.0);
		expect(candidate.metadata.longitude).to.equal(37.0);
		expect(candidate.metadata.precision).to.equal('38');
		expect(candidate.metadata.timeZone).to.equal('39');
		expect(candidate.metadata.utcOffset).to.equal(40.0);
		expect(candidate.metadata.obeysDst).to.equal('41');
		expect(candidate.metadata.isEwsMatch).to.equal('47');

		expect(candidate.analysis.dpvMatchCode).to.equal('42');
		expect(candidate.analysis.dpvFootnotes).to.equal('43');
		expect(candidate.analysis.cmra).to.equal('44');
		expect(candidate.analysis.vacant).to.equal('45');
		expect(candidate.analysis.active).to.equal('46');
		expect(candidate.analysis.footnotes).to.equal('48');
		expect(candidate.analysis.lacsLinkCode).to.equal('49');
		expect(candidate.analysis.lacsLinkIndicator).to.equal('50');
		expect(candidate.analysis.isSuiteLinkMatch).to.equal('51');
	});
});