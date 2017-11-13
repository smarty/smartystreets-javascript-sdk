const errors = require("./errors");

class Batch {
	constructor () {
		this.lookups = [];
	}

	add (lookup) {
		if (this.lookupsHasRoomForLookup()) {
			this.lookups.push(lookup);
		} else {
			throw new errors.BatchFullError();
		}
	}

	lookupsHasRoomForLookup() {
		const maxNumberOfLookups = 100;
		return this.lookups.length < maxNumberOfLookups;
	}

	clear () {
		this.lookups = [];
	}

	length() {
		return this.lookups.length;
	}
}

module.exports = Batch;