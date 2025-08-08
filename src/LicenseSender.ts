import { Request, Response, Sender } from "./types";

export default class LicenseSender {
	private sender: Sender;
	private licenses: string[];

	constructor(innerSender: Sender, licenses: string[]) {
		this.sender = innerSender;
		this.licenses = licenses;
	}

	async send(request: Request): Promise<Response> {
		if (this.licenses.length !== 0) {
			request.parameters["license"] = this.licenses.join(",");
		}

		return this.sender.send(request);
	}
}

