const Address = require("./Address");

class Result {
	constructor({meta, addresses}) {
		this.meta = {
			lines: meta.lines,
			unicode: meta.unicode,
			addressCount: meta.address_count,
			verifiedCount: meta.verified_count,
			bytes: meta.bytes,
			characterCount: meta.character_count,
		};

		this.addresses = addresses.map(rawAddress => new Address(rawAddress));
	}
}

module.exports = Result;