export interface ResultData {
	[key: string]: any;
}

export default class Result {
	[key: string]: any;
	public meta: any = {};
	public addresses: any[] = [];

	constructor(responseData: ResultData) {
		this.meta = {
			lines: responseData.meta?.lines,
			unicode: responseData.meta?.unicode,
			addressCount: responseData.meta?.address_count,
			verifiedCount: responseData.meta?.verified_count,
			bytes: responseData.meta?.bytes,
			characterCount: responseData.meta?.character_count,
		};
		const Address = require("./Address").default;
		this.addresses = (responseData.addresses || []).map((a: any) => new Address(a));
	}
}
