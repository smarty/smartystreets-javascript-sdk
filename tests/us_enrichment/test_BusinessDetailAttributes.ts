import { expect } from "chai";
import DetailAttributes from "../../src/us_enrichment/business/DetailAttributes.js";

describe("Business DetailAttributes", function () {
	it("leaves all fields undefined when raw is missing", function () {
		const a = new DetailAttributes();
		expect(a.companyName).to.equal(undefined);
		expect(a.zipcode).to.equal(undefined);
		expect(a.yearEstablished).to.equal(undefined);
	});

	it("maps simple snake_case fields to camelCase", function () {
		const a = new DetailAttributes({
			company_name: "Foo Inc",
			company_name_secondary: "Foo",
			business_status: "active",
			business_type: "llc",
			city_name: "Provo",
			state_abbreviation: "UT",
			zipcode: "84601",
			plus4_code: "1234",
		});
		expect(a.companyName).to.equal("Foo Inc");
		expect(a.companyNameSecondary).to.equal("Foo");
		expect(a.businessStatus).to.equal("active");
		expect(a.businessType).to.equal("llc");
		expect(a.cityName).to.equal("Provo");
		expect(a.stateAbbreviation).to.equal("UT");
		expect(a.zipcode).to.equal("84601");
		expect(a.plus4Code).to.equal("1234");
	});

	it("maps contact name fields", function () {
		const a = new DetailAttributes({
			contact_first_name: "Alice",
			contact_last_name: "Smith",
			contact_full_name: "Alice Smith",
			contact_middle_name: "Q",
			contact_prefix: "Dr",
			contact_suffix: "Jr",
			contact_gender: "F",
			contact_professional_title: "Engineer",
		});
		expect(a.contactFirstName).to.equal("Alice");
		expect(a.contactLastName).to.equal("Smith");
		expect(a.contactFullName).to.equal("Alice Smith");
		expect(a.contactMiddleName).to.equal("Q");
		expect(a.contactPrefix).to.equal("Dr");
		expect(a.contactSuffix).to.equal("Jr");
		expect(a.contactGender).to.equal("F");
		expect(a.contactProfessionalTitle).to.equal("Engineer");
	});

	it("maps fortune_1000_* fields", function () {
		const a = new DetailAttributes({
			fortune_1000_indicator: "Y",
			fortune_1000_rank: "42",
			fortune_1000_branches: "5",
		});
		expect(a.fortune1000Indicator).to.equal("Y");
		expect(a.fortune1000Rank).to.equal("42");
		expect(a.fortune1000Branches).to.equal("5");
	});

	it("maps NAICS 01-06 fields", function () {
		const a = new DetailAttributes({
			naics_01_code: "54",
			naics_01_description: "Professional",
			naics_02_code: "55",
			naics_02_description: "Mgmt",
			naics_06_code: "81",
			naics_06_description: "Other",
		});
		expect(a.naics01Code).to.equal("54");
		expect(a.naics01Description).to.equal("Professional");
		expect(a.naics02Code).to.equal("55");
		expect(a.naics02Description).to.equal("Mgmt");
		expect(a.naics06Code).to.equal("81");
		expect(a.naics06Description).to.equal("Other");
	});

	it("maps primary SIC 2/4 digit fields", function () {
		const a = new DetailAttributes({
			primary_sic_2digit_code: "73",
			primary_sic_2digit_description: "Business",
			primary_sic_4digit_code: "7371",
			primary_sic_4digit_description: "Computer",
			primary_sic_code: "737101",
			primary_sic_description: "Prepackaged",
		});
		expect(a.primarySic2DigitCode).to.equal("73");
		expect(a.primarySic2DigitDescription).to.equal("Business");
		expect(a.primarySic4DigitCode).to.equal("7371");
		expect(a.primarySic4DigitDescription).to.equal("Computer");
		expect(a.primarySicCode).to.equal("737101");
		expect(a.primarySicDescription).to.equal("Prepackaged");
	});

	it("maps secondary_NN_sic_7digit fields", function () {
		const a = new DetailAttributes({
			secondary_01_sic_7digit_code: "7371010",
			secondary_01_sic_7digit_description: "a",
			secondary_05_sic_7digit_code: "7371050",
			secondary_05_sic_7digit_description: "e",
		});
		expect(a.secondary01Sic7DigitCode).to.equal("7371010");
		expect(a.secondary01Sic7DigitDescription).to.equal("a");
		expect(a.secondary05Sic7DigitCode).to.equal("7371050");
		expect(a.secondary05Sic7DigitDescription).to.equal("e");
	});

	it("maps operating_hours_* for each day of the week", function () {
		const a = new DetailAttributes({
			operating_hours_monday: "9-5",
			operating_hours_tuesday: "9-5",
			operating_hours_wednesday: "9-5",
			operating_hours_thursday: "9-5",
			operating_hours_friday: "9-5",
			operating_hours_saturday: "closed",
			operating_hours_sunday: "closed",
		});
		expect(a.operatingHoursMonday).to.equal("9-5");
		expect(a.operatingHoursTuesday).to.equal("9-5");
		expect(a.operatingHoursWednesday).to.equal("9-5");
		expect(a.operatingHoursThursday).to.equal("9-5");
		expect(a.operatingHoursFriday).to.equal("9-5");
		expect(a.operatingHoursSaturday).to.equal("closed");
		expect(a.operatingHoursSunday).to.equal("closed");
	});

	it("maps url_* social fields", function () {
		const a = new DetailAttributes({
			url: "https://foo.com",
			url_facebook: "https://facebook.com/foo",
			url_instagram: "https://instagram.com/foo",
			url_linkedin: "https://linkedin.com/company/foo",
			url_twitter: "https://x.com/foo",
			url_yelp: "https://yelp.com/foo",
			url_youtube: "https://youtube.com/foo",
		});
		expect(a.url).to.equal("https://foo.com");
		expect(a.urlFacebook).to.equal("https://facebook.com/foo");
		expect(a.urlInstagram).to.equal("https://instagram.com/foo");
		expect(a.urlLinkedin).to.equal("https://linkedin.com/company/foo");
		expect(a.urlTwitter).to.equal("https://x.com/foo");
		expect(a.urlYelp).to.equal("https://yelp.com/foo");
		expect(a.urlYoutube).to.equal("https://youtube.com/foo");
	});

	it("maps year_* historical fields", function () {
		const a = new DetailAttributes({
			year_established: "1995",
			year_current: "2026",
			year_current_employee_count: "100",
			year_one_prior_employee_count: "95",
			year_one_prior_employee_growth: "5.3",
			year_two_prior: "2024",
			year_three_prior_employee_count: "85",
			year_four_prior_employee_growth: "3.1",
		});
		expect(a.yearEstablished).to.equal("1995");
		expect(a.yearCurrent).to.equal("2026");
		expect(a.yearCurrentEmployeeCount).to.equal("100");
		expect(a.yearOnePriorEmployeeCount).to.equal("95");
		expect(a.yearOnePriorEmployeeGrowth).to.equal("5.3");
		expect(a.yearTwoPrior).to.equal("2024");
		expect(a.yearThreePriorEmployeeCount).to.equal("85");
		expect(a.yearFourPriorEmployeeGrowth).to.equal("3.1");
	});

	it("maps holding, hq, and sub_hq hierarchy fields", function () {
		const a = new DetailAttributes({
			holding_id: "h1",
			holding_company_name: "HoldCo",
			holding_city_name: "City",
			holding_state_abbreviation: "UT",
			hq_id: "hq1",
			hq_company_name: "HQ Inc",
			hq_number_of_companies: "50",
			sub_hq_id: "shq1",
			sub_hq_company_name: "SubHQ",
			sub_hq_number_of_companies: "10",
			sub_hq_city_name: "City2",
			sub_hq_state_abbreviation: "CA",
		});
		expect(a.holdingId).to.equal("h1");
		expect(a.holdingCompanyName).to.equal("HoldCo");
		expect(a.holdingCityName).to.equal("City");
		expect(a.holdingStateAbbreviation).to.equal("UT");
		expect(a.hqId).to.equal("hq1");
		expect(a.hqCompanyName).to.equal("HQ Inc");
		expect(a.hqNumberOfCompanies).to.equal("50");
		expect(a.subHqId).to.equal("shq1");
		expect(a.subHqCompanyName).to.equal("SubHQ");
		expect(a.subHqNumberOfCompanies).to.equal("10");
		expect(a.subHqCityName).to.equal("City2");
		expect(a.subHqStateAbbreviation).to.equal("CA");
	});

	it("maps delivery_line_1 and mailing_delivery_line_1", function () {
		const a = new DetailAttributes({
			delivery_line_1: "line-1",
			mailing_delivery_line_1: "mail-line-1",
			delivery_point: "dp",
			delivery_point_check_digit: "7",
			mailing_delivery_point: "mdp",
			mailing_delivery_point_check_digit: "9",
		});
		expect(a.deliveryLine1).to.equal("line-1");
		expect(a.mailingDeliveryLine1).to.equal("mail-line-1");
		expect(a.deliveryPoint).to.equal("dp");
		expect(a.deliveryPointCheckDigit).to.equal("7");
		expect(a.mailingDeliveryPoint).to.equal("mdp");
		expect(a.mailingDeliveryPointCheckDigit).to.equal("9");
	});

	it("leaves unspecified fields undefined even when others are set", function () {
		const a = new DetailAttributes({ company_name: "Only" });
		expect(a.companyName).to.equal("Only");
		expect(a.businessStatus).to.equal(undefined);
		expect(a.fortune1000Rank).to.equal(undefined);
		expect(a.naics06Code).to.equal(undefined);
		expect(a.yearEstablished).to.equal(undefined);
	});
});
