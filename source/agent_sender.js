const Promise = require("promise");

class AgentSender {
	constructor(innerSender){
		this.innerSender = innerSender;
	}

	send(request) {
		request.parameters.agent = "smartystreets (sdk:javascript@" + require("../package.json").version + ")";
		return new Promise((resolve, reject) => {
			this.innerSender.send(request).then(response => resolve(response), error => reject(error));
		});
	}
}

module.exports = AgentSender;