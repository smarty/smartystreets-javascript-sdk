import Candidate from "../us_street/Candidate.js";

export default class Address {
	text: string;
	verified: boolean;
	line: number;
	start: number;
	end: number;
	candidates: Candidate[];

	constructor(responseData: Record<string, any>) {
		this.text = responseData.text;
		this.verified = responseData.verified;
		this.line = responseData.line;
		this.start = responseData.start;
		this.end = responseData.end;
		this.candidates = responseData.api_output
			? responseData.api_output.map(
					(rawAddress: Record<string, any>) => new Candidate(rawAddress),
				)
			: [];
	}
}
