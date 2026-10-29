import Result from "./Result.js";
import { LanguageMode } from "./LanguageMode.js";

export default class Lookup {
	inputId: string | undefined;
	country: string | undefined;
	postalCode: string | undefined;
	administrativeArea: string | undefined;
	locality: string | undefined;
	language: LanguageMode | undefined;
	maxResults: number | undefined;
	result: Result[];
	customParameters: Record<string, string>;

	constructor(
		country?: string,
		postalCode?: string,
		administrativeArea?: string,
		locality?: string,
		inputId?: string,
	) {
		this.inputId = inputId;
		this.country = country;
		this.postalCode = postalCode;
		this.administrativeArea = administrativeArea;
		this.locality = locality;
		this.language = undefined;
		this.maxResults = undefined;
		this.result = [];
		this.customParameters = {};
	}

	addCustomParameter(key: string, value: string): void {
		this.customParameters[key] = value;
	}
}
