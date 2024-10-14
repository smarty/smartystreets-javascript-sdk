import {apiToSDKKeyMap} from "../util/apiToSDKKeyMap.js";
import {buildInputData} from "../util/buildInputData.js";
import {UndefinedLookupError} from "../Errors.js";
import { Request} from "../Request.js";

export class Client {
    constructor(sender) {
        this.sender = sender;
    }

    sendPrincipal(lookup) {
        if (typeof lookup === "undefined") throw new UndefinedLookupError();

        let request = new Request();
        request.parameters = buildInputData(lookup, apiToSDKKeyMap.usEnrichment);

        request.baseUrlParam = lookup.smartyKey + "/property/principal";

        return new Promise((resolve, reject) => {
            this.sender.send(request)
                .then(response => {
                    if (response.error) reject(response.error);

                    lookup.response = response.payload;
                    resolve(lookup);
                })
                .catch(reject);
        });
    }

    sendFinancial(lookup) {
        if (typeof lookup === "undefined") throw new UndefinedLookupError();

        let request = new Request();
        request.parameters = buildInputData(lookup, apiToSDKKeyMap.usEnrichment);

        request.baseUrlParam = lookup.smartyKey + "/property/financial";

        return new Promise((resolve, reject) => {
            this.sender.send(request)
                .then(response => {
                    if (response.error) reject(response.error);

                    lookup.response = response.payload;
                    resolve(lookup);
                })
                .catch(reject);
        });
    }

    sendGeo(lookup) {
        if (typeof lookup === "undefined") throw new UndefinedLookupError();

        let request = new Request();
        request.parameters = buildInputData(lookup, apiToSDKKeyMap.usEnrichment);

        request.baseUrlParam = lookup.smartyKey + "/geo-reference";

        return new Promise((resolve, reject) => {
            this.sender.send(request)
                .then(response => {
                    if (response.error) reject(response.error);

                    lookup.response = response.payload;
                    resolve(lookup);
                })
                .catch(reject);
        });
    }

    sendSecondary(lookup) {
        if (typeof lookup === "undefined") throw new UndefinedLookupError();

        let request = new Request();
        request.parameters = buildInputData(lookup, apiToSDKKeyMap.usEnrichment);

        request.baseUrlParam = lookup.smartyKey + "/secondary";

        return new Promise((resolve, reject) => {
            this.sender.send(request)
                .then(response => {
                    if (response.error) reject(response.error);

                    lookup.response = response.payload;
                    resolve(lookup);
                })
                .catch(reject);
        });
    }

    sendSecondaryCount(lookup) {
        if (typeof lookup === "undefined") throw new UndefinedLookupError();

        let request = new Request();
        request.parameters = buildInputData(lookup, apiToSDKKeyMap.usEnrichment);

        request.baseUrlParam = lookup.smartyKey + "/secondary/count";

        return new Promise((resolve, reject) => {
            this.sender.send(request)
                .then(response => {
                    if (response.error) reject(response.error);

                    lookup.response = response.payload;
                    resolve(lookup);
                })
                .catch(reject);
        });
    }
}
