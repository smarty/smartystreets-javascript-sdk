import { expect } from "chai";
import CustomHeaderSender from "../src/CustomHeaderSender.js";
import Request from "../src/Request.js";
import Response from "../src/Response.js";
import { Sender } from "../src/types";

class MockSender implements Sender {
	request?: Request;

	send = (request: Request): Promise<Response> => {
		this.request = request;
		return Promise.resolve(new Response(200, {}));
	};
}

describe("A custom header sender", function () {
	it("adds custom headers to the request.", function () {
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

	it("appended headers are joined with separator.", function () {
		const mockSender = new MockSender();
		const customHeaders = {
			"User-Agent": "custom-value",
		};
		const appendHeaderSeparators = {
			"User-Agent": " ",
		};
		const customHeaderSender = new CustomHeaderSender(mockSender, customHeaders, appendHeaderSeparators);
		const request = new Request(undefined, {
			"Content-Type": "application/json; charset=utf-8",
			"User-Agent": "base-value",
		});

		customHeaderSender.send(request);

		expect((mockSender.request!.headers as Record<string, string>)["User-Agent"]).to.equal(
			"base-value custom-value",
		);
	});

	it("appended headers set the value when no existing header is present.", function () {
		const mockSender = new MockSender();
		const customHeaders = {
			"User-Agent": "custom-value",
		};
		const appendHeaderSeparators = {
			"User-Agent": " ",
		};
		const customHeaderSender = new CustomHeaderSender(mockSender, customHeaders, appendHeaderSeparators);
		const request = new Request();

		customHeaderSender.send(request);

		expect((mockSender.request!.headers as Record<string, string>)["User-Agent"]).to.equal(
			"custom-value",
		);
	});

	it("multiple appended header calls are accumulated.", function () {
		const mockSender = new MockSender();
		const customHeaders = {
			"User-Agent": "foo bar",
		};
		const appendHeaderSeparators = {
			"User-Agent": " ",
		};
		const customHeaderSender = new CustomHeaderSender(mockSender, customHeaders, appendHeaderSeparators);
		const request = new Request(undefined, {
			"User-Agent": "base-value",
		});

		customHeaderSender.send(request);

		expect((mockSender.request!.headers as Record<string, string>)["User-Agent"]).to.equal(
			"base-value foo bar",
		);
	});
});
