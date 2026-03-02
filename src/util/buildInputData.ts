import InputData from "../InputData.js";

export default function buildInputData(
	lookup: Record<string, any>,
	keyTranslationFormat: Record<string, string>,
): Record<string, string | number> {
	const inputData = new InputData(lookup);

	const customParameters: Record<string, string> = lookup.customParameters ?? {};
	const hasCustomParameters = Object.keys(customParameters).length > 0;

	for (const key in keyTranslationFormat) {
		inputData.add(key, keyTranslationFormat[key]);
	}

	if (hasCustomParameters) {
		for (const key in customParameters) {
			inputData.addCustomParameter(key, customParameters[key]);
		}
	}

	return inputData.data;
}
