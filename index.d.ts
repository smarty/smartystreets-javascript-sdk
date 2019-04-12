// Type definitions for smartystreets-javascript-sdk 1.1.8
// Project: smartystreets-javascript-sdk
// Definitions by:
//   - Matthew Alsup alsupmn@gmail.com

export namespace core {
    /**
     * This class contains a collection of up to 100 lookups to be sent to one of the SmartyStreets APIs<br>
     *     all at once. This is more efficient than sending them one at a time.
     */
    export class Batch<T> {
        lookups: T[];

        constructor();

        add(lookup: T): void;

        lookupsHasRoomForLookup(): boolean;

        length(): number;

        getByIndex(index: number): T;

        getByInputId(inputId: string): T;

        /**
         * Clears the lookups stored in the batch so it can be used again.<br>
         *     This helps avoid the overhead of building a new Batch object for each group of lookups.
         */
        clear(): void;

        isEmpty(): boolean;
    }

    class BaseUrlSender {
        constructor(innerSender: any, urlOverride: string);

        send(request: any): Promise<void>;
    }

    /**
     * The ClientBuilder class helps you build a client object for one of the supported SmartyStreets APIs.<br>
     * You can use ClientBuilder's methods to customize settings like maximum retries or timeout duration. These methods<br>
     * are chainable, so you can usually get set up with one line of code.
     */
    export class ClientBuilder {
        signer: any;
        httpSender: any;
        maxRetries: number;
        maxTimeout: number;
        baseUrl: string;
        proxy: any;
        customHeaders: any;
        debug: boolean;
        constructor(signer: any);

        /**
         * @param retries The maximum number of times to retry sending the request to the API. (Default is 5)
         * @return Returns <b>this</b> to accommodate method chaining.
         */
        withMaxRetries(retries: number): ClientBuilder;

        /**
         * @param timeout The maximum time (in milliseconds) to wait for a connection, and also to wait for <br>
         *                   the response to be read. (Default is 10000)
         * @return Returns <b>this</b> to accommodate method chaining.
         */
        withMaxTimeout(timeout: number): ClientBuilder;

        /**
         * @param sender Default is a series of nested senders. See <b>buildSender()</b>.
         * @return Returns <b>this</b> to accommodate method chaining.
         */
        withSender(sender: any): ClientBuilder;

        /**
         * This may be useful when using a local installation of the SmartyStreets APIs.
         * @param url Defaults to the URL for the API corresponding to the <b>Client</b> object being built.
         * @return Returns <b>this</b> to accommodate method chaining.
         */
        withBaseUrl(url: string): ClientBuilder;

        /**
         * Use this to specify a proxy through which to send all lookups.
         * @param host The host of the proxy server (do not include the port).
         * @param port The port on the proxy server to which you wish to connect.
         * @param username The username to login to the proxy.
         * @param password The password to login to the proxy.
         * @return Returns <b>this</b> to accommodate method chaining.
         */
        withProxy(host: string, port: number, username: string, password: string): ClientBuilder;

        /**
         * Use this to add any additional headers you need.
         * @param customHeaders A String to Object <b>Map</b> of header name/value pairs.
         * @return Returns <b>this</b> to accommodate method chaining.
         */
        withCustomHeaders(customHeaders: any): ClientBuilder;

        /**
         * Enables debug mode, which will print information about the HTTP request and response to console log
         * @return Returns <b>this</b> to accommodate method chaining.
         */
        withDebug(): ClientBuilder;


        buildSender(): BaseUrlSender;

        buildClient(baseUrl: any, Client: any): any;

        buildUsStreetApiClient(): usStreet.Client;

        buildUsZipcodeClient(): usZipcode.Client;

        buildUsAutocompleteClient(): usAutocomplete.Client;

        buildUsExtractClient(): usExtract.Client;

        buildInternationalStreetClient(): internationalStreet.Client;
    }

    export class SharedCredentials {
        authId: string;
        hostName: string;
        constructor(authId: string, hostName: string);

        sign(request: any): void;
    }

    export class StaticCredentials {
        authId: string;
        hostName: string;
        constructor(authId: string, hostName: string);

        sign(request: any): void;
    }

    export namespace Errors {

        export class SmartyError extends Error {
            constructor(message: string);
        }

        export class BatchFullError extends SmartyError {
            constructor();
        }

        export class BatchEmptyError extends SmartyError {
            constructor();
        }

        export class UndefinedLookupError extends SmartyError {
            constructor();
        }

        export class BadCredentialsError extends SmartyError {
            constructor();
        }

        export class PaymentRequiredError extends SmartyError {
            constructor();
        }

        export class RequestEntityTooLargeError extends SmartyError {
            constructor();
        }

        export class BadRequestError extends SmartyError {
            constructor();
        }

        export class UnprocessableEntityError extends SmartyError {
            constructor(message: string);
        }

        export class TooManyRequestsError extends SmartyError {
            constructor();
        }

        export class InternalServerError extends SmartyError {
            constructor();
        }

        export class ServiceUnavailableError extends SmartyError {
            constructor();
        }

        export class GatewayTimeoutError extends SmartyError {
            constructor();
        }
    }
}

export namespace usStreet {
    export interface IAnalysis {
        dpv_match_code: string;
        dpv_footnotes: string;
        cmra: string;
        vacant: string;
        active: string;
        footnotes: string;
        isEwsMatch: boolean;
        lacsLinkCode: string;
        lacsLinkIndicator: any;
        isSuiteLinkMatch: any;
    }
    export interface IComponents {
        urbanization: string;
        primaryNumber: string;
        streetName: string;
        streetPredirection: string;
        streetPostdirection: string;
        streetSuffix: string;
        secondaryNumber: string;
        secondaryDesignator: string;
        extraSecondaryNumber: string;
        extraSecondaryDesignator: string;
        pmbDesignator: string;
        pmbNumber: string;
        cityName: string;
        defaultCityName: string;
        state: string;
        zipCode: string;
        plus4Code: string;
        deliveryPoint: string;
        deliveryPointCheckDigit: string;
    }
    export interface IMetadata {
        recordType: string;
        zipType: string;
        countyFips: string;
        countyName: string;
        carrierRoute: string;
        congressionalDistrict: string;
        buildingDefaultIndicator: string;
        rdi: string;
        elotSequence: string;
        elotSort: string;
        latitude: number;
        longitude: number;
        precision: string,
        timeZone: string;
        utcOffset: number;
        obeysDst: boolean;
    }
    /**
     * A candidate is a possible match for an address that was submitted.<br>
     *     A lookup can have multiple candidates if the address was ambiguous, and<br>
     *     the maxCandidates field is set higher than 1.
     *
     * @see "https://smartystreets.com/docs/cloud/us-street-api#root"
     */
    export class Candidate {
        inputIndex: string;
        input_index: number;
        candidateIndex: number;
        deliveryPointBarcode: string;
        addressee: string;
        deliveryLine1: string;
        deliveryLine2: string;
        lastLine: string;
        components: IComponents;
        metadata: IMetadata;
        analysis: IAnalysis;
        constructor(responseData: object);
    }

    /**
     * This client sends lookups to the SmartyStreets US Street API, <br>
     *     and attaches the results to the appropriate Lookup objects.
     */
    export class Client {
        sender: any;
        constructor(sender: any);

        /**
         * Sends up to 100 lookups for validation.
         * @param data May be a Lookup object, or a Batch which must contain between 1 and 100 Lookup objects
         * @throws SmartyException
         */
        send(data: core.Batch<Lookup>): core.Batch<Lookup>;
        send(data: Lookup): core.Batch<Lookup>;
    }
    /**
     * In addition to holding all of the input data for this lookup, this class also<br>
     *     will contain the result of the lookup after it comes back from the API.
     *     @see "https://smartystreets.com/docs/cloud/us-street-api#input-fields"
     *     @property { string } street - The street line of the address, or the entire address ("freeform" input). Freeform inputs should NOT include any form of country information (like "USA").
     *     @property { string } street2 - Any extra address information (e.g., Leave it on the front porch.)
     *     @property { string } secondary - Apartment, suite, or office number (e.g., "Apt 52" or simply "52"; not "Apt52".)
     *     @property { string } city
     *     @property { string } state
     *     @property { string } zipCode
     *     @property { string } lastLine
     *     @property { string } addressee
     *     @property { string } urbanization
     *     @property { string } match - The match output strategy to be employed for this lookup. Valid values are: strict | range | invalid
     *     @property { number } maxCandidates
     *     @property { string } inputId
     *     @property { Candidate[] } result
     */
    export class Lookup {
        street: string;
        street2: string;
        secondary: string;
        city: string;
        state: string;
        zipCode: string;
        lastLine: string;
        addressee: string;
        urbanization: string;
        match: string;
        maxCandidates: number;
        inputId: string;
        result: Candidate[];
        /* Creates a new USStreetLookup */
        constructor(street: string, street2: string, secondary: string,
            city: string, state: string, zipCode: string,
            lastLine: string, addressee: string, urbanization: string,
            match: string, maxCandidates: number, inputId: string);
        constructor();
    }
}
export namespace usZipcode {
    export interface ICity {
        city: string;
        stateAbbreviation: string;
        state: string;
        mailableCity: boolean;
    }
    export interface IZipcode {
        zipcode: string;
        zipcodeType: string;
        defaultCity: string;
        countyFips: string;
        countyName: string;
        latitude: string;
        longitude: string;
        precision: string;
        stateAbbreviation: string;
        state: string;
        alternateCounties: Array<IAlternateCounties>;
    }
    export interface IAlternateCounties {
        countyFips: string;
        countyName: string;
        stateAbbreviation: string;
        state: string;
    }
    /**
    * @see "https://smartystreets.com/docs/cloud/us-zipcode-api#root"
    */
    export class Result {
        inputText: string;
        status: string;
        reason: string;
        valid: boolean;
        cities: Array<ICity>;
        zipcodes: Array<IZipcode>
        constructor(responseData: object);
    }
    /**
     * This client sends lookups to the SmartyStreets US Street API, <br>
     *     and attaches the results to the appropriate Lookup objects.
     */
    export class Client {
        sender: any;
        constructor(sender: any);

        /**
         * Sends up to 100 lookups for validation.
         * @param data May be a Lookup object, or a Batch which must contain between 1 and 100 Lookup objects
         * @throws SmartyException
         */
        send(data: core.Batch<Lookup>): core.Batch<Lookup>;
        send(data: Lookup): core.Batch<Lookup>;
    }
    /**
    * In addition to holding all of the input data for this lookup, this class also<br>
    *     will contain the result of the lookup after it comes back from the API.
    *     @see "https://smartystreets.com/docs/cloud/us-zipcode-api#http-request-input-fields"
    */
    export class Lookup {
        city: string;
        state: string;
        zipCode: string;
        inputId: string;
        result: Array<Result>;
        constructor(city: string, state: string, zipCode: string, inputId: string);
        constructor();
    }
}
export namespace usAutocomplete {
    /**
     * This client sends lookups to the SmartyStreets US Street API, <br>
     *     and attaches the results to the appropriate Lookup objects.
     */
    export class Client {
        sender: any;
        constructor(sender: any);

        /**
         * Sends up to 100 lookups for validation.
         * @param data May be a Lookup object, or a Batch which must contain between 1 and 100 Lookup objects
         * @throws SmartyException
         */
        send(data: core.Batch<Lookup>): core.Batch<Lookup>;
        send(data: Lookup): core.Batch<Lookup>;
    }
    /**
    * In addition to holding all of the input data for this lookup, this class also<br>
    *     will contain the result of the lookup after it comes back from the API.
    *     @see "https://smartystreets.com/docs/cloud/us-autocomplete-api#http-request-input-fields"
    */
    export class Lookup {
        result: string;
        prefix: string;
        maxSuggestions: string;
        cityFilter: string;
        stateFilter: string;
        prefer: string;
        preferRatio: string;
        geolocate: string;
        geolocatePrecision: string;
        /**
         * @param prefix The beginning of an address. This is required to be set.
         */
        constructor(prefix: string);
    }
}
export namespace usExtract {
    /**
     * This client sends lookups to the SmartyStreets US Street API, <br>
     *     and attaches the results to the appropriate Lookup objects.
     */
    export class Client {
        sender: any;
        constructor(sender: any);

        /**
         * Sends up to 100 lookups for validation.
         * @param data May be a Lookup object, or a Batch which must contain between 1 and 100 Lookup objects
         * @throws SmartyException
         */
        send(data: core.Batch<Lookup>): core.Batch<Lookup>;
        send(data: Lookup): core.Batch<Lookup>;
    }
    export interface ILookupResult {
        meta: any;
        addresses: any[];
    }
    /**
     * In addition to holding all of the input data for this lookup, this class also<br>
     *     will contain the result of the lookup after it comes back from the API.
     *     @see "https://smartystreets.com/docs/cloud/us-extract-api#http-request-input-fields"
     */
    export class Lookup {
        result: ILookupResult;
        text: string;
        html: string;
        aggressive: boolean;
        addressesHaveLineBreaks: boolean;
        addressesPerLine: boolean;
        /**
         * @param text The text that is to have addresses extracted out of it for verification (required)
         */
        constructor(text: string);
    }
}
export namespace internationalStreet {
    /**
     * This client sends lookups to the SmartyStreets US Street API, <br>
     *     and attaches the results to the appropriate Lookup objects.
     */
    export class Client {
        sender: any;
        constructor(sender: any);

        /**
         * Sends up to 100 lookups for validation.
         * @param data May be a Lookup object, or a Batch which must contain between 1 and 100 Lookup objects
         * @throws SmartyException
         */
        send(data: core.Batch<Lookup>): core.Batch<Lookup>;
        send(data: Lookup): core.Batch<Lookup>;
    }
    /**
     * In addition to holding all of the input data for this lookup, this class also<br>
     *     will contain the result of the lookup after it comes back from the API.
     *     <p><b>Note: </b><i>Lookups must have certain required fields set with non-blank values. <br>
     *         These can be found at the URL below.</i></p>
     *     @see "https://smartystreets.com/docs/cloud/international-street-api#http-input-fields"
     */
    export class Lookup {
        result: any[];
        country: string;
        freeform: boolean;
        address1: string;
        address2: string;
        address3: string;
        address4: string;
        organization: string;
        locality: string;
        administrativeArea: string;
        postalCode: string;
        geocode: string;
        language: string;
        inputId: string;
        constructor(country: string, freeform: boolean);

        ensureEnoughInfo(): boolean;

        ensureValidData(): boolean;
    }
}