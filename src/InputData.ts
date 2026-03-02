export default class InputData {
	lookup: Record<string, any>;
	data: Record<string, any>;

	constructor(lookup: Record<string, any>) {
		this.lookup = lookup;
		this.data = {};
	}

	add(apiField: string, lookupField: string): void {
		if (this.lookupFieldIsPopulated(lookupField))
			this.data[apiField] = this.formatData(this.lookup[lookupField]);
	}

	addCustomParameter(key: string, value: any): void {
		this.data[key] = value;
	}

	formatData(field: any): any {
		if (Array.isArray(field)) return field.join(";");
		else return field;
	}

	lookupFieldIsPopulated(lookupField: string): boolean {
		return this.lookup[lookupField] !== "" && this.lookup[lookupField] !== undefined;
	}
}
