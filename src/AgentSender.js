import info from "../package.json" assert {type: "json"};


export class AgentSender {
	constructor(innerSender) {
		this.sender = innerSender;
	}

	send(request) {
		request.parameters.agent = "smarty (sdk:javascript@" + info.version + ")";
		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(resolve)
				.catch(reject);
		});
	}
}
