import Candidate from "./Candidate.js";
import { UnprocessableEntityError } from "../Errors.js";

export type Language = "native" | "latin" | (string & {});
export type Geocode = "true" | (string & {});

const messages = {
	countryRequired: "Country field is required.",
	freeformOrAddress1Required: "Either freeform or address1 is required.",
	badGeocode: "Invalid input: geocode can only be set to 'true' (default is 'false'.",
	invalidLanguage:
		"Invalid input: language can only be set to 'latin' or 'native'. When not set, the the output language will match the language of the input values.",
};

function fieldIsMissing(field: string | undefined): boolean {
	if (!field) return true;

	const whitespaceCharacters = /\s/g;

	return field.replace(whitespaceCharacters, "").length < 1;
}

function fieldIsSet(field: string | undefined): boolean {
	return !fieldIsMissing(field);
}

export default class Lookup {
	result: Candidate[];
	country: string | undefined;
	freeform: string | undefined;
	address1: string | undefined;
	address2: string | undefined;
	address3: string | undefined;
	address4: string | undefined;
	organization: string | undefined;
	locality: string | undefined;
	administrativeArea: string | undefined;
	postalCode: string | undefined;
	geocode: Geocode | undefined;
	language: Language | undefined;
	inputId: string | undefined;
	customParameters: Record<string, string>;

	constructor(country?: string, freeform?: string) {
		this.result = [];

		this.country = country;
		this.freeform = freeform;
		this.address1 = undefined;
		this.address2 = undefined;
		this.address3 = undefined;
		this.address4 = undefined;
		this.organization = undefined;
		this.locality = undefined;
		this.administrativeArea = undefined;
		this.postalCode = undefined;
		this.geocode = undefined;
		this.language = undefined;
		this.inputId = undefined;

		this.ensureEnoughInfo = this.ensureEnoughInfo.bind(this);
		this.ensureValidData = this.ensureValidData.bind(this);
		this.customParameters = {};
	}

	addCustomParameter(key: string, value: string): void {
		this.customParameters[key] = value;
	}

	ensureEnoughInfo(): boolean {
		if (fieldIsMissing(this.country)) throw new UnprocessableEntityError(messages.countryRequired);

		if (fieldIsMissing(this.freeform) && fieldIsMissing(this.address1))
			throw new UnprocessableEntityError(messages.freeformOrAddress1Required);

		return true;
	}

	ensureValidData(): boolean {
		const languageIsSetIncorrectly = () => {
			const isLanguage = (language: string) => this.language!.toLowerCase() === language;

			return fieldIsSet(this.language) && !(isLanguage("latin") || isLanguage("native"));
		};

		const geocodeIsSetIncorrectly = () => {
			return fieldIsSet(this.geocode) && this.geocode!.toLowerCase() !== "true";
		};

		if (geocodeIsSetIncorrectly()) throw new UnprocessableEntityError(messages.badGeocode);

		if (languageIsSetIncorrectly()) throw new UnprocessableEntityError(messages.invalidLanguage);

		return true;
	}
}
