const InputData = require("../InputData");

module.exports = (lookup, keyTranslationFormat) => {
	let inputData = new InputData(lookup);

	for (let key in keyTranslationFormat) {
		inputData.add(key, keyTranslationFormat[key]);
	}

	return inputData.data;
};
