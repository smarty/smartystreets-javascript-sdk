import { AgentSender } from "../src/AgentSender.js";
import info from "../package.json" assert { type: "json" };
import { Request } from "../src/Request.js";
import { expect } from "chai";

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
    let expectedAgentString = "smarty (sdk:javascript@" + info.version + ")";

    agentSender.send(request);

    expect(mockSender.agentString).to.equal(expectedAgentString);
  });
});
