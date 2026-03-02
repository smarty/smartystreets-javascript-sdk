import Response from "./Response.js";

export default class Lookup {
	latitude: string;
	longitude: string;
	source: string;
	response: Response;
	customParameters: Record<string, any>;

	constructor(latitude: number, longitude: number, source: string = "") {
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
