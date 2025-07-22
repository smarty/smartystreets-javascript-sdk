import { Request, Response, Sender } from "./types";

export default class AgentSender {
	private sender: Sender;

	constructor(innerSender: Sender) {
		this.sender = innerSender;
	}

	send(request: Request): Promise<Response> {
		request.parameters["agent"] =
			"smarty (sdk:javascript@" + require("../../package.json").version + ")";
		return new Promise((resolve, reject) => {
			this.sender.send(request).then(resolve).catch(reject);
		});
	}
}
