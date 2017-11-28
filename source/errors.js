class SmartyError extends Error {
	constructor(message) {
		super(message);
	}
}

class BatchFullError extends SmartyError {
	constructor() {
		super("A batch can contain a max of 100 lookups.");
	}
}

class BatchEmptyError extends SmartyError {
	constructor() {
		super("A batch must contain at least 1 lookup.");
	}
}

class MissingLookupError extends SmartyError {
	constructor() {
		super("The lookup provided is missing or undefined.");
	}
}

module.exports = {
	BatchFullError: BatchFullError,
	BatchEmptyError: BatchEmptyError,
	MissingLookupError: MissingLookupError
};