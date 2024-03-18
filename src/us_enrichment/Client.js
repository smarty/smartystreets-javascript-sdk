const Errors = require("../Errors");
const Request = require("../Request");
const buildInputData = require("../util/buildInputData");
const {usEnrichment: keyTranslationFormat} = require("../util/apiToSDKKeyMap");
const {Response, FinancialResponse, GeoResponse} = require("./Response.js");

class Client {
    constructor(sender) {
        this.sender = sender;
    }

    sendPrincipal(lookup) {
        if (typeof lookup === "undefined") throw new Errors.UndefinedLookupError();

        let request = new Request();
        request.parameters = buildInputData(lookup, keyTranslationFormat);

        if (lookup.smartyKey) {
            request.baseUrlParam = lookup.smartyKey;
        }

        request.baseUrlParam = "property/principal";

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
        if (typeof lookup === "undefined") throw new Errors.UndefinedLookupError();

        let request = new Request();
        request.parameters = buildInputData(lookup, keyTranslationFormat);

        if (lookup.smartyKey) {
            request.baseUrlParam = lookup.smartyKey;
        }

        request.baseUrlParam = "property/financial";

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
        if (typeof lookup === "undefined") throw new Errors.UndefinedLookupError();

        let request = new Request();
        request.parameters = buildInputData(lookup, keyTranslationFormat);

        if (lookup.smartyKey) {
            request.baseUrlParam = lookup.smartyKey;
        }

        request.baseUrlParam = "geo-reference";

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

module.exports = Client;