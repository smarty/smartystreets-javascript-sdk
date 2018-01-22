class Lookup {
	constructor(city, state, zipCode, inputId) {
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.inputId = inputId;
		this.result = [];
	}
}

module.exports = Lookup;