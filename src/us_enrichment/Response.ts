export class Response {
	[key: string]: any;
	attributes: any;
	constructor(responseData?: any) {
		if (!responseData || Object.keys(responseData).length === 0) {
			this.attributes = {};
			return;
		}
		this.smarty_key = responseData.smarty_key;
		this.data_set_name = responseData.data_set_name;
		this.data_subset_name = responseData.data_subset_name;
		this.attributes = mapAttributes(responseData.attributes || {});
	}
}

export class FinancialResponse extends Response {}
export class GeoResponse extends Response {}

export default Response;

function camelize(key: string) {
	const withOrdinals = key
		.replace(/^1st_/, "first_")
		.replace(/^2nd_/, "second_")
		.replace(/^3rd_/, "third_")
		.replace(/^4th_/, "fourth_");
	return withOrdinals.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function mapAttributes(attrs: Record<string, any>) {
	const out: Record<string, any> = {};
	for (const k of Object.keys(attrs || {})) {
		let ck = camelize(k)
			.replace(/^firstFloorSqft$/, "firstFloorSqft")
			.replace(/^secondFloorSqft$/, "secondFlootSqft")
			.replace(/^basementSqftUnfinished$/, "basementsqftUnfinished")
			.replace(/_(\d+)/g, "$1");
		if (k === "building_definition") ck = "buildingDefinitionCode";
		if (k === "contact_crrt") ck = "contactCrrt";
		if (k === "contact_mail_info_format" || k === "contact_main_info_format")
			ck = "contactMailInfoFormat";
		if (k === "fire_sprinkler_flag") ck = "fireSprinklersFlag";
		if (k === "storage_building_sqft" || k === "storage_buildling_sqft") ck = "storageBuildingSqft";
		out[ck] = attrs[k];
	}
	return out;
}
