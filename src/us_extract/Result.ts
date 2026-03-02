import Address from "./Address.js";

export default class Result {
	meta: Record<string, any>;
	addresses: Address[];

	constructor({
		meta,
		addresses,
	}: {
		meta: Record<string, any>;
		addresses: Record<string, any>[];
	}) {
		this.meta = {
			lines: meta.lines,
			unicode: meta.unicode,
			addressCount: meta.address_count,
			verifiedCount: meta.verified_count,
			bytes: meta.bytes,
			characterCount: meta.character_count,
		};

		this.addresses = addresses.map((rawAddress) => new Address(rawAddress));
	}
}
