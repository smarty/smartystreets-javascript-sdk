export class SmartyError extends Error {
	constructor(message = "unexpected error") {
		super(message);
	}
}

export class DefaultError extends SmartyError {
	constructor(message: string) {
		super(message);
	}
}

export class BatchFullError extends SmartyError {
	constructor() {
		super("A batch can contain a max of 100 lookups.");
	}
}

export class BatchEmptyError extends SmartyError {
	constructor() {
		super("A batch must contain at least 1 lookup.");
	}
}

export class UndefinedLookupError extends SmartyError {
	constructor() {
		super("The lookup provided is missing or undefined. Make sure you're passing a Lookup object.");
	}
}

export class BadCredentialsError extends SmartyError {
	constructor() {
		super(
			"Unauthorized: The credentials were provided incorrectly or did not match any existing active credentials.",
		);
	}
}

export class PaymentRequiredError extends SmartyError {
	constructor() {
		super(
			"Payment Required: There is no active subscription for the account associated with the credentials submitted with the request.",
		);
	}
}

export class RequestEntityTooLargeError extends SmartyError {
	constructor() {
		super("Request Entity Too Large: The request body has exceeded the maximum size.");
	}
}

export class BadRequestError extends SmartyError {
	constructor() {
		super(
			"Bad Request (Malformed Payload): A GET request lacked a street field or the request body of a POST request contained malformed JSON.",
		);
	}
}

export class UnprocessableEntityError extends SmartyError {
	constructor(message: string) {
		super(message);
	}
}

export class TooManyRequestsError extends SmartyError {
	constructor() {
		super(
			"When using the public 'embedded key' authentication, we restrict the number of requests coming from a given source over too short of a time.",
		);
	}
}

export class InternalServerError extends SmartyError {
	constructor() {
		super("Internal Server Error.");
	}
}

export class ServiceUnavailableError extends SmartyError {
	constructor() {
		super("Service Unavailable. Try again later.");
	}
}

export class GatewayTimeoutError extends SmartyError {
	constructor() {
		super(
			"The upstream data provider did not respond in a timely fashion and the request failed. A serious, yet rare occurrence indeed.",
		);
	}
}

