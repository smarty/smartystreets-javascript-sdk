import { Request, Response, Sender } from "./types";

export default class CustomHeaderSender {
	private sender: Sender;
	private customHeaders: Record<string, string>;

	constructor(innerSender: Sender, customHeaders: Record<string, string>) {
		this.sender = innerSender;
		this.customHeaders = customHeaders;
	}

	send(request: Request): Promise<Response> {
		for (let key in this.customHeaders) {
			request.headers[key] = this.customHeaders[key];
		}

		return new Promise((resolve, reject) => {
			this.sender.send(request).then(resolve).catch(reject);
		});
	}
}
