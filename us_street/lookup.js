class Lookup {
	constructor(street, street2, secondary, city, state, zipCode, lastLine, addressee, urbanization, match, maxCandidates, inputId) {
		this.street = street || undefined;
		this.street2 = street2 || undefined;
		this.secondary = secondary || undefined;
		this.city = city || undefined;
		this.state = state || undefined;
		this.zipCode = zipCode || undefined;
		this.lastLine = lastLine || undefined;
		this.addressee = addressee || undefined;
		this.urbanization = urbanization || undefined;
		this.match = match || undefined;
		this.maxCandidates = maxCandidates || undefined;
		this.inputId = inputId || undefined;
		this.result = [];
	}
}

module.exports = Lookup;
