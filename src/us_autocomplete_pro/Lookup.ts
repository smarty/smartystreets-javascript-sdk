export default class Lookup {
	public search?: string;
	public selected?: string;
	public maxResults?: string | number;
	public includeOnlyCities?: string[];
	public includeOnlyStates?: string[];
	public includeOnlyZIPCodes?: string[];
	public excludeStates?: string[];
	public preferCities?: string[];
	public preferStates?: string[];
	public preferZIPCodes?: string[];
	public preferRatio?: string;
	public preferGeolocation?: string;
	public source?: string;
	public result: any[] = [];
	public customParameters: Record<string, any> = {};

	constructor(search?: string) {
		this.search = search;
	}

	addCustomParameter(key: string, value: any): void {
		this.customParameters[key] = value;
	}
}
