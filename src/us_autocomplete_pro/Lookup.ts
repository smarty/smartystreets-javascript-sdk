import Suggestion from "./Suggestion.js";

export type Geolocation = "city" | "none" | (string & {});

export default class Lookup {
	result: Suggestion[];
	search: string | undefined;
	selected: string | undefined;
	maxResults: number | undefined;
	includeOnlyCities: string[];
	includeOnlyStates: string[];
	includeOnlyZIPCodes: string[];
	excludeStates: string[];
	preferCities: string[];
	preferStates: string[];
	preferZIPCodes: string[];
	preferRatio: number | undefined;
	preferGeolocation: Geolocation | undefined;
	source: string | undefined;
	customParameters: Record<string, string>;

	constructor(search?: string) {
		this.result = [];

		this.search = search;
		this.selected = undefined;
		this.maxResults = undefined;
		this.includeOnlyCities = [];
		this.includeOnlyStates = [];
		this.includeOnlyZIPCodes = [];
		this.excludeStates = [];
		this.preferCities = [];
		this.preferStates = [];
		this.preferZIPCodes = [];
		this.preferRatio = undefined;
		this.preferGeolocation = undefined;
		this.source = undefined;
		this.customParameters = {};
	}

	addCustomParameter(key: string, value: string): void {
		this.customParameters[key] = value;
	}
}
