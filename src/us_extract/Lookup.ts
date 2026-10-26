import Result from "./Result.js";
import type { MatchStrategy } from "../us_street/Lookup.js";

export default class Lookup {
	result: Result;
	text: string;
	html: boolean | undefined;
	aggressive: boolean | undefined;
	addressesHaveLineBreaks: boolean | undefined;
	addressesPerLine: number | undefined;
	match: MatchStrategy | undefined;
	customParameters: Record<string, string>;

	constructor(text: string) {
		this.result = new Result({ meta: {}, addresses: [] });
		this.text = text;
		this.html = undefined;
		this.aggressive = undefined;
		this.addressesHaveLineBreaks = undefined;
		this.addressesPerLine = undefined;
		this.match = undefined;
		this.customParameters = {};
	}

	addCustomParameter(key: string, value: string): void {
		this.customParameters[key] = value;
	}
}
