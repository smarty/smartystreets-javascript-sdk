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

	// If match is "strict", don't send match parameter or default candidates
	if (effectiveMatch === "strict") {
		effectiveMatch = undefined;
		// Only send candidates if explicitly set
		if (!effectiveCandidates) {
			effectiveCandidates = undefined;
		}
	} else {
		// For non-strict (including default "enhanced"), set default candidates to 5 if not specified
		if (!effectiveCandidates) {
			effectiveCandidates = 5;
		}
	}

	// Create a lookup copy with effective values for serialization
	const effectiveLookup = Object.assign({}, lookup, {
		match: effectiveMatch,
		maxCandidates: effectiveCandidates,
	});

	return buildInputData(effectiveLookup, keyTranslationFormat);
};
