import Address from "./Address.js";

export interface ExtractMeta {
	lines: number | undefined;
	unicode: boolean | undefined;
	addressCount: number | undefined;
	verifiedCount: number | undefined;
	bytes: number | undefined;
	characterCount: number | undefined;
}

export default class Result {
	meta: ExtractMeta;
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
