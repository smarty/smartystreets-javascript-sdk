const buildInputData = require("./buildInputData");
const keyTranslationFormat = require("./apiToSDKKeyMap").usStreet;

module.exports = (lookup) => {
	// Apply default match strategy and candidates logic per Go SDK behavior
	let effectiveMatch = lookup.match;
	let effectiveCandidates = lookup.maxCandidates;

	// Default match strategy is "enhanced"
	if (!effectiveMatch) {
		effectiveMatch = "enhanced";
	}

	// If match is "strict", don't send match parameter
	if (effectiveMatch === "strict") {
		effectiveMatch = undefined;
	}

	// For "enhanced" match mode, set default candidates to 5 if not specified
	if (effectiveMatch === "enhanced" && !effectiveCandidates) {
		effectiveCandidates = 5;
	}

	// Create a lookup copy with effective values for serialization
	const effectiveLookup = Object.assign({}, lookup, {
		match: effectiveMatch,
		maxCandidates: effectiveCandidates,
	});

	return buildInputData(effectiveLookup, keyTranslationFormat);
};
