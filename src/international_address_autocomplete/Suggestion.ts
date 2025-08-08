export interface SuggestionData {
	[key: string]: any;
}

export default class Suggestion {
	[key: string]: any;
	street?: string;
	locality?: string;
	administrative_area?: string;
	postal_code?: string;
	country_iso3?: string;

	constructor(responseData: SuggestionData) {
		Object.assign(this, responseData);
	}
}
