import {InputData} from "../InputData.js";

export function buildInputData(lookup, keyTranslationFormat)  {
	let inputData = new InputData(lookup);

	for (let key in keyTranslationFormat) {
		inputData.add(key, keyTranslationFormat[key]);
	}

	return inputData.data;
}
