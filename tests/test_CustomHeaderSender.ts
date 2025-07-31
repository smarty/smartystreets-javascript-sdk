import { expect } from "chai";
import CustomHeaderSender from "../src/CustomHeaderSender.js";
import Request from "../src/Request.js";
import Response from "../src/Response.js";
import { Sender } from "../src/types.js";

describe("A custom header sender", function () {
	it("adds custom headers to the request.", function () {
		class MockSender implements Sender {
			request?: Request;

			send = (request: Request): Promise<Response> => {
				this.request = request;
				return Promise.resolve(new Response(200, {}));
			};
		}

		const mockSender = new MockSender();
		const customHeaders = {
			a: "1",
			b: "2",
		};
		const customHeaderSender = new CustomHeaderSender(mockSender, customHeaders);
		const request = new Request();

		customHeaderSender.send(request);

		expect("a" in mockSender.request!.headers).to.equal(true);
		expect((mockSender.request!.headers as Record<string, string>)["a"]).to.equal("1");
		expect("b" in mockSender.request!.headers).to.equal(true);
		expect((mockSender.request!.headers as Record<string, string>)["b"]).to.equal("2");
	});
});
