const chai = require("chai");
const expect = chai.expect;
const Batch = require("../source/batch");

expect("A batch", function () {
	it ("has a lookups field.", function () {
		let batch = new Batch();

		expect(batch.hasOwnProperty("lookups")).to.equal(true);
		expect(Array.isArray(batch.lookups)).to.equal(true);
	});
});