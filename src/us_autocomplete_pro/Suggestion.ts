export interface RawUsAutocompleteSuggestion {
	street_line?: string;
	secondary?: string;
	city?: string;
	state?: string;
	zipcode?: string;
	entries?: number;
	source?: string;
}

export default class Suggestion {
	streetLine: string;
	secondary: string;
	city: string;
	state: string;
	zipcode: string;
	entries: number;
	source: string | undefined;

	constructor(responseData: RawUsAutocompleteSuggestion) {
		this.streetLine = responseData.street_line ?? "";
		this.secondary = responseData.secondary ?? "";
		this.city = responseData.city ?? "";
		this.state = responseData.state ?? "";
		this.zipcode = responseData.zipcode ?? "";
		this.entries = responseData.entries ?? 0;

		if (responseData.source) {
			this.source = responseData.source;
		}
	}
}
