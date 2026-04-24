/**
 * this files is the entry point for rollup to bundle the library
 * it exports all the classes and functions as named exports
 */
import Batch from "./src/Batch.js";
import ClientBuilder from "./src/ClientBuilder.js";
import buildClient from "./src/util/buildClients.js";
import SharedCredentials from "./src/SharedCredentials.js";
import StaticCredentials from "./src/StaticCredentials.js";
import BasicAuthCredentials from "./src/BasicAuthCredentials.js";
import Errors from "./src/Errors.js";

import LookupUSStreet from "./src/us_street/Lookup.js";
import CandidateUSStreet from "./src/us_street/Candidate.js";

import LookupUSZipcode from "./src/us_zipcode/Lookup.js";
import ResultUSZipcode from "./src/us_zipcode/Result.js";

import LookupUSAutocompletePro from "./src/us_autocomplete_pro/Lookup.js";
import SuggestionUSAutocompletePro from "./src/us_autocomplete_pro/Suggestion.js";

import LookupUSExtract from "./src/us_extract/Lookup.js";
import ResultUSExtract from "./src/us_extract/Result.js";

import LookupInternationalStreet from "./src/international_street/Lookup.js";
import CandidateInternationalStreet from "./src/international_street/Candidate.js";

import LookupUSReverseGeo from "./src/us_reverse_geo/Lookup.js";

import LookupInternationalAddressAutocomplete from "./src/international_address_autocomplete/Lookup.js";
import SuggestionInternationalAddressAutocomplete from "./src/international_address_autocomplete/Suggestion.js";

import LookupUSEnrichment from "./src/us_enrichment/Lookup.js";
import ResponseUSEnrichment from "./src/us_enrichment/Response.js";
import SecondaryResponse, {
	RootAddress,
	Alias,
	SecondaryEntry,
} from "./src/us_enrichment/secondary/SecondaryResponse.js";
import SecondaryCountResponse from "./src/us_enrichment/secondary/SecondaryCountResponse.js";
import BusinessSummaryLookup from "./src/us_enrichment/business/SummaryLookup.js";
import BusinessSummaryResult, {
	BusinessEntry,
} from "./src/us_enrichment/business/SummaryResult.js";
import BusinessDetailLookup from "./src/us_enrichment/business/DetailLookup.js";
import BusinessDetailResult from "./src/us_enrichment/business/DetailResult.js";
import BusinessDetailAttributes from "./src/us_enrichment/business/DetailAttributes.js";

import LookupInternationalPostalCode from "./src/international_postal_code/Lookup.js";
import ResultInternationalPostalCode from "./src/international_postal_code/Result.js";

export type { Request, Response, Sender, Sleeper, Signer } from "./src/types.js";
export { SmartyError, NotModifiedError } from "./src/Errors.js";
export type { MatchStrategy, OutputFormat, CountySource } from "./src/us_street/Lookup.js";
export type { CoordinateLicense, MatchInfo } from "./src/us_street/Candidate.js";
export type { Geolocation } from "./src/us_autocomplete_pro/Lookup.js";
export type { Language, Geocode } from "./src/international_street/Lookup.js";

export {
	Batch,
	ClientBuilder,
	buildClient,
	SharedCredentials,
	StaticCredentials,
	BasicAuthCredentials,
	Errors,
	LookupUSStreet,
	CandidateUSStreet,
	LookupUSZipcode,
	ResultUSZipcode,
	LookupUSAutocompletePro,
	SuggestionUSAutocompletePro,
	LookupUSExtract,
	ResultUSExtract,
	LookupInternationalStreet,
	CandidateInternationalStreet,
	LookupUSReverseGeo,
	LookupInternationalAddressAutocomplete,
	SuggestionInternationalAddressAutocomplete,
	LookupUSEnrichment,
	ResponseUSEnrichment,
	SecondaryResponse,
	SecondaryCountResponse,
	RootAddress,
	Alias,
	SecondaryEntry,
	BusinessSummaryLookup,
	BusinessSummaryResult,
	BusinessEntry,
	BusinessDetailLookup,
	BusinessDetailResult,
	BusinessDetailAttributes,
	LookupInternationalPostalCode,
	ResultInternationalPostalCode,
};

export const core = {
	Batch,
	ClientBuilder,
	buildClient,
	SharedCredentials,
	StaticCredentials,
	BasicAuthCredentials,
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
	SecondaryResponse,
	SecondaryCountResponse,
	RootAddress,
	Alias,
	SecondaryEntry,
	BusinessSummaryLookup,
	BusinessSummaryResult,
	BusinessEntry,
	BusinessDetailLookup,
	BusinessDetailResult,
	BusinessDetailAttributes,
};

export const internationalPostalCode = {
	Lookup: LookupInternationalPostalCode,
	Result: ResultInternationalPostalCode,
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
	internationalPostalCode,
};
