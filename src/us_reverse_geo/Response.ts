import Result from "./Result";

export interface ResponseData {
	results?: any[];
}

/**
 * The SmartyResponse contains the response from a call to the US Reverse Geo API.
 */
export default class Response {
	public results: Result[] = [];

	constructor(responseData?: ResponseData) {
		this.results = [];

		if (responseData) {
			responseData.results?.map((rawResult) => {
				this.results.push(new Result(rawResult));
			});
			// If license 1 expected, ensure mapping in Result handles "1" as proprietary
		}
	}
}
