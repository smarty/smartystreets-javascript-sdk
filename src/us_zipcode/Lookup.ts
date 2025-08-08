/**
 * In addition to holding all of the input data for this lookup, this class also<br>
 *     will contain the result of the lookup after it comes back from the API.
 *     @see "https://www.smarty.com/docs/cloud/us-zipcode-api#http-request-input-fields"
 */
export default class Lookup {
	public city?: string;
	public state?: string;
	public zipCode?: string;
	public inputId?: string;
	public result: any[] = [];
	public customParameters: Record<string, any> = {};

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

