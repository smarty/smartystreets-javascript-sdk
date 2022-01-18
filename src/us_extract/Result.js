const Address = require("./Address");

/**
 * @see <a href="https://www.smarty.com/docs/cloud/us-extract-api#http-response-status">Smarty US Extract API docs</a>
 */
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