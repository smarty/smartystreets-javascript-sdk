import { Response, FinancialResponse, GeoResponse } from "./Response.js";

export default class Lookup {
	smartyKey: string | undefined;
	include: string | undefined;
	exclude: string | undefined;
	dataset: string | undefined;
	dataSubset: string | undefined;
	features: string | undefined;
	response: Response | FinancialResponse | GeoResponse;
	customParameters: Record<string, string>;

	constructor(
		smartyKey?: string,
		include?: string,
		exclude?: string,
		dataset?: string,
		dataSubset?: string,
	) {
		this.smartyKey = smartyKey;
		this.include = include;
		this.exclude = exclude;
		this.dataset = dataset;
		this.dataSubset = dataSubset;
		this.features = undefined;

		this.response = new Response({});
		this.customParameters = {};
	}

	addCustomParameter(key: string, value: string): void {
		this.customParameters[key] = value;
	}
}
