const Errors = require("../Errors");
const Request = require("../Request");
const buildInputData = require("../util/buildInputData");
const {usEnrichment: keyTranslationFormat} = require("../util/apiToSDKKeyMap");

class Client {
    constructor(sender) {
        this.sender = sender;
    }

    sendPrincipal(lookup) {
        if (typeof lookup === "undefined") throw new Errors.UndefinedLookupError();

        let request = new Request();
        request.parameters = buildInputData(lookup, keyTranslationFormat);

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
        if (typeof lookup === "undefined") throw new Errors.UndefinedLookupError();

        let request = new Request();
        request.parameters = buildInputData(lookup, keyTranslationFormat);

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
        if (typeof lookup === "undefined") throw new Errors.UndefinedLookupError();

        let request = new Request();
        request.parameters = buildInputData(lookup, keyTranslationFormat);

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
}

module.exports = Client;