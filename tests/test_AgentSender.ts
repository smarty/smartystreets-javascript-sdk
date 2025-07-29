import { expect } from "chai";
import * as SmartySDK from "../dist/esm/index.mjs";
import packageJson from "../package.json";

describe("An agent sender", function () {
	it("attaches an 'agent' parameter to the request config.", function () {
		class MockSender {
			agentString = "";

			send = (request: any) => {
				this.agentString = request.parameters.agent;
			};
		}

		const mockSender = new MockSender();
		const agentSender = new SmartySDK.core.AgentSender(mockSender);
		const request = new SmartySDK.core.Request();
		const expectedAgentString = `smarty (sdk:javascript@${packageJson.version})`;

		agentSender.send(request);

		expect(mockSender.agentString).to.equal(expectedAgentString);
	});
});
