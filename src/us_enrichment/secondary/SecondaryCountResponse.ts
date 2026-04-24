interface RawSecondaryCountResponse {
	smarty_key?: string;
	count?: number;
}

export default class SecondaryCountResponse {
	smartyKey: string | undefined;
	count: number | undefined;

	constructor(raw?: RawSecondaryCountResponse) {
		this.smartyKey = raw?.smarty_key;
		this.count = raw?.count;
	}
}
