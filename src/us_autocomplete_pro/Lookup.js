/**
 * In addition to holding all of the input data for this lookup, this class also<br>
 *     will contain the result of the lookup after it comes back from the API.
 *     @see "https://www.smarty.com/docs/cloud/us-autocomplete-api#pro-http-request-input-fields"
 */
export class Lookup {
	/**
	 * @param search The beginning of an address. This is required to be set.
	 */
	constructor(search) {
		this.result = [];

		this.search = search;
		this.selected = undefined;
		this.maxResults = undefined;
		this.includeOnlyCities = [];
		this.includeOnlyStates = [];
		this.includeOnlyZIPCodes = [];
		this.excludeStates = [];
		this.preferCities = [];
		this.preferStates = [];
		this.preferZIPCodes = [];
		this.preferRatio = undefined;
		this.preferGeolocation = undefined;
		this.source = undefined
	}
}
