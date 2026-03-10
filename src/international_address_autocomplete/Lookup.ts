import Suggestion from "./Suggestion.js";

export default class Lookup {
	result: Suggestion[];
	search: string | undefined;
	addressId: string | undefined;
	country: string | undefined;
	maxResults: number;
	includeOnlyLocality: string | undefined;
	includeOnlyPostalCode: string | undefined;
	customParameters: Record<string, string>;

	constructor({
		search,
		addressId,
		country,
		maxResults = 5,
		includeOnlyLocality,
		includeOnlyPostalCode,
	}: {
		search?: string;
		addressId?: string;
		country?: string;
		maxResults?: number;
		includeOnlyLocality?: string;
		includeOnlyPostalCode?: string;
	} = {}) {
		this.result = [];

		this.search = search;
		this.addressId = addressId;
		this.country = country;
		this.maxResults = maxResults;
		this.includeOnlyLocality = includeOnlyLocality;
		this.includeOnlyPostalCode = includeOnlyPostalCode;
		this.customParameters = {};
	}

	addCustomParameter(key: string, value: string): void {
		this.customParameters[key] = value;
	}
}
