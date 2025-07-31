import { expect } from "chai";
import AgentSender from "../src/AgentSender.js";
import Request from "../src/Request.js";
import Response from "../src/Response.js";
import { Sender } from "../src/types.js";
import packageJson from "../package.json" with { type: "json" };

describe("An agent sender", function () {
	it("attaches an 'agent' parameter to the request config.", function () {
		class MockSender implements Sender {
			agentString = "";

			send = (request: Request) => {
				this.agentString = (request.parameters as Record<string, string>)["agent"];
				return Promise.resolve(new Response(200, {}));
			};
		}

		const mockSender = new MockSender();
		const agentSender = new AgentSender(mockSender);
		const request = new Request();
		const expectedAgentString = `smarty (sdk:javascript@${packageJson.version})`;

		agentSender.send(request);

		expect(mockSender.agentString).to.equal(expectedAgentString);
	});
});
