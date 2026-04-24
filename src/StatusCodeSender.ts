import {
	InternalServerError,
	ServiceUnavailableError,
	GatewayTimeoutError,
	NotModifiedError,
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
					switch (error.statusCode) {
						case 0:
							error.error = error.error ?? new DefaultError("Network error: unable to connect.");
							break;

						case 304:
							error.error = new NotModifiedError(undefined, extractEtag(error.headers));
							break;

						case 500:
							error.error = new InternalServerError();
							break;

						case 503:
							error.error = new ServiceUnavailableError();
							break;

						case 504:
							error.error = new GatewayTimeoutError();
							break;

						default: {
							const payload = error.payload as {
								errors?: { message?: string }[];
							} | null;
							const message = payload?.errors?.[0]?.message;
							error.error = new DefaultError(message ?? error.error?.message);
						}
					}
					reject(error);
				},
			);
		});
	}
}
