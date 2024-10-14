import { UndefinedLookupError } from "../Errors.js";
import { Candidate } from "./Candidate.js";
import { buildInputData } from "../util/buildInputData.js";
import { apiToSDKKeyMap } from "../util/apiToSDKKeyMap.js";
import { Request } from "../Request.js";

/**
 * This client sends lookups to the Smarty International Street API, <br>
 *     and attaches the results to the appropriate Lookup objects.
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
      apiToSDKKeyMap.internationalStreet,
    );

    return new Promise((resolve, reject) => {
      this.sender
        .send(request)
        .then((response) => {
          if (response.error) reject(response.error);

          resolve(attachLookupCandidates(response, lookup));
        })
        .catch(reject);
    });

    function attachLookupCandidates(response, lookup) {
      response.payload.map((rawCandidate) => {
        lookup.result.push(new Candidate(rawCandidate));
      });

      return lookup;
    }
  }
}
