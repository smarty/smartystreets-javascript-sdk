export default class Lookup {
	inputId: string | undefined;
	country: string | undefined;
	postalCode: string | undefined;
	administrativeArea: string | undefined;
	locality: string | undefined;
	result: any[];
	customParameters: Record<string, any>;

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
		this.result = [];
		this.customParameters = {};
	}

	addCustomParameter(key: string, value: any): void {
		this.customParameters[key] = value;
	}
}
