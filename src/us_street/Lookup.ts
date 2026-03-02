export default class Lookup {
	street: string | undefined;
	street2: string | undefined;
	secondary: string | undefined;
	city: string | undefined;
	state: string | undefined;
	zipCode: string | undefined;
	lastLine: string | undefined;
	addressee: string | undefined;
	urbanization: string | undefined;
	match: string | undefined;
	maxCandidates: number | undefined;
	inputId: string | undefined;
	format: string | undefined;
	countySource: string | undefined;
	result: any[];
	customParameters: Record<string, any>;

	constructor(
		street?: string,
		street2?: string,
		secondary?: string,
		city?: string,
		state?: string,
		zipCode?: string,
		lastLine?: string,
		addressee?: string,
		urbanization?: string,
		match?: string,
		maxCandidates?: number,
		inputId?: string,
		format?: string,
		countySource?: string,
	) {
		this.street = street;
		this.street2 = street2;
		this.secondary = secondary;
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.lastLine = lastLine;
		this.addressee = addressee;
		this.urbanization = urbanization;
		this.match = match;
		this.maxCandidates = maxCandidates;
		this.inputId = inputId;
		this.format = format;
		this.countySource = countySource;
		this.result = [];
		this.customParameters = {};
	}

	addCustomParameter(key: string, value: any): void {
		this.customParameters[key] = value;
	}
}
