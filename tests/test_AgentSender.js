import { AgentSender } from "../src/AgentSender.js";
import { Request } from "../src/Request.js";
import { expect } from "chai";
import {VERSION} from "../src/util/constants.js";

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
    let expectedAgentString = "smarty (sdk:javascript@" + VERSION + ")";

    agentSender.send(request);

    expect(mockSender.agentString).to.equal(expectedAgentString);
  });
});
