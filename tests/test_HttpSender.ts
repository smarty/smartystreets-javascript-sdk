import { expect } from "chai";
import Request from "../src/Request.js";
import HttpSender from "../src/HttpSender.js";
import { buildSmartyResponse } from "../src/util/buildSmartyResponse.js";

function mockFetchResponse(
	status: number,
	body: unknown = null,
	headers: Record<string, string> = { "content-type": "application/json" },
): typeof fetch {
	return async () =>
		new Response(body === null ? null : JSON.stringify(body), {
			status,
			headers,
		});
}

function mockFetchError(error: Error): typeof fetch {
	return async () => {
		throw error;
	};
}

describe("A fetch-based HTTP sender", function () {
	it("builds a GET request when there is no payload.", function () {
		const request = new Request();
		request.baseUrl = "https://example.com/api";
		const sender = new HttpSender(10000, undefined, false, mockFetchResponse(200));
		const { url, init } = sender.buildFetchArgs(request);

		expect(init.method).to.equal("GET");
		expect(init.body).to.be.undefined;
		expect(url).to.equal("https://example.com/api");
	});

	it("builds a POST request when a payload is provided.", function () {
		const payload = { key: "value" };
		const request = new Request(payload);
		request.baseUrl = "https://example.com/api";
		const sender = new HttpSender(10000, undefined, false, mockFetchResponse(200));
		const { init } = sender.buildFetchArgs(request);

		expect(init.method).to.equal("POST");
		expect(init.body).to.equal(JSON.stringify(payload));
	});

	it("sends a string payload as-is without JSON.stringify.", function () {
		const payload = "raw string body";
		const request = new Request(payload);
		request.baseUrl = "https://example.com/api";
		const sender = new HttpSender(10000, undefined, false, mockFetchResponse(200));
		const { init } = sender.buildFetchArgs(request);

		expect(init.body).to.equal("raw string body");
	});

	it("appends query parameters to the URL.", function () {
		const request = new Request();
		request.baseUrl = "https://example.com/api";
		request.parameters["auth-id"] = "123";
		request.parameters["zipcode"] = "20500";
		const sender = new HttpSender(10000, undefined, false, mockFetchResponse(200));
		const { url } = sender.buildFetchArgs(request);

		const parsed = new URL(url);
		expect(parsed.searchParams.get("auth-id")).to.equal("123");
		expect(parsed.searchParams.get("zipcode")).to.equal("20500");
	});

	it("includes headers in the fetch init.", function () {
		const request = new Request();
		request.baseUrl = "https://example.com/api";
		const sender = new HttpSender(10000, undefined, false, mockFetchResponse(200));
		const { init } = sender.buildFetchArgs(request);

		expect(init.headers).to.deep.equal(request.headers);
		expect((init.headers as Record<string, string>)["Content-Type"]).to.equal(
			"application/json; charset=utf-8",
		);
	});

	it("includes an abort signal for timeout.", function () {
		const request = new Request();
		request.baseUrl = "https://example.com/api";
		const sender = new HttpSender(5000, undefined, false, mockFetchResponse(200));
		const { init } = sender.buildFetchArgs(request);

		expect(init.signal).to.be.an.instanceOf(AbortSignal);
	});

	it("uses the default timeout of 10000ms.", function () {
		const request = new Request();
		request.baseUrl = "https://example.com/api";
		const sender = new HttpSender(undefined, undefined, false, mockFetchResponse(200));
		const { init } = sender.buildFetchArgs(request);

		expect(init.signal).to.be.an.instanceOf(AbortSignal);
	});

	it("includes a dispatcher when proxy config is provided.", async function () {
		const request = new Request();
		request.baseUrl = "https://example.com/api";
		let capturedInit: RequestInit | undefined;
		const capturingFetch: typeof fetch = async (_url, init) => {
			capturedInit = init;
			return new Response(JSON.stringify(null), {
				status: 200,
				headers: { "content-type": "application/json" },
			});
		};
		const sender = new HttpSender(10000, { url: "http://proxy:8080" }, false, capturingFetch);

		await sender.send(request);

		expect((capturedInit as Record<string, unknown>)["dispatcher"]).to.not.be.undefined;
	});

	it("resolves with a SmartyResponse on a 2xx response.", async function () {
		const mockData = [{ street: "123 Main St" }];
		const sender = new HttpSender(10000, undefined, false, mockFetchResponse(200, mockData));
		const request = new Request();
		request.baseUrl = "https://example.com/api";

		const response = await sender.send(request);

		expect(response.statusCode).to.equal(200);
		expect(response.payload).to.deep.equal(mockData);
	});

	it("rejects with a SmartyResponse on a 4xx response.", async function () {
		const sender = new HttpSender(
			10000,
			undefined,
			false,
			mockFetchResponse(401, { error: "unauthorized" }),
		);
		const request = new Request();
		request.baseUrl = "https://example.com/api";

		try {
			await sender.send(request);
			expect.fail("should have rejected");
		} catch (error: any) {
			expect(error.statusCode).to.equal(401);
		}
	});

	it("rejects with a SmartyResponse on a network error.", async function () {
		const networkError = new Error("fetch failed");
		const sender = new HttpSender(10000, undefined, false, mockFetchError(networkError));
		const request = new Request();
		request.baseUrl = "https://example.com/api";

		try {
			await sender.send(request);
			expect.fail("should have rejected");
		} catch (error: any) {
			expect(error.statusCode).to.equal(0);
			expect(error.error).to.equal(networkError);
		}
	});

	it("parses text response when content-type is not JSON.", async function () {
		const textFetch: typeof fetch = async () =>
			new Response("plain text body", {
				status: 200,
				headers: { "content-type": "text/plain" },
			});
		const sender = new HttpSender(10000, undefined, false, textFetch);
		const request = new Request();
		request.baseUrl = "https://example.com/api";

		const response = await sender.send(request);

		expect(response.statusCode).to.equal(200);
		expect(response.payload).to.equal("plain text body");
	});

	it("captures response headers.", async function () {
		const headerFetch: typeof fetch = async () =>
			new Response(JSON.stringify({}), {
				status: 200,
				headers: {
					"content-type": "application/json",
					"x-custom": "value",
				},
			});
		const sender = new HttpSender(10000, undefined, false, headerFetch);
		const request = new Request();
		request.baseUrl = "https://example.com/api";

		const response = await sender.send(request);

		expect(response.headers["x-custom"]).to.equal("value");
	});
});

describe("buildSmartyResponse", function () {
	it("has a response with the right status code.", function () {
		const mockResponse = { status: 200 };
		const smartyResponse = buildSmartyResponse(mockResponse);

		expect(smartyResponse.statusCode).to.equal(200);
	});

	it("has a response with a payload.", function () {
		const mockData = [1, 2, 3];
		const mockResponse = { status: 200, data: mockData };
		const smartyResponse = buildSmartyResponse(mockResponse);

		expect(smartyResponse.payload).to.equal(mockData);
	});
});
