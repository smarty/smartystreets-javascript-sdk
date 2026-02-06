import { Request, Response, Sender } from "./types";

export interface AppendHeader {
	values: string[];
	separator: string;
}

export default class CustomHeaderSender {
	private sender: Sender;
	private customHeaders: Record<string, string>;
	private appendHeaders: Record<string, AppendHeader>;

	constructor(
		innerSender: Sender,
		customHeaders: Record<string, string>,
		appendHeaders: Record<string, AppendHeader> = {},
	) {
		this.sender = innerSender;
		this.customHeaders = customHeaders;
		this.appendHeaders = appendHeaders;
	}

	send(request: Request): Promise<Response> {
		const headers = request.headers as Record<string, string>;

		for (let key in this.customHeaders) {
			headers[key] = this.customHeaders[key];
		}

		for (let key in this.appendHeaders) {
			const { values, separator } = this.appendHeaders[key];
			const appendValue = values.join(separator);
			const existing = headers[key];
			if (existing) {
				headers[key] = existing + separator + appendValue;
			} else {
				headers[key] = appendValue;
			}
		}

		return new Promise((resolve, reject) => {
			this.sender.send(request).then(resolve).catch(reject);
		});
	}
}
