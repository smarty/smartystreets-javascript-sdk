class Batch {
	constructor () {
		this.lookups = [];
	}

	add (lookup) {
		this.lookups.push(lookup);
	}
}

module.exports = Batch;