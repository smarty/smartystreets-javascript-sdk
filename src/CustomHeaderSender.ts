import { Request, Response, Sender } from "./types";

export default class CustomHeaderSender {
	private sender: Sender;
	private customHeaders: Record<string, string>;
	private appendHeaders: Record<string, string>;

	constructor(
		innerSender: Sender,
		customHeaders: Record<string, string>,
		appendHeaders: Record<string, string> = {},
	) {
		this.sender = innerSender;
		this.customHeaders = customHeaders;
		this.appendHeaders = appendHeaders;
	}

	send(request: Request): Promise<Response> {
		for (let key in this.customHeaders) {
			if (key in this.appendHeaders) {
				const separator = this.appendHeaders[key];
				const existing = (request.headers as Record<string, string>)[key];
				if (existing) {
					(request.headers as Record<string, string>)[key] =
						existing + separator + this.customHeaders[key];
				} else {
					(request.headers as Record<string, string>)[key] = this.customHeaders[key];
				}
			} else {
				request.headers[key] = this.customHeaders[key];
			}
		}

		return new Promise((resolve, reject) => {
			this.sender.send(request).then(resolve).catch(reject);
		});
	}
}
