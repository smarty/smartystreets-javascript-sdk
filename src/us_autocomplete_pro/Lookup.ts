export default class Lookup {
	result: any[];
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
	preferGeolocation: string | undefined;
	source: string | undefined;
	customParameters: Record<string, any>;

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

	addCustomParameter(key: string, value: any): void {
		this.customParameters[key] = value;
	}
}
