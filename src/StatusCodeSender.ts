import {
	BadCredentialsError,
	BadGatewayError,
	BadRequestError,
	ForbiddenError,
	GatewayTimeoutError,
	InternalServerError,
	NotModifiedError,
	PaymentRequiredError,
	RequestEntityTooLargeError,
	RequestTimeoutError,
	ServiceUnavailableError,
	TooManyRequestsError,
	UnprocessableEntityError,
	DefaultError,
} from "./Errors.js";
import { Request, Response, Sender } from "./types.js";

function extractEtag(headers: Record<string, string> | undefined): string | undefined {
	if (!headers) return undefined;
	for (const key of Object.keys(headers)) {
		if (key.toLowerCase() === "etag") return headers[key];
	}
	return undefined;
}

// Pulls the message(s) out of the API's JSON error body ({"errors":[{"message":"..."}]}),
// returning undefined when the payload is missing, unparseable, or carries no messages,
// so callers fall back to the standard message for the status code.
function messageFrom(payload: Response["payload"]): string | undefined {
	let parsed = payload;
	if (typeof parsed === "string") {
		try {
			parsed = JSON.parse(parsed);
		} catch {
			return undefined;
		}
	}
	const errors = (parsed as { errors?: { message?: string }[] } | null)?.errors;
	if (!Array.isArray(errors)) return undefined;
	const message = errors
		.map((error) => error?.message ?? "")
		.filter((text) => text.trim() !== "")
		.join(" ");
	return message === "" ? undefined : message;
}

export default class StatusCodeSender {
	private sender: Sender;

	constructor(innerSender: Sender) {
		this.sender = innerSender;
	}

	send(request: Request): Promise<Response> {
		return new Promise((resolve, reject) => {
			this.sender.send(request).then(
				(response) => {
					if (response.statusCode === 304) {
						response.error = new NotModifiedError(undefined, extractEtag(response.headers));
						reject(response);
						return;
					}
					resolve(response);
				},
				(error: Response) => {
					const message = messageFrom(error.payload);
					switch (error.statusCode) {
						case 0:
							error.error = error.error ?? new DefaultError("Network error: unable to connect.");
							break;

						case 304:
							error.error = new NotModifiedError(undefined, extractEtag(error.headers));
							break;

						case 400:
							error.error = new BadRequestError(message);
							break;

						case 401:
							error.error = new BadCredentialsError(message);
							break;

						case 402:
							error.error = new PaymentRequiredError(message);
							break;

						case 403:
							error.error = new ForbiddenError(message);
							break;

						case 408:
							error.error = new RequestTimeoutError(message);
							break;

						case 413:
							error.error = new RequestEntityTooLargeError(message);
							break;

						case 422:
							error.error = new UnprocessableEntityError(message);
							break;

						case 429:
							error.error = new TooManyRequestsError(message);
							break;

						case 500:
							error.error = new InternalServerError(message);
							break;

						case 502:
							error.error = new BadGatewayError(message);
							break;

						case 503:
							error.error = new ServiceUnavailableError(message);
							break;

						case 504:
							error.error = new GatewayTimeoutError(message);
							break;

						default: {
							error.error = new DefaultError(
								message ??
									error.error?.message ??
									`The server returned an unexpected HTTP status code: ${error.statusCode}`,
							);
						}
					}
					reject(error);
				},
			);
		});
	}
}
