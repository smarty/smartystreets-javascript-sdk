export interface SuggestionData {
	[key: string]: any;
}

export default class Suggestion {
	streetLine?: string;
	secondary?: string;
	city?: string;
	state?: string;
	zipcode?: string;
	entries?: string;

	constructor(responseData: SuggestionData) {
		this.streetLine = responseData.street_line;
		this.secondary = responseData.secondary;
		this.city = responseData.city;
		this.state = responseData.state;
		this.zipcode = responseData.zipcode;
		this.entries = responseData.entries;
	}
}
