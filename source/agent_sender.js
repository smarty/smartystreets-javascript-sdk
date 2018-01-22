const Promise = require("promise");

class AgentSender {
	constructor(innerSender){
		this.sender = innerSender;
	}

	send(request) {
		request.parameters.agent = "smartystreets (sdk:javascript@" + require("../package.json").version + ")";
		return new Promise((resolve, reject) => {
			this.sender.send(request).then(response => resolve(response), error => reject(error));
		});
	}
}

module.exports = AgentSender;