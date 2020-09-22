/**
 * A candidate is a possible match for an address that was submitted.<br>
 *     A lookup can have multiple candidates if the address was ambiguous, and<br>
 *     the maxCandidates field is set higher than 1.
 *
 * @see "https://smartystreets.com/docs/cloud/us-street-api#root"
 */
class SmartyResponse {
	constructor(responseData) {
		this.results = responseData.results;
	}
}

module.exports = SmartyResponse;