export interface RawUsAutocompleteSuggestion {
	smarty_key?: string;
	entry_id?: string;
	street_line?: string;
	secondary?: string;
	city?: string;
	state?: string;
	zipcode?: string;
	entries?: number;
	source?: string;
}

export default class Suggestion {
	smartyKey: string;
	entryId: string;
	streetLine: string;
	secondary: string;
	city: string;
	state: string;
	zipcode: string;
	entries: number;
	source: string;

	constructor(responseData: RawUsAutocompleteSuggestion) {
		this.smartyKey = responseData.smarty_key ?? "";
		this.entryId = responseData.entry_id ?? "";
		this.streetLine = responseData.street_line ?? "";
		this.secondary = responseData.secondary ?? "";
		this.city = responseData.city ?? "";
		this.state = responseData.state ?? "";
		this.zipcode = responseData.zipcode ?? "";
		this.entries = responseData.entries ?? 0;
		this.source = responseData.source ?? "";
	}
}
