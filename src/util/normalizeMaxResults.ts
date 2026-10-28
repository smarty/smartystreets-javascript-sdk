import { UnprocessableEntityError } from "../Errors.js";

const WHOLE_NUMBER = /^\s*[+-]?\d+\s*$/;

// Shared handling for the max_results input: accepts a whole number (or a string holding one),
// and returns it as a number only when it is above 0. Returns undefined when it shouldn't be sent
// (unset, blank, or 0 and below); anything that isn't a whole number throws.
export default function normalizeMaxResults(value: unknown): number | undefined {
	if (value === undefined || value === null) return undefined;
	if (typeof value === "string" && value.trim() === "") return undefined;

	let number: number | undefined;
	if (typeof value === "number" && Number.isInteger(value)) number = value;
	else if (typeof value === "string" && WHOLE_NUMBER.test(value)) number = Number(value);

	if (number === undefined) {
		throw new UnprocessableEntityError("invalid max_results value; must be a whole number");
	}

	return number > 0 ? number : undefined;
}
