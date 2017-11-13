const chai = require("chai");
const expect = chai.expect;
const errors = require("../source/errors");
const Batch = require("../source/batch");

describe("A batch", function () {
	let batch;

	beforeEach(function () {
		batch = new Batch();
	});

	it ("has a lookups field.", function () {
		expect(batch.hasOwnProperty("lookups")).to.equal(true);
		expect(Array.isArray(batch.lookups)).to.equal(true);
	});

	it ("can add a lookup to its array of lookups.", function () {
		expect(batch.lookups.length).to.equal(0);
		batch.add("Hi.");
		expect(batch.lookups.length).to.equal(1);
	});

	it ("errors if you add a lookup when it's full.", function () {
		for (let i = 0; i < 100; i++) {
			let lookup = {};
			batch.add(lookup);
		}

		expect(() => batch.add({})).to.throw(errors.BatchFullError);
	});

	it ("can be cleared.", function () {
		batch.add("Hi.");
		batch.clear();
		expect(batch.lookups.length).to.equal(0);
	});

	it ("has a length.", function () {
		expect(batch.length()).to.equal(0);
		for (let i = 0; i < 50; i++) {
			batch.add(i);
		}
		expect(batch.length()).to.equal(50);
	});
});