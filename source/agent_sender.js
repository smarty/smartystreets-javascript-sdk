const Promise = require("promise");

class AgentSender {
	constructor(innerSender) {
		this.sender = innerSender;
	}

	send(request) {
		request.parameters.agent = "smartystreets (sdk:javascript@" + require("../package.json").version + ")";
		return new Promise((resolve, reject) => {
			this.sender.send(request)
				.then(resolve)
				.catch(reject);
		});
	}
}

module.exports = AgentSender;