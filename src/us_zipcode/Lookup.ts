export default class Lookup {
	city: string | undefined;
	state: string | undefined;
	zipCode: string | undefined;
	inputId: string | undefined;
	result: any[];
	customParameters: Record<string, any>;

	constructor(city?: string, state?: string, zipCode?: string, inputId?: string) {
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.inputId = inputId;
		this.result = [];
		this.customParameters = {};
	}

	addCustomParameter(key: string, value: any): void {
		this.customParameters[key] = value;
	}
}
