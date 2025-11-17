import { expect } from "chai";
import CustomQuerySender from "../src/CustomQuerySender";
import Request from "../src/Request.js";
import Response from "../src/Response.js";
import { Sender } from "@/src/types";

describe("A custom query sender", function () {
	it("adds custom query parameters to the request.", function () {
		class MockSender implements Sender {
			request?: Request;

			send = (request: Request): Promise<Response> => {
				this.request = request;
				return Promise.resolve(new Response(200, {}));
			};
		}

		const mockSender = new MockSender();
		const customQueries = new Map<string, string>([
			["a", "1"],
			["b", "2"],
		]);
		const customQuerySender = new CustomQuerySender(mockSender, customQueries);
		const request = new Request();

		customQuerySender.send(request);

		expect("a" in mockSender.request!.parameters).to.equal(true);
		expect((mockSender.request!.parameters as Record<string, string>)["a"]).to.equal("1");
		expect("b" in mockSender.request!.parameters).to.equal(true);
		expect((mockSender.request!.parameters as Record<string, string>)["b"]).to.equal("2");
	});
});
