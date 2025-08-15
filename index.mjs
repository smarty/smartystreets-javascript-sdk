/**
 * this files is the entry point for rollup to bundle the library
 * it exports all the classes and functions as named exports
 */
import Batch from "./src/Batch";
import ClientBuilder from "./src/ClientBuilder";
import buildClient from "./src/util/buildClients";
import SharedCredentials from "./src/SharedCredentials";
import StaticCredentials from "./src/StaticCredentials";
import * as Errors from "./src/Errors";

import LookupUSStreet from "./src/us_street/Lookup";
import CandidateUSStreet from "./src/us_street/Candidate";

import LookupUSZipcode from "./src/us_zipcode/Lookup";
import ResultUSZipcode from "./src/us_zipcode/Result";

import LookupUSAutocompletePro from "./src/us_autocomplete_pro/Lookup";
import SuggestionUSAutocompletePro from "./src/us_autocomplete_pro/Suggestion";

import LookupUSExtract from "./src/us_extract/Lookup";
import ResultUSExtract from "./src/us_extract/Result";

import LookupInternationalStreet from "./src/international_street/Lookup";
import CandidateInternationalStreet from "./src/international_street/Candidate";

import LookupUSReverseGeo from "./src/us_reverse_geo/Lookup";

import LookupInternationalAddressAutocomplete from "./src/international_address_autocomplete/Lookup";
import SuggestionInternationalAddressAutocomplete from "./src/international_address_autocomplete/Suggestion";

import LookupUSEnrichment from "./src/us_enrichment/Lookup";
import ResponseUSEnrichment from "./src/us_enrichment/Response";

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
