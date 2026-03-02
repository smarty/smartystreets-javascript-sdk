import Result from "./Result.js";

export default class Lookup {
	city: string | undefined;
	state: string | undefined;
	zipCode: string | undefined;
	inputId: string | undefined;
	result: Result[];
	customParameters: Record<string, string>;

	constructor(city?: string, state?: string, zipCode?: string, inputId?: string) {
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.inputId = inputId;
		this.result = [];
		this.customParameters = {};
	}

	addCustomParameter(key: string, value: string): void {
		this.customParameters[key] = value;
	}
}
