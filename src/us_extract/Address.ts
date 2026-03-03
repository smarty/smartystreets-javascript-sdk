import Candidate, { RawUsStreetCandidate } from "../us_street/Candidate.js";

export interface RawExtractAddress {
	text?: string;
	verified?: boolean;
	line?: number;
	start?: number;
	end?: number;
	api_output?: RawUsStreetCandidate[];
}

export default class Address {
	text: string;
	verified: boolean;
	line: number;
	start: number;
	end: number;
	candidates: Candidate[];

	constructor(responseData: RawExtractAddress) {
		this.text = responseData.text ?? "";
		this.verified = responseData.verified ?? false;
		this.line = responseData.line ?? 0;
		this.start = responseData.start ?? 0;
		this.end = responseData.end ?? 0;
		this.candidates = responseData.api_output
			? responseData.api_output.map((rawAddress) => new Candidate(rawAddress))
			: [];
	}
}
