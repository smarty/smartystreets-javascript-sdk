const chai = require("chai");
const expect = chai.expect;
const Result = require("../../src/international_postal_code/Result");

describe("An International Postal Code result", function () {
	it("populates with the appropriate fields.", function () {
		const sampleResponse = {
			input_id: "1234",
			administrative_area: "SP",
			super_administrative_area: "Southeast",
			sub_administrative_area: "Metropolitan",
			locality: "São Paulo",
			dependent_locality: "Casa Verde",
			dependent_locality_name: "Casa Verde District",
			double_dependent_locality: "Zone 1",
			postal_code: "02516-040",
			postal_code_extra: "12345",
			country_iso_3: "BRA",
		};

		const result = new Result(sampleResponse);

		expect(result.inputId).to.equal("1234");
		expect(result.administrativeArea).to.equal("SP");
		expect(result.superAdministrativeArea).to.equal("Southeast");
		expect(result.subAdministrativeArea).to.equal("Metropolitan");
		expect(result.locality).to.equal("São Paulo");
		expect(result.dependentLocality).to.equal("Casa Verde");
		expect(result.dependentLocalityName).to.equal("Casa Verde District");
		expect(result.doubleDependentLocality).to.equal("Zone 1");
		expect(result.postalCode).to.equal("02516-040");
		expect(result.postalCodeExtra).to.equal("12345");
		expect(result.countryIso3).to.equal("BRA");
	});

	it("handles missing optional fields.", function () {
		const sampleResponse = {
			administrative_area: "SP",
			locality: "São Paulo",
			postal_code: "02516-040",
			country_iso_3: "BRA",
		};

		const result = new Result(sampleResponse);

		expect(result.inputId).to.equal(undefined);
		expect(result.superAdministrativeArea).to.equal(undefined);
		expect(result.postalCodeExtra).to.equal(undefined);
		expect(result.administrativeArea).to.equal("SP");
		expect(result.locality).to.equal("São Paulo");
		expect(result.postalCode).to.equal("02516-040");
		expect(result.countryIso3).to.equal("BRA");
	});
});
