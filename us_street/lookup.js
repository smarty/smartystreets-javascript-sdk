class Lookup {
	constructor(street, street2, secondary, city, state, zipCode, lastLine, addressee, urbanization, match, maxCandidates, inputId) {
		this.street = street;
		this.street2 = street2;
		this.secondary = secondary;
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.lastLine = lastLine;
		this.addressee = addressee;
		this.urbanization = urbanization;
		this.match = match;
		this.maxCandidates = maxCandidates;
		this.inputId = inputId;
		this.result = [];
	}
}

module.exports = Lookup;
