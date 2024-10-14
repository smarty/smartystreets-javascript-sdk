/**
 * this file is the entry point for rollup to bundle the library
 * it exports all the classes and functions as named exports
 */
import {Batch} from "./src/Batch.js";
import {ClientBuilder} from "./src/ClientBuilder.js";
import * as buildClient from "./src/util/buildClients.js";
import {SharedCredentials} from "./src/SharedCredentials.js";
import {StaticCredentials} from "./src/StaticCredentials.js";
import * as Errors from "./src/Errors.js";

import {Lookup as LookupUSStreet} from "./src/us_street/Lookup.js";
import {Candidate as CandidateUSStreet} from "./src/us_street/Candidate.js";

import {Lookup as LookupUSZipcode} from "./src/us_zipcode/Lookup.js";
import {Result as ResultUSZipcode} from "./src/us_zipcode/Result.js";

import {Lookup as LookupUSAutocompletePro} from "./src/us_autocomplete_pro/Lookup.js";
import {Suggestion as SuggestionUSAutocompletePro} from "./src/us_autocomplete_pro/Suggestion.js";

import {Lookup as LookupUSExtract} from "./src/us_extract/Lookup.js";
import {Result as ResultUSExtract} from "./src/us_extract/Result.js";

import {Lookup as LookupInternationalStreet} from "./src/international_street/Lookup.js";
import {Candidate as CandidateInternationalStreet} from "./src/international_street/Candidate.js";

import {Lookup as LookupUSReverseGeo} from "./src/us_reverse_geo/Lookup.js";

import {Lookup as LookupInternationalAddressAutocomplete} from "./src/international_address_autocomplete/Lookup.js";
import {Suggestion as SuggestionInternationalAddressAutocomplete} from "./src/international_address_autocomplete/Suggestion.js";

import {Lookup as LookupUSEnrichment} from "./src/us_enrichment/Lookup.js";
import {Response as ResponseUSEnrichment} from "./src/us_enrichment/Response.js";

export const core = {
    Batch,
    ClientBuilder,
    buildClient,
    SharedCredentials,
    StaticCredentials,
    Errors,
};

export const usStreet = {
    Lookup: LookupUSStreet,
    Candidate: CandidateUSStreet,
};

export const usZipcode = {
    Lookup: LookupUSZipcode,
    Result: ResultUSZipcode,
};

export const usAutocompletePro = {
    Lookup: LookupUSAutocompletePro,
    Suggestion: SuggestionUSAutocompletePro,
};

export const usExtract = {
    Lookup: LookupUSExtract,
    Result: ResultUSExtract,
};

export const internationalStreet = {
    Lookup: LookupInternationalStreet,
    Candidate: CandidateInternationalStreet,
};

export const usReverseGeo = {
    Lookup: LookupUSReverseGeo,
};

export const internationalAddressAutocomplete = {
    Lookup: LookupInternationalAddressAutocomplete,
    Suggestion: SuggestionInternationalAddressAutocomplete,
};

export const usEnrichment = {
    Lookup: LookupUSEnrichment,
    Response: ResponseUSEnrichment,
};

export default {
    core,
    usStreet,
    usZipcode,
    usAutocompletePro,
    usExtract,
    internationalStreet,
    usReverseGeo,
    internationalAddressAutocomplete,
    usEnrichment,
};
