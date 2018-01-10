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

class UndefinedLookupError extends SmartyError {
	constructor() {
		super("The lookup provided is missing or undefined.");
	}
}

class BadCredentialsError extends SmartyError {
	constructor() {
		super("Unauthorized: The credentials were provided incorrectly or did not match any existing active credentials.");
	}
}

class PaymentRequiredError extends SmartyError {
	constructor() {
		super("Payment Required: There is no active subscription for the account associated with the credentials submitted with the request.");
	}
}

class RequestEntityTooLargeError extends SmartyError {
	constructor() {
		super("Request Entity Too Large: The request body has exceeded the maximum size.");
	}
}

module.exports = {
	BatchFullError: BatchFullError,
	BatchEmptyError: BatchEmptyError,
	UndefinedLookupError: UndefinedLookupError,
	BadCredentialsError: BadCredentialsError,
	PaymentRequiredError: PaymentRequiredError,
	RequestEntityTooLargeError: RequestEntityTooLargeError
};