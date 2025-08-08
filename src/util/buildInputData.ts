import InputData, { Lookup } from "../InputData";

export interface KeyTranslationFormat {
	[key: string]: string;
}

export default function buildInputData(
	lookup: Lookup,
	keyTranslationFormat: KeyTranslationFormat,
): Record<string, any> {
	const inputData = new InputData(lookup);

	const hasCustomParameters = Object.keys(lookup["customParameters"] ?? {}).length > 0;

	for (const key in keyTranslationFormat) {
		inputData.add(key, keyTranslationFormat[key]);
	}

	if (hasCustomParameters) {
		for (const key in lookup["customParameters"]) {
			inputData.addCustomParameter(key, lookup["customParameters"][key]);
		}
	}

	return inputData.data;
}
