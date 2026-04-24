import DetailAttributes from "./DetailAttributes.js";

interface RawDetailResult {
	smarty_key?: string;
	data_set_name?: string;
	business_id?: string;
	attributes?: Record<string, string>;
}

export default class DetailResult {
	smartyKey: string | undefined;
	dataSetName: string | undefined;
	businessId: string | undefined;
	attributes: DetailAttributes;

	constructor(raw?: RawDetailResult) {
		this.smartyKey = raw?.smarty_key;
		this.dataSetName = raw?.data_set_name;
		this.businessId = raw?.business_id;
		this.attributes = new DetailAttributes(raw?.attributes);
	}
}
