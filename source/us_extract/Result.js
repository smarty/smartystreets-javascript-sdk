class Result {
	constructor({meta}) {
		this.meta = {};
		this.meta.lines = meta.lines;
		this.meta.unicode = meta.unicode;
		this.meta.addressCount = meta.address_count;
		this.meta.verifiedCount = meta.verified_count;
		this.meta.bytes = meta.bytes;
		this.meta.characterCount = meta.character_count;
	}
}

module.exports = Result;