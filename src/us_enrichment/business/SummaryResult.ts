interface RawBusinessEntry {
	company_name?: string;
	business_id?: string;
}

interface RawSummaryResult {
	smarty_key?: string;
	data_set_name?: string;
	businesses?: RawBusinessEntry[];
}

export class BusinessEntry {
	companyName: string | undefined;
	businessId: string | undefined;

	constructor(raw?: RawBusinessEntry) {
		this.companyName = raw?.company_name;
		this.businessId = raw?.business_id;
	}
}

export default class SummaryResult {
	smartyKey: string | undefined;
	dataSetName: string | undefined;
	businesses: BusinessEntry[];

	constructor(raw?: RawSummaryResult) {
		this.smartyKey = raw?.smarty_key;
		this.dataSetName = raw?.data_set_name;
		this.businesses = (raw?.businesses ?? []).map((b) => new BusinessEntry(b));
	}
}
