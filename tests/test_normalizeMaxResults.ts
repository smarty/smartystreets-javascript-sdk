import { expect } from "chai";
import normalizeMaxResults from "../src/util/normalizeMaxResults.js";
import { UnprocessableEntityError } from "../src/Errors.js";

describe("normalizeMaxResults", function () {
	it("converts whole numbers and sends them.", function () {
		expect(normalizeMaxResults(5)).to.equal(5);
		expect(normalizeMaxResults("5")).to.equal(5);
		expect(normalizeMaxResults(" 7 ")).to.equal(7);
		expect(normalizeMaxResults(5.0)).to.equal(5);
		expect(normalizeMaxResults("+3")).to.equal(3);
		expect(normalizeMaxResults(1000)).to.equal(1000);
	});

	it("doesn't send unset values or values not above 0.", function () {
		for (const value of [undefined, null, "", "  ", 0, "0", -1, "-2"]) {
			expect(normalizeMaxResults(value), `expected ${JSON.stringify(value)} to not be sent`).to.be
				.undefined;
		}
	});

	it("throws for values that aren't whole numbers.", function () {
		for (const value of ["abc", "1.5", 1.5, true]) {
			expect(
				() => normalizeMaxResults(value),
				`expected ${JSON.stringify(value)} to throw`,
			).to.throw(UnprocessableEntityError, "invalid max_results value; must be a whole number");
		}
	});
});
