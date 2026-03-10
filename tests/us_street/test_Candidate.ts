import { expect } from "chai";
import Candidate from "../../src/us_street/Candidate.js";

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
			smarty_key: "0000",
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
				delivery_point_check_digit: "25",
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
				coordinate_license: 1,
				precision: "38",
				time_zone: "39",
				utc_offset: 40.0,
				dst: true,
				iana_time_zone: "68",
				iana_utc_offset: 69.0,
				iana_dst: "70",
				ews_match: true,
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
				suitelink_match: true,
				dpv_no_stat: "52",
				enhanced_match: "53",
				components: {
					primary_number: { status: "54", change: ["a"] },
					street_predirection: { status: "55", change: ["b"] },
					street_name: { status: "56", change: ["c"] },
					street_postdirection: { status: "57", change: ["d"] },
					street_suffix: { status: "58", change: ["e"] },
					secondary_number: { status: "59", change: ["f"] },
					secondary_designator: { status: "60", change: ["g"] },
					extra_secondary_number: { status: "61", change: ["h"] },
					extra_secondary_designator: { status: "62", change: ["i"] },
					city_name: { status: "63", change: ["j"] },
					state_abbreviation: { status: "64", change: ["k"] },
					zipcode: { status: "65", change: ["l"] },
					plus4_code: { status: "66", change: ["m"] },
					urbanization: { status: "67", change: ["n"] },
				},
			},
		};
		const candidate = new Candidate(sampleResponse);

		expect(candidate.inputIndex).to.equal(0);
		expect(candidate.candidateIndex).to.equal(1);
		expect(candidate.addressee).to.equal("2");
		expect(candidate.deliveryLine1).to.equal("3");
		expect(candidate.deliveryLine2).to.equal("4");
		expect(candidate.lastLine).to.equal("5");
		expect(candidate.deliveryPointBarcode).to.equal("6");
		expect(candidate.smartyKey).to.equal("0000");

		expect(candidate.components.urbanization).to.equal("7");
		expect(candidate.components.primaryNumber).to.equal("8");
		expect(candidate.components.streetName).to.equal("9");
		expect(candidate.components.streetPredirection).to.equal("10");
		expect(candidate.components.streetPostdirection).to.equal("11");
		expect(candidate.components.streetSuffix).to.equal("12");
		expect(candidate.components.secondaryNumber).to.equal("13");
		expect(candidate.components.secondaryDesignator).to.equal("14");
		expect(candidate.components.extraSecondaryNumber).to.equal("15");
		expect(candidate.components.extraSecondaryDesignator).to.equal("16");
		expect(candidate.components.pmbDesignator).to.equal("17");
		expect(candidate.components.pmbNumber).to.equal("18");
		expect(candidate.components.cityName).to.equal("19");
		expect(candidate.components.defaultCityName).to.equal("20");
		expect(candidate.components.state).to.equal("21");
		expect(candidate.components.zipCode).to.equal("22");
		expect(candidate.components.plus4Code).to.equal("23");
		expect(candidate.components.deliveryPoint).to.equal("24");
		expect(candidate.components.deliveryPointCheckDigit).to.equal("25");

		expect(candidate.metadata.recordType).to.equal("26");
		expect(candidate.metadata.zipType).to.equal("27");
		expect(candidate.metadata.countyFips).to.equal("28");
		expect(candidate.metadata.countyName).to.equal("29");
		expect(candidate.metadata.carrierRoute).to.equal("30");
		expect(candidate.metadata.congressionalDistrict).to.equal("31");
		expect(candidate.metadata.buildingDefaultIndicator).to.equal("32");
		expect(candidate.metadata.rdi).to.equal("33");
		expect(candidate.metadata.elotSequence).to.equal("34");
		expect(candidate.metadata.elotSort).to.equal("35");
		expect(candidate.metadata.latitude).to.equal(36.0);
		expect(candidate.metadata.longitude).to.equal(37.0);
		expect(candidate.metadata.coordinateLicense).to.equal("SmartyStreets Proprietary");
		expect(candidate.metadata.precision).to.equal("38");
		expect(candidate.metadata.timeZone).to.equal("39");
		expect(candidate.metadata.utcOffset).to.equal(40.0);
		expect(candidate.metadata.obeysDst).to.equal(true);
		expect(candidate.metadata.ianaTimeZone).to.equal("68");
		expect(candidate.metadata.ianaUtcOffset).to.equal(69.0);
		expect(candidate.metadata.ianaDst).to.equal("70");
		expect(candidate.metadata.isEwsMatch).to.equal(true);

		expect(candidate.analysis.dpvMatchCode).to.equal("42");
		expect(candidate.analysis.dpvFootnotes).to.equal("43");
		expect(candidate.analysis.cmra).to.equal("44");
		expect(candidate.analysis.vacant).to.equal("45");
		expect(candidate.analysis.active).to.equal("46");
		expect(candidate.analysis.footnotes).to.equal("48");
		expect(candidate.analysis.lacsLinkCode).to.equal("49");
		expect(candidate.analysis.lacsLinkIndicator).to.equal("50");
		expect(candidate.analysis.isSuiteLinkMatch).to.equal(true);
		expect(candidate.analysis.noStat).to.equal("52");
		expect(candidate.analysis.enhancedMatch).to.equal("53");

		expect(candidate.analysis.components.primaryNumber).to.deep.equal({
			status: "54",
			change: ["a"],
		});
		expect(candidate.analysis.components.streetPredirection).to.deep.equal({
			status: "55",
			change: ["b"],
		});
		expect(candidate.analysis.components.streetName).to.deep.equal({ status: "56", change: ["c"] });
		expect(candidate.analysis.components.streetPostdirection).to.deep.equal({
			status: "57",
			change: ["d"],
		});
		expect(candidate.analysis.components.streetSuffix).to.deep.equal({
			status: "58",
			change: ["e"],
		});
		expect(candidate.analysis.components.secondaryNumber).to.deep.equal({
			status: "59",
			change: ["f"],
		});
		expect(candidate.analysis.components.secondaryDesignator).to.deep.equal({
			status: "60",
			change: ["g"],
		});
		expect(candidate.analysis.components.extraSecondaryNumber).to.deep.equal({
			status: "61",
			change: ["h"],
		});
		expect(candidate.analysis.components.extraSecondaryDesignator).to.deep.equal({
			status: "62",
			change: ["i"],
		});
		expect(candidate.analysis.components.cityName).to.deep.equal({ status: "63", change: ["j"] });
		expect(candidate.analysis.components.stateAbbreviation).to.deep.equal({
			status: "64",
			change: ["k"],
		});
		expect(candidate.analysis.components.zipCode).to.deep.equal({ status: "65", change: ["l"] });
		expect(candidate.analysis.components.plus4Code).to.deep.equal({ status: "66", change: ["m"] });
		expect(candidate.analysis.components.urbanization).to.deep.equal({
			status: "67",
			change: ["n"],
		});
	});
});
