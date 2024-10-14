import { UndefinedLookupError } from "../Errors.js";
import { buildInputData } from "../util/buildInputData.js";
import { apiToSDKKeyMap } from "../util/apiToSDKKeyMap.js";
import { Suggestion } from "./Suggestion.js";
import { Request } from "../Request.js";

/**
 * This client sends lookups to the Smarty US Autocomplete Pro API, <br>
 *     and attaches the suggestions to the appropriate Lookup objects.
 */
export class Client {
  constructor(sender) {
    this.sender = sender;
  }

  send(lookup) {
    if (typeof lookup === "undefined") throw new UndefinedLookupError();

    let request = new Request();
    request.parameters = buildInputData(
      lookup,
      apiToSDKKeyMap.usAutocompletePro,
    );

    return new Promise((resolve, reject) => {
      this.sender
        .send(request)
        .then((response) => {
          if (response.error) reject(response.error);

          lookup.result = buildSuggestionsFromResponse(response.payload);
          resolve(lookup);
        })
        .catch(reject);
    });

    function buildSuggestionsFromResponse(payload) {
      if (payload.suggestions === null) return [];

      return payload.suggestions.map(
        (suggestion) => new Suggestion(suggestion),
      );
    }
  }
}
