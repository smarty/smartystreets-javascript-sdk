import { VERSION } from "./util/constants.js";

export class AgentSender {
  constructor(innerSender) {
    this.sender = innerSender;
  }

  send(request) {
    request.parameters.agent = "smarty (sdk:javascript@" + VERSION + ")";
    return new Promise((resolve, reject) => {
      this.sender.send(request).then(resolve).catch(reject);
    });
  }
}
