import EnrichmentLookupBase from "../EnrichmentLookupBase.js";
import DetailResult from "./DetailResult.js";

export default class DetailLookup extends EnrichmentLookupBase {
	businessId: string | undefined;
	result: DetailResult | undefined;

	constructor(businessId?: string) {
		super();
		this.businessId = businessId;
	}
}
