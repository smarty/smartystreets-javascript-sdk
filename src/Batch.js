const BatchFullError = require("./Errors").BatchFullError;

/**
 * This class contains a collection of up to 100 lookups to be sent to one of the SmartyStreets APIs<br>
 *     all at once. This is more efficient than sending them one at a time.
 */
class Batch {
	constructor () {
		this.lookups = [];
	}

	add (lookup) {
		if (this.lookupsHasRoomForLookup()) this.lookups.push(lookup);
		else throw new BatchFullError();
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

	/**
	 * Clears the lookups stored in the batch so it can be used again.<br>
	 *     This helps avoid the overhead of building a new Batch object for each group of lookups.
	 */
	clear () {
		this.lookups = [];
	}

	isEmpty () {
		return this.length() === 0;
	}
}

module.exports = Batch;