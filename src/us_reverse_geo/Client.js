import { UndefinedLookupError } from "../Errors.js";
import { buildInputData } from "../util/buildInputData.js";
import { apiToSDKKeyMap } from "../util/apiToSDKKeyMap.js";
import { Request } from "../Request.js";
import { Response } from "./Response.js";

/**
 * This client sends lookups to the Smarty US Reverse Geo API, <br>
 *     and attaches the results to the appropriate Lookup objects.
 */
export class Client {
  constructor(sender) {
    this.sender = sender;
  }

  send(lookup) {
    if (typeof lookup === "undefined") throw new UndefinedLookupError();

    let request = new Request();
    request.parameters = buildInputData(lookup, apiToSDKKeyMap.usReverseGeo);

    return new Promise((resolve, reject) => {
      this.sender
        .send(request)
        .then((response) => {
          if (response.error) reject(response.error);

          resolve(attachLookupResults(response, lookup));
        })
        .catch(reject);
    });

    function attachLookupResults(response, lookup) {
      lookup.response = new Response(response.payload);

      return lookup;
    }
  }
}
