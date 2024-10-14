import { UndefinedLookupError } from "../Errors.js";
import { buildInputData } from "../util/buildInputData.js";
import { Suggestion } from "./Suggestion.js";
import { apiToSDKKeyMap } from "../util/apiToSDKKeyMap.js";
import { Request } from "../Request.js";

export class Client {
  constructor(sender) {
    this.sender = sender;
  }

  send(lookup) {
    if (typeof lookup === "undefined") throw new UndefinedLookupError();

    let request = new Request();
    request.parameters = buildInputData(
      lookup,
      apiToSDKKeyMap.internationalAddressAutocomplete,
    );

    if (lookup.addressId) {
      request.baseUrlParam = lookup.addressId;
    }

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
      if (payload && payload.candidates === null) return [];

      return payload.candidates.map((suggestion) => new Suggestion(suggestion));
    }
  }
}
