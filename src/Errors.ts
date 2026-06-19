// Each class sets `name` to an explicit string (rather than relying on
// constructor.name) so the value survives minification and works across
// duplicate copies of this package, where instanceof checks can fail.
export class SmartyError extends Error {
	constructor(message: string = "unexpected error") {
		super(message);
		this.name = "SmartyError";
	}
}

export class DefaultError extends SmartyError {
	constructor(message?: string | null) {
		super(message || "unexpected error");
		this.name = "DefaultError";
	}
}

export class BatchFullError extends SmartyError {
	constructor() {
		super("A batch can contain a max of 100 lookups.");
		this.name = "BatchFullError";
	}
}

export class BatchEmptyError extends SmartyError {
	constructor() {
		super("A batch must contain at least 1 lookup.");
		this.name = "BatchEmptyError";
	}
}

export class UndefinedLookupError extends SmartyError {
	constructor() {
		super("The lookup provided is missing or undefined. Make sure you're passing a Lookup object.");
		this.name = "UndefinedLookupError";
	}
}

export class BadCredentialsError extends SmartyError {
	constructor(message?: string) {
		super(
			message ??
				"Unauthorized: The credentials were provided incorrectly or did not match any existing, active credentials.",
		);
		this.name = "BadCredentialsError";
	}
}

export class PaymentRequiredError extends SmartyError {
	constructor(message?: string) {
		super(
			message ??
				"Payment Required: There is no active subscription for the account associated with the credentials submitted with the request.",
		);
		this.name = "PaymentRequiredError";
	}
}

export class ForbiddenError extends SmartyError {
	constructor(message?: string) {
		super(
			message ??
				"Forbidden: The request contained valid data and was understood by the server, but the server is refusing action.",
		);
		this.name = "ForbiddenError";
	}
}

export class RequestTimeoutError extends SmartyError {
	constructor(message?: string) {
		super(message ?? "Request timeout error.");
		this.name = "RequestTimeoutError";
	}
}

export class RequestEntityTooLargeError extends SmartyError {
	constructor(message?: string) {
		super(message ?? "Request Entity Too Large: The request body has exceeded the maximum size.");
		this.name = "RequestEntityTooLargeError";
	}
}

export class BadRequestError extends SmartyError {
	constructor(message?: string) {
		super(
			message ??
				"Bad Request (Malformed Payload): A GET request lacked a required field or the request body of a POST request contained malformed JSON.",
		);
		this.name = "BadRequestError";
	}
}

export class UnprocessableEntityError extends SmartyError {
	constructor(message?: string) {
		super(message ?? "GET request lacked required fields.");
		this.name = "UnprocessableEntityError";
	}
}

export class TooManyRequestsError extends SmartyError {
	constructor(message?: string) {
		super(message ?? "Too Many Requests: The rate limit for your account has been exceeded.");
		this.name = "TooManyRequestsError";
	}
}

export class InternalServerError extends SmartyError {
	constructor(message?: string) {
		super(message ?? "Internal Server Error.");
		this.name = "InternalServerError";
	}
}

export class BadGatewayError extends SmartyError {
	constructor(message?: string) {
		super(message ?? "Bad Gateway error.");
		this.name = "BadGatewayError";
	}
}

export class ServiceUnavailableError extends SmartyError {
	constructor(message?: string) {
		super(message ?? "Service Unavailable. Try again later.");
		this.name = "ServiceUnavailableError";
	}
}

export class GatewayTimeoutError extends SmartyError {
	constructor(message?: string) {
		super(
			message ??
				"The upstream data provider did not respond in a timely fashion and the request failed. A serious, yet rare occurrence indeed.",
		);
		this.name = "GatewayTimeoutError";
	}
}

export class NotModifiedError extends SmartyError {
	responseEtag: string | undefined;

	constructor(message?: string, responseEtag?: string) {
		super(
			message ??
				"Not Modified: The requested record has not been modified since the previous request with the Etag value.",
		);
		this.name = "NotModifiedError";
		this.responseEtag = responseEtag;
	}
}

export default {
	SmartyError,
	BatchFullError,
	BatchEmptyError,
	UndefinedLookupError,
	BadCredentialsError,
	PaymentRequiredError,
	ForbiddenError,
	RequestTimeoutError,
	RequestEntityTooLargeError,
	BadRequestError,
	UnprocessableEntityError,
	TooManyRequestsError,
	InternalServerError,
	BadGatewayError,
	ServiceUnavailableError,
	GatewayTimeoutError,
	NotModifiedError,
	DefaultError,
};
