const errors = require("./errors");

class Batch {
	constructor () {
		this.lookups = [];
	}

	add (lookup) {
		if (this.lookupsHasRoomForLookup()) this.lookups.push(lookup);
		else throw new errors.BatchFullError();
	}

	lookupsHasRoomForLookup() {
		const maxNumberOfLookups = 100;
		return this.lookups.length < maxNumberOfLookups;
	}

	length() {
		return this.lookups.length;
	}

	getByIndex(index) {
		return this.lookups[index];
	}

	getByInputId(inputId) {
		return this.lookups.filter(lookup => {
			return lookup.inputId === inputId;
		})[0];
	}

	clear () {
		this.lookups = [];
	}

	isEmpty () {
		return this.length() === 0;
	}
}

module.exports = Batch;