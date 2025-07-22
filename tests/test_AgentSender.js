const chai = require("chai");
const expect = chai.expect;
const Request = require("../src/Request");
const AgentSender = require("../dist/cjs/AgentSender.cjs").default;

describe("An agent sender", function () {
	it("attaches an 'agent' parameter to the request config.", function () {
		function MockSender() {
			this.agentString = "";

			this.send = (request) => {
				this.agentString = request.parameters.agent;
			};
		}

		let mockSender = new MockSender();
		let agentSender = new AgentSender(mockSender);
		let request = new Request();
		let expectedAgentString = "smarty (sdk:javascript@" + require("../package.json").version + ")";

		agentSender.send(request);

		expect(mockSender.agentString).to.equal(expectedAgentString);
	});
});