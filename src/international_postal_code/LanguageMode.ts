import { UnprocessableEntityError } from "../Errors.js";

export enum LanguageMode {
	Native = "native",
	Latin = "latin",
}

const messages = {
	invalidLanguage:
		"Invalid input: language can only be set to 'latin' or 'native'. When not set, the output language will match the default for the country.",
};

// Resolves a LanguageMode member or a raw value (eg. from untyped JS callers) into a LanguageMode,
// matching "native"/"latin" regardless of case. Returns undefined for unset/empty input.
export function resolveLanguageMode(
	value: LanguageMode | string | undefined,
): LanguageMode | undefined {
	if (value === undefined || String(value).trim().length < 1) return undefined;

	const match = Object.values(LanguageMode).find(
		(mode) => mode.toLowerCase() === String(value).toLowerCase(),
	);

	if (!match) throw new UnprocessableEntityError(messages.invalidLanguage);

	return match;
}
