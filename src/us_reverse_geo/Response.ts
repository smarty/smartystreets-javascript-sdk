import Result, { RawReverseGeoResult } from "./Result.js";

interface RawReverseGeoResponse {
	results: RawReverseGeoResult[];
}

export default class Response {
	results: Result[];

	constructor(responseData?: RawReverseGeoResponse) {
		this.results = [];

		if (responseData)
			responseData.results.forEach((rawResult: RawReverseGeoResult) => {
				this.results.push(new Result(rawResult));
			});
	}
}
