export interface AddressData {
	[key: string]: any;
}

export default class Address {
	[key: string]: any;
	public candidates: any[] = [];

	constructor(responseData: AddressData) {
		Object.assign(this, responseData);
		this.candidates = (responseData.api_output || []).map(
			(c: any) => new (require("../us_street/Candidate").default)(c),
		);
	}
}
