const UnprocessableEntityError = require("../Errors").UnprocessableEntityError;
const messages = {
	countryRequired: "Country field is required.",
	freeformOrAddress1Required: "Either freeform or address1 is required.",
	insufficientInformation: "Insufficient information: One or more required fields were not set on the lookup.",
	badGeocode: "Invalid input: geocode can only be set to 'true' (default is 'false'.",
	invalidLanguage: "Invalid input: language can only be set to 'latin' or 'native'. When not set, the the output language will match the language of the input values."
};


/**
 * In addition to holding all of the input data for this lookup, this class also<br>
 *     will contain the result of the lookup after it comes back from the API.
 *     <p><b>Note: </b><i>Lookups must have certain required fields set with non-blank values. <br>
 *         These can be found at the URL below.</i></p>
 *     @see "https://smartystreets.com/docs/cloud/international-street-api#http-input-fields"
 */
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
		this.ensureValidData = this.ensureValidData.bind(this);
	}

	ensureEnoughInfo() {
		if (fieldIsMissing(this.country)) throw new UnprocessableEntityError(messages.countryRequired);

		if (fieldIsSet(this.freeform)) return true;

		if (fieldIsMissing(this.address1)) throw new UnprocessableEntityError(messages.freeformOrAddress1Required);

		if (fieldIsSet(this.postalCode)) return true;

		if (fieldIsMissing(this.locality) || fieldIsMissing(this.administrativeArea)) throw new UnprocessableEntityError(messages.insufficientInformation);

		return true;
	}

	ensureValidData() {
		let languageIsSetIncorrectly = () => {
			let isLanguage = language => this.language.toLowerCase() === language;

			return fieldIsSet(this.language) && !(isLanguage("latin") || isLanguage("native"));
		};

		let geocodeIsSetIncorrectly = () => {
			return fieldIsSet(this.geocode) && this.geocode.toLowerCase() !== "true";
		};

		if (geocodeIsSetIncorrectly()) throw new UnprocessableEntityError(messages.badGeocode);

		if (languageIsSetIncorrectly()) throw new UnprocessableEntityError(messages.invalidLanguage);

		return true;
	}
}

function fieldIsMissing (field) {
	if (!field) return true;

	const whitespaceCharacters = /\s/g;

	return field.replace(whitespaceCharacters, "").length < 1;
}

function fieldIsSet (field) {
	return !fieldIsMissing(field);
}

module.exports = Lookup;