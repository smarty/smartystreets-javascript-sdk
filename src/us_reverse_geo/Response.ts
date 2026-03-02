import Result from "./Result.js";

export default class Response {
	results: Result[];

	constructor(responseData?: Record<string, any>) {
		this.results = [];

		if (responseData)
			responseData.results.forEach((rawResult: Record<string, any>) => {
				this.results.push(new Result(rawResult));
			});
	}
}
