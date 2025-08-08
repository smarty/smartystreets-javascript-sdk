export interface LookupOptions {
	search?: string;
	addressId?: string;
	country?: string;
	maxResults?: number;
	includeOnlyLocality?: string;
	includeOnlyPostalCode?: string;
}

export default class Lookup {
	public search?: string;
	public addressId?: string;
	public country?: string;
	public maxResults: number;
	public includeOnlyLocality?: string;
	public includeOnlyPostalCode?: string;
	public result: any[] = [];
	public customParameters: Record<string, any> = {};

	constructor({
		search,
		addressId,
		country,
		maxResults = 5,
		includeOnlyLocality,
		includeOnlyPostalCode,
	}: LookupOptions = {}) {
		this.result = [];

		this.search = search;
		this.addressId = addressId;
		this.country = country;
		this.maxResults = maxResults;
		this.includeOnlyLocality = includeOnlyLocality;
		this.includeOnlyPostalCode = includeOnlyPostalCode;
		this.customParameters = {};
	}

	addCustomParameter(key: string, value: any): void {
		this.customParameters[key] = value;
	}
}

