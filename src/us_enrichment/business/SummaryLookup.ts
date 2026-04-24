import EnrichmentLookupBase from "../EnrichmentLookupBase.js";
import SummaryResult from "./SummaryResult.js";

export default class SummaryLookup extends EnrichmentLookupBase {
	smartyKey: string | undefined;
	freeform: string | undefined;
	street: string | undefined;
	city: string | undefined;
	state: string | undefined;
	zipcode: string | undefined;
	results: SummaryResult[] | undefined;

	constructor(smartyKey?: string) {
		super();
		this.smartyKey = smartyKey;
	}
}
