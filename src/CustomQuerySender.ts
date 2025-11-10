import { Request, Response, Sender } from "./types";

export default class CustomQuerySender {
	private queries: Map<string, string>;
	private sender: Sender;

	constructor(innerSender: Sender, queries: Map<string, string>) {
		this.queries = queries;
		this.sender = innerSender;
	}

	send(request: Request): Promise<Response> {
		this.queries.forEach((value, key) => {
			const existingValue = request.parameters[key];
			request.parameters[key] = existingValue ? `${existingValue},${value}` : value;
		});

		return this.sender.send(request);
	}
}
