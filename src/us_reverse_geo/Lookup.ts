import Response from "./Response";

/**
 * In addition to holding all of the input data for this lookup, this class also<br>
 *     will contain the result of the lookup after it comes back from the API.
 *     @see "https://www.smarty.com/docs/cloud/us-street-api#input-fields"
 */
export default class Lookup {
	public latitude: string;
	public longitude: string;
	public source: string;
	public response: Response;
	public customParameters: Record<string, any> = {};

	constructor(latitude: number, longitude: number, source = "") {
		this.latitude = latitude.toFixed(8);
		this.longitude = longitude.toFixed(8);
		this.source = source;
		this.response = new Response();
		this.customParameters = {};
	}

	addCustomParameter(key: string, value: any): void {
		this.customParameters[key] = value;
	}
}

