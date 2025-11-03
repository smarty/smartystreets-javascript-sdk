/**
 * In addition to holding all of the input data for this lookup, this class also<br>
 *     will contain the result of the lookup after it comes back from the API.
 *     @see "https://www.smarty.com/docs/cloud/international-postal-code-api#http-request-input-fields"
 */
class Lookup {
	constructor(country, postalCode, administrativeArea, locality, inputId) {
		this.inputId = inputId;
		this.country = country;
		this.postalCode = postalCode;
		this.administrativeArea = administrativeArea;
		this.locality = locality;
		this.result = [];
		this.customParameters = {};
	}

	addCustomParameter(key, value) {
		this.customParameters[key] = value;
	}
}

module.exports = Lookup;
