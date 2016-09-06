var validateInputFields = (lookupTemplate, lookups) => {
		clearErrors();
		setTemplate(lookupTemplate);

		checkEachLookupForInvalidInputFields(lookups);

		console.log(getErrorsIfAny());
		return getErrorsIfAny();
	},

	errors = {},
	template = {},

	clearErrors = () => {
		errors = {};
	},

	getErrorsIfAny = () => {
		if (errors.hasOwnProperty("invalidInputFields")) {
			return errors;
		}
	},

	setTemplate = (newTemplate) => {
		template = newTemplate;
	},

	checkEachLookupForInvalidInputFields = (lookups) => {
		lookups.forEach((lookup, index) => {
			validateKeysInLookup(lookup, index);
		});
	},

	validateKeysInLookup = (lookup, index) => {
		for (key in lookup) {
			if (!keyExistsInTemplate(key)) {
				recordError(index, key);
			}
		}
	},

	keyExistsInTemplate = (key) => {
		if (template.hasOwnProperty(key)) {
			return true;
		}

		return false;
	},

	recordError = (index, key) => {
		if (!errors.hasOwnProperty("invalidInputFields")) {
			errors.invalidInputFields = [buildErrorObject(index, key)];
		} else {
			errors.invalidInputFields.push(buildErrorObject(index, key));
		}
	},

	buildErrorObject = (index, key) => {
		return {
			"index": index,
			"key": key
		};
	};

module.exports = validateInputFields;