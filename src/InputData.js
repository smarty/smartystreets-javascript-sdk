class InputData {
	constructor(lookup) {
		this.lookup = lookup;
		this.data = {};
	}

	add(apiField, lookupField) {
		if (this.lookupFieldIsPopulated(lookupField)) this.data[apiField] = this.lookup[lookupField];
	}

	lookupFieldIsPopulated(lookupField) {
		return this.lookup[lookupField] !== "" && this.lookup[lookupField] !== undefined;
	}
}

module.exports = InputData;