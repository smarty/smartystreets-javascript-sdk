import { Response, GeoResponse } from "./Response.js";
import SecondaryResponse from "./secondary/SecondaryResponse.js";
import SecondaryCountResponse from "./secondary/SecondaryCountResponse.js";
import EnrichmentLookupBase from "./EnrichmentLookupBase.js";

export default class Lookup extends EnrichmentLookupBase {
	smartyKey: string | undefined;
	dataset: string | undefined;
	dataSubset: string | undefined;
	features: string | undefined;
	response: Response | GeoResponse | SecondaryResponse | SecondaryCountResponse;

	constructor(
		smartyKey?: string,
		include?: string,
		exclude?: string,
		dataset?: string,
		dataSubset?: string,
	) {
		super();
		this.smartyKey = smartyKey;
		this.include = include;
		this.exclude = exclude;
		this.dataset = dataset;
		this.dataSubset = dataSubset;
		this.features = undefined;
		this.response = new Response({});
	}
}
