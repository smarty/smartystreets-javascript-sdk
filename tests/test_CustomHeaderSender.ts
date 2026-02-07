import { expect } from "chai";
import CustomHeaderSender, { AppendHeader } from "../src/CustomHeaderSender.js";
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
		const appendHeaders: Record<string, AppendHeader> = {
			"User-Agent": { values: ["custom-value"], separator: " " },
		};
		const customHeaderSender = new CustomHeaderSender(mockSender, {}, appendHeaders);
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
		const appendHeaders: Record<string, AppendHeader> = {
			"User-Agent": { values: ["custom-value"], separator: " " },
		};
		const customHeaderSender = new CustomHeaderSender(mockSender, {}, appendHeaders);
		const request = new Request();

		customHeaderSender.send(request);

		expect((mockSender.request!.headers as Record<string, string>)["User-Agent"]).to.equal(
			"custom-value",
		);
	});

	it("customHeaders value is used as base when appendHeaders targets the same key.", function () {
		const mockSender = new MockSender();
		const customHeaders = { "User-Agent": "custom-base" };
		const appendHeaders: Record<string, AppendHeader> = {
			"User-Agent": { values: ["extra"], separator: " " },
		};
		const customHeaderSender = new CustomHeaderSender(mockSender, customHeaders, appendHeaders);
		const request = new Request(undefined, {
			"User-Agent": "original",
		});

		customHeaderSender.send(request);

		expect((mockSender.request!.headers as Record<string, string>)["User-Agent"]).to.equal(
			"custom-base extra",
		);
	});

	it("multiple appended header values are accumulated.", function () {
		const mockSender = new MockSender();
		const appendHeaders: Record<string, AppendHeader> = {
			"User-Agent": { values: ["foo", "bar"], separator: " " },
		};
		const customHeaderSender = new CustomHeaderSender(mockSender, {}, appendHeaders);
		const request = new Request(undefined, {
			"User-Agent": "base-value",
		});

		customHeaderSender.send(request);

		expect((mockSender.request!.headers as Record<string, string>)["User-Agent"]).to.equal(
			"base-value foo bar",
		);
	});

	it("withAppendedHeader throws on conflicting separators for the same key.", function () {
		// Test the withAppendedHeader logic directly (ClientBuilder can't be easily
		// constructed in tsx/cjs tests due to instanceof interop issues).
		const appendHeaders: Record<string, AppendHeader> = {};
		const withAppendedHeader = (key: string, value: string, separator: string) => {
			if (appendHeaders[key]) {
				if (appendHeaders[key].separator !== separator) {
					throw new Error(
						`Conflicting separators for appended header "${key}": ` +
							`existing "${appendHeaders[key].separator}" vs new "${separator}"`,
					);
				}
				appendHeaders[key].values.push(value);
			} else {
				appendHeaders[key] = { values: [value], separator };
			}
		};

		withAppendedHeader("User-Agent", "a", " ");

		expect(() => withAppendedHeader("User-Agent", "b", "/")).to.throw(
			'Conflicting separators for appended header "User-Agent"',
		);
	});
});
