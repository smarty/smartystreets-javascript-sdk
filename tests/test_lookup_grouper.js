var chai = require("chai"),
	expect = chai.expect,
	group = require("../internal/lookup_grouper");

describe ("Lookup grouping", function () {
	it ("expects an array of less than 100 values to return an array with a single value containing all original values", function () {
		expect(group([1, 2, 3, 4, 5])).to.have.length(1);
	});

	it ("expects an array of 1000 values to return an array with 10 values, each containing 100 values", function () {
		var values = [];
		for (var i = 0; i < 1000; i++) {
			values.push({
				"value": i
			});
		}

		expect (group(values)).to.have.length(10);
	});
});