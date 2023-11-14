class InputData {
	constructor(lookup) {
		this.lookup = lookup;
		this.data = {};
	}

	add(apiField, lookupField) {
		if (this.lookupFieldIsPopulated(lookupField)) this.data[apiField] = this.formatData(this.lookup[lookupField]);
	}

	formatData(field) {
		if (Array.isArray(field)) return field.join(";");
		else return field;
	}

	lookupFieldIsPopulated(lookupField) {
		return this.lookup[lookupField] !== "" && this.lookup[lookupField] !== undefined;
	}
}

module.exports = InputData;