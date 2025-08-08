/**
 * In addition to holding all of the input data for this lookup, this class also<br>
 *     will contain the result of the lookup after it comes back from the API.
 *     @see "https://www.smarty.com/docs/cloud/us-street-api#input-fields"
 */
export default class Lookup {
	public street?: string;
	public street2?: string;
	public secondary?: string;
	public city?: string;
	public state?: string;
	public zipCode?: string;
	public lastLine?: string;
	public addressee?: string;
	public urbanization?: string;
	public match?: string;
	public maxCandidates?: number;
	public inputId?: string;
	public format?: string;
	public countySource?: string;
	public result: any[] = [];
	public customParameters: Record<string, any> = {};

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

