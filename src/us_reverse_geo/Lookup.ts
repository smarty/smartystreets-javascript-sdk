import Response from "./Response.js";
import type { Source } from "../types.js";

export default class Lookup {
	latitude: string;
	longitude: string;
	source: Source | undefined;
	response: Response;
	customParameters: Record<string, string>;

	constructor(latitude: number, longitude: number, source?: Source) {
		this.latitude = latitude.toFixed(8);
		this.longitude = longitude.toFixed(8);
		this.source = source;
		this.response = new Response();
		this.customParameters = {};
	}

	addCustomParameter(key: string, value: string): void {
		this.customParameters[key] = value;
	}
}
