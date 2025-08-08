export interface Lookup {
	[key: string]: any;
}

export default class InputData {
	private lookup: Lookup;
	public data: Record<string, any>;

	constructor(lookup: Lookup) {
		this.lookup = lookup;
		this.data = {};
	}

	add(apiField: string, lookupField: string): void {
		if (this.lookupFieldIsPopulated(lookupField)) {
			this.data[apiField] = this.formatData(this.lookup[lookupField]);
		}
	}

	addCustomParameter(key: string, value: any): void {
		this.data[key] = value;
	}

	private formatData(field: any): any {
		if (Array.isArray(field)) return field.join(";");
		else return field;
	}

	private lookupFieldIsPopulated(lookupField: string): boolean {
		return this.lookup[lookupField] !== "" && this.lookup[lookupField] !== undefined;
	}
}

