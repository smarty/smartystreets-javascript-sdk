var group = function (lookups) {
	var returnArray = [],
		maxLookupGroupSize = 100;

	while (lookups.length) {
		returnArray.push(lookups.splice(0, maxLookupGroupSize));
	}

	return returnArray;
};

module.exports = group;