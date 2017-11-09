const chai = require("chai");
const expect = chai.expect;
const Batch = require("../source/batch");

describe("A batch", function () {
	it ("has a lookups field.", function () {
		let batch = new Batch();

		expect(batch.hasOwnProperty("lookups")).to.equal(true);
		expect(Array.isArray(batch.lookups)).to.equal(true);
	});

	it ("can add a lookup to its array of lookups.", function () {
		let batch = new Batch();

		expect(batch.lookups.length).to.equal(0);
		batch.add("Hi.");
		expect(batch.lookups.length).to.equal(1);
	});
});