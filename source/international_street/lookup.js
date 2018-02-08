const UnprocessableEntityError = require("../errors").UnprocessableEntityError;

class Lookup {
	constructor(country, freeform) {
		this.result = [];

		this.country = country;
		this.freeform = freeform;
		this.address1 = undefined;
		this.address2 = undefined;
		this.address3 = undefined;
		this.address4 = undefined;
		this.organization = undefined;
		this.locality = undefined;
		this.administrativeArea = undefined;
		this.postalCode = undefined;
		this.geocode = undefined;
		this.language = undefined;
		this.inputId = undefined;

		this.ensureEnoughInfo = this.ensureEnoughInfo.bind(this);
	}

	ensureEnoughInfo() {
		if (typeof this.country === "undefined") {
			throw new UnprocessableEntityError("Country field is required.");
		}
	}
}

module.exports = Lookup;