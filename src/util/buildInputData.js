const InputData = require("../InputData");

module.exports = (lookup, keyTranslationFormat) => {
	let inputData = new InputData(lookup);

	const hasCustomParameters = Object.keys(lookup.customParameters ?? {}).length > 0;

	for (let key in keyTranslationFormat) {
		inputData.add(key, keyTranslationFormat[key]);
	}

	if (hasCustomParameters) {
		for (let key in lookup.customParameters) {
			inputData.addCustomParameter(key, lookup.customParameters[key]);
		}
	}

	return inputData.data;
};
