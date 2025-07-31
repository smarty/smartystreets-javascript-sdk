import { Request, Response, Sender } from "./types";

export default class BaseUrlSender {
	private urlOverride: string;
	private sender: Sender;

	constructor(innerSender: Sender, urlOverride: string) {
		this.urlOverride = urlOverride;
		this.sender = innerSender;
	}

	send(request: Request): Promise<Response> {
		return new Promise((resolve, reject) => {
			request.baseUrl = `${this.urlOverride}${
				request.baseUrlParam ? `/${request.baseUrlParam}` : ""
			}`;

			this.sender.send(request).then(resolve).catch(reject);
		});
	}
}
