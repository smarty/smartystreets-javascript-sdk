import Suggestion from "./Suggestion.js";

export default class Lookup {
	result: Suggestion[];
	search: string | undefined;
	addressId: string | undefined;
	country: string | undefined;
	maxResults: number;
	includeOnlyLocality: string | undefined;
	includeOnlyPostalCode: string | undefined;
	maxGroupResults: number;
	geolocation: boolean;
	customParameters: Record<string, string>;

	constructor({
		search,
		addressId,
		country,
		maxResults = 5,
		includeOnlyLocality,
		includeOnlyPostalCode,
		maxGroupResults = 100,
		geolocation = false,
	}: {
		search?: string;
		addressId?: string;
		country?: string;
		maxResults?: number;
		includeOnlyLocality?: string;
		includeOnlyPostalCode?: string;
		maxGroupResults?: number;
		geolocation?: boolean;
	} = {}) {
		this.result = [];

		this.search = search;
		this.addressId = addressId;
		this.country = country;
		this.maxResults = maxResults;
		this.includeOnlyLocality = includeOnlyLocality;
		this.includeOnlyPostalCode = includeOnlyPostalCode;
		this.maxGroupResults = maxGroupResults;
		this.geolocation = geolocation;
		this.customParameters = {};
	}

	addCustomParameter(key: string, value: string): void {
		this.customParameters[key] = value;
	}
}
