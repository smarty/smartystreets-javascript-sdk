const chai = require("chai");
const expect = chai.expect;
const Candidate = require("../../source/international_street/candidate");

describe("An International match candidate", function () {
	it("populates with the appropriate fields.", function () {
		const expectedResponseData = {
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
				},
			};
		let candidate = new Candidate(expectedResponseData);

		expect(candidate).to.deep.equal(expectedResponseData);
	});
});