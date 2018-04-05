const chai = require("chai");
const expect = chai.expect;
const errors = require("../src/Errors");
const Batch = require("../src/Batch");
const Lookup = require("../src/us_street/Lookup");

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

	it ("returns a lookup by index.", function () {
		for (let i = 0; i < 100; i++) {
			batch.add(i);
		}

		expect(batch.getByIndex(50)).to.equal(50);
	});

	it ("returns a lookup by input id.", function () {
		for (let i = 0; i < 100; i++) {
			let lookup = new Lookup();
			lookup.inputId = i;
			batch.add(lookup);
		}

		let expectedLookup = batch.getByIndex(50);

		expect(batch.getByInputId(50)).to.deep.equal(expectedLookup);
	});

	it ("knows if it's empty.", function () {
		expect(batch.isEmpty()).to.equal(true);
		batch.add("1");
		expect(batch.isEmpty()).to.equal(false);
	});
});