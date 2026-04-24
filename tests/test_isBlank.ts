import { expect } from "chai";
import isBlank from "../src/util/isBlank.js";

describe("isBlank", function () {
	it("is true for undefined", function () {
		expect(isBlank(undefined)).to.equal(true);
	});

	it("is true for null", function () {
		expect(isBlank(null)).to.equal(true);
	});

	it("is true for empty string", function () {
		expect(isBlank("")).to.equal(true);
	});

	it("is true for spaces", function () {
		expect(isBlank("   ")).to.equal(true);
	});

	it("is true for tabs and newlines", function () {
		expect(isBlank("\t\n  \n")).to.equal(true);
	});

	it("is false for a non-whitespace string", function () {
		expect(isBlank("x")).to.equal(false);
	});

	it("is false for a string with leading/trailing whitespace", function () {
		expect(isBlank("  x  ")).to.equal(false);
	});
});
