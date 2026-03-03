import Address, { RawExtractAddress } from "./Address.js";

export interface ExtractMeta {
	lines: number | undefined;
	unicode: boolean | undefined;
	addressCount: number | undefined;
	verifiedCount: number | undefined;
	bytes: number | undefined;
	characterCount: number | undefined;
}

interface RawExtractMeta {
	lines?: number;
	unicode?: boolean;
	address_count?: number;
	verified_count?: number;
	bytes?: number;
	character_count?: number;
}

export default class Result {
	meta: ExtractMeta;
	addresses: Address[];

	constructor({ meta, addresses }: { meta: RawExtractMeta; addresses: RawExtractAddress[] }) {
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
