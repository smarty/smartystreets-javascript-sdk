const chai = require("chai");
const expect = chai.expect;
const Candidate = require("../../src/international_street/Candidate");

describe("An International match candidate", function () {
	it("populates with the appropriate fields.", function () {
		const sampleResponse = {
			organization: "1",
			address1: "2",
			address2: "3",
			address3: "4",
			address4: "5",
			address5: "6",
			address6: "7",
			address7: "8",
			address8: "9",
			address9: "10",
			address10: "11",
			address11: "12",
			address12: "13",
			components: {
				country_iso_3: "14",
				super_administrative_area: "15",
				administrative_area: "16",
				sub_administrative_area: "17",
				dependent_locality: "18",
				dependent_locality_name: "19",
				double_dependent_locality: "20",
				locality: "21",
				postal_code: "22",
				postal_code_short: "23",
				postal_code_extra: "24",
				premise: "25",
				premise_extra: "26",
				premise_prefix_number: "26.5",
				premise_number: "27",
				premise_type: "28",
				thoroughfare: "29",
				thoroughfare_predirection: "30",
				thoroughfare_postdirection: "31",
				thoroughfare_name: "32",
				thoroughfare_trailing_type: "33",
				thoroughfare_type: "34",
				dependent_thoroughfare: "35",
				dependent_thoroughfare_predirection: "36",
				dependent_thoroughfare_postdirection: "37",
				dependent_thoroughfare_name: "38",
				dependent_thoroughfare_trailing_type: "39",
				dependent_thoroughfare_type: "40",
				building: "41",
				building_leading_type: "42",
				building_name: "43",
				building_trailing_type: "44",
				sub_building_type: "45",
				sub_building_number: "46",
				sub_building_name: "47",
				sub_building: "48",
				post_box: "49",
				post_box_type: "50",
				post_box_number: "51",
			},
			metadata: {
				latitude: 52.0,
				longitude: 53.0,
				geocode_precision: "54",
				max_geocode_precision: "55",
				address_format: "56",
			},
			analysis: {
				verification_status: "57",
				address_precision: "58",
				max_address_precision: "59",
				changes: {
					organization: "60",
					address1: "61",
					address2: "62",
					address3: "63",
					address4: "64",
					address5: "65",
					address6: "66",
					address7: "67",
					address8: "68",
					address9: "69",
					address10: "70",
					address11: "71",
					address12: "72",
					components: {
						country_iso_3: "73",
						super_administrative_area: "74",
						administrative_area: "75",
						sub_administrative_area: "76",
						dependent_locality: "77",
						dependent_locality_name: "78",
						double_dependent_locality: "79",
						locality: "80",
						postal_code: "81",
						postal_code_short: "82",
						postal_code_extra: "83",
						premise: "84",
						premise_extra: "85",
						premise_prefix_number: "86",
						premise_number: "87",
						premise_type: "88",
						thoroughfare: "89",
						thoroughfare_predirection: "90",
						thoroughfare_postdirection: "91",
						thoroughfare_name: "92",
						thoroughfare_trailing_type: "93",
						thoroughfare_type: "94",
						dependent_thoroughfare: "95",
						dependent_thoroughfare_predirection: "96",
						dependent_thoroughfare_postdirection: "97",
						dependent_thoroughfare_name: "98",
						dependent_thoroughfare_trailing_type: "99",
						dependent_thoroughfare_type: "100",
						building: "101",
						building_leading_type: "102",
						building_name: "103",
						building_trailing_type: "104",
						sub_building_type: "105",
						sub_building_number: "106",
						sub_building_name: "107",
						sub_building: "108",
						post_box: "109",
						post_box_type: "110",
						post_box_number: "111",
					},
				},
			},
		};

		const candidate = new Candidate(sampleResponse);

		expect(candidate.organization).to.equal("1");
		expect(candidate.address1).to.equal("2");
		expect(candidate.address2).to.equal("3");
		expect(candidate.address3).to.equal("4");
		expect(candidate.address4).to.equal("5");
		expect(candidate.address5).to.equal("6");
		expect(candidate.address6).to.equal("7");
		expect(candidate.address7).to.equal("8");
		expect(candidate.address8).to.equal("9");
		expect(candidate.address9).to.equal("10");
		expect(candidate.address10).to.equal("11");
		expect(candidate.address11).to.equal("12");
		expect(candidate.address12).to.equal("13");
		let components = candidate.components;
		expect(components.countryIso3).to.equal("14");
		expect(components.superAdministrativeArea).to.equal("15");
		expect(components.administrativeArea).to.equal("16");
		expect(components.subAdministrativeArea).to.equal("17");
		expect(components.dependentLocality).to.equal("18");
		expect(components.dependentLocalityName).to.equal("19");
		expect(components.doubleDependentLocality).to.equal("20");
		expect(components.locality).to.equal("21");
		expect(components.postalCode).to.equal("22");
		expect(components.postalCodeShort).to.equal("23");
		expect(components.postalCodeExtra).to.equal("24");
		expect(components.premise).to.equal("25");
		expect(components.premiseExtra).to.equal("26");
		expect(components.premisePrefixNumber).to.equal("26.5");
		expect(components.premiseNumber).to.equal("27");
		expect(components.premiseType).to.equal("28");
		expect(components.thoroughfare).to.equal("29");
		expect(components.thoroughfarePredirection).to.equal("30");
		expect(components.thoroughfarePostdirection).to.equal("31");
		expect(components.thoroughfareName).to.equal("32");
		expect(components.thoroughfareTrailingType).to.equal("33");
		expect(components.thoroughfareType).to.equal("34");
		expect(components.dependentThoroughfare).to.equal("35");
		expect(components.dependentThoroughfarePredirection).to.equal("36");
		expect(components.dependentThoroughfarePostdirection).to.equal("37");
		expect(components.dependentThoroughfareName).to.equal("38");
		expect(components.dependentThoroughfareTrailingType).to.equal("39");
		expect(components.dependentThoroughfareType).to.equal("40");
		expect(components.building).to.equal("41");
		expect(components.buildingLeadingType).to.equal("42");
		expect(components.buildingName).to.equal("43");
		expect(components.buildingTrailingType).to.equal("44");
		expect(components.subBuildingType).to.equal("45");
		expect(components.subBuildingNumber).to.equal("46");
		expect(components.subBuildingName).to.equal("47");
		expect(components.subBuilding).to.equal("48");
		expect(components.postBox).to.equal("49");
		expect(components.postBoxType).to.equal("50");
		expect(components.postBoxNumber).to.equal("51");
		let metadata = candidate.metadata;
		expect(metadata.latitude).to.equal(52.0);
		expect(metadata.longitude).to.equal(53.0);
		expect(metadata.geocodePrecision).to.equal("54");
		expect(metadata.maxGeocodePrecision).to.equal("55");
		expect(metadata.addressFormat).to.equal("56");
		let analysis = candidate.analysis;
		expect(analysis.verificationStatus).to.equal("57");
		expect(analysis.addressPrecision).to.equal("58");
		expect(analysis.maxAddressPrecision).to.equal("59");
		let changes = analysis.changes;
		expect(changes.organization).to.equal("60");
		expect(changes.address1).to.equal("61");
		expect(changes.address2).to.equal("62");
		expect(changes.address3).to.equal("63");
		expect(changes.address4).to.equal("64");
		expect(changes.address5).to.equal("65");
		expect(changes.address6).to.equal("66");
		expect(changes.address7).to.equal("67");
		expect(changes.address8).to.equal("68");
		expect(changes.address9).to.equal("69");
		expect(changes.address10).to.equal("70");
		expect(changes.address11).to.equal("71");
		expect(changes.address12).to.equal("72");
		let ccomponents = changes.components;
		expect(ccomponents.countryIso3).to.equal("73");
		expect(ccomponents.superAdministrativeArea).to.equal("74");
		expect(ccomponents.administrativeArea).to.equal("75");
		expect(ccomponents.subAdministrativeArea).to.equal("76");
		expect(ccomponents.dependentLocality).to.equal("77");
		expect(ccomponents.dependentLocalityName).to.equal("78");
		expect(ccomponents.doubleDependentLocality).to.equal("79");
		expect(ccomponents.locality).to.equal("80");
		expect(ccomponents.postalCode).to.equal("81");
		expect(ccomponents.postalCodeShort).to.equal("82");
		expect(ccomponents.postalCodeExtra).to.equal("83");
		expect(ccomponents.premise).to.equal("84");
		expect(ccomponents.premiseExtra).to.equal("85");
		expect(ccomponents.premisePrefixNumber).to.equal("86");
		expect(ccomponents.premiseNumber).to.equal("87");
		expect(ccomponents.premiseType).to.equal("88");
		expect(ccomponents.thoroughfare).to.equal("89");
		expect(ccomponents.thoroughfarePredirection).to.equal("90");
		expect(ccomponents.thoroughfarePostdirection).to.equal("91");
		expect(ccomponents.thoroughfareName).to.equal("92");
		expect(ccomponents.thoroughfareTrailingType).to.equal("93");
		expect(ccomponents.thoroughfareType).to.equal("94");
		expect(ccomponents.dependentThoroughfare).to.equal("95");
		expect(ccomponents.dependentThoroughfarePredirection).to.equal("96");
		expect(ccomponents.dependentThoroughfarePostdirection).to.equal("97");
		expect(ccomponents.dependentThoroughfareName).to.equal("98");
		expect(ccomponents.dependentThoroughfareTrailingType).to.equal("99");
		expect(ccomponents.dependentThoroughfareType).to.equal("100");
		expect(ccomponents.building).to.equal("101");
		expect(ccomponents.buildingLeadingType).to.equal("102");
		expect(ccomponents.buildingName).to.equal("103");
		expect(ccomponents.buildingTrailingType).to.equal("104");
		expect(ccomponents.subBuildingType).to.equal("105");
		expect(ccomponents.subBuildingNumber).to.equal("106");
		expect(ccomponents.subBuildingName).to.equal("107");
		expect(ccomponents.subBuilding).to.equal("108");
		expect(ccomponents.postBox).to.equal("109");
		expect(ccomponents.postBoxType).to.equal("110");
		expect(ccomponents.postBoxNumber).to.equal("111");
	});
});
