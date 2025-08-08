import { Request, Response, Sender } from "./types";
import {
	InternalServerError,
	ServiceUnavailableError,
	GatewayTimeoutError,
	DefaultError,
} from "./Errors";

export default class StatusCodeSender {
	private sender: Sender;

	constructor(innerSender: Sender) {
		this.sender = innerSender;
	}

	async send(request: Request): Promise<Response> {
		try {
			return await this.sender.send(request);
		} catch (error: any) {
			switch (error.statusCode) {
				case 500:
					error.error = new InternalServerError();
					break;

				case 503:
					error.error = new ServiceUnavailableError();
					break;

				case 504:
					error.error = new GatewayTimeoutError();
					break;

				default:
					error.error = new DefaultError(
						(error && error.payload && error.payload.errors?.[0]?.message) || "Unknown error",
					);
			}
			throw error;
		}
	}
}

