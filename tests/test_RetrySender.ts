import { expect } from "chai";
import RetrySender from "../src/RetrySender";
import { MockSenderWithStatusCodesAndHeaders } from "./fixtures/mock_senders";
import Request from "../src/Request";
import Response from "../src/Response";
import type { Sender, Sleeper, MockSenderInstance, MockSleeperInstance } from "../src/types";

class CompatibleMockSender implements MockSenderInstance {
	statusCodes: string[];
	headers?: Record<string, unknown> | undefined;
	error?: string | undefined;
	currentStatusCodeIndex: number;
	private mockSender: {
		send(request: Request): Response;
		currentStatusCodeIndex: number;
	};

	constructor(statusCodes: string[], headers?: Record<string, unknown>, error?: string) {
		this.statusCodes = statusCodes;
		this.headers = headers;
		this.error = error;
		this.currentStatusCodeIndex = 0;
		this.mockSender = new (MockSenderWithStatusCodesAndHeaders as new (
			...args: [string[], Record<string, unknown>?, string?]
		) => {
			send(request: Request): Response;
			currentStatusCodeIndex: number;
		})(statusCodes, headers, error);
	}

	async send(request: Request): Promise<Response> {
		const result = this.mockSender.send(request);
		this.currentStatusCodeIndex = this.mockSender.currentStatusCodeIndex;
		return Promise.resolve(result);
	}
}

class CompatibleMockSleeper implements MockSleeperInstance {
	sleepDurations: number[] = [];

	async sleep(ms: number): Promise<void> {
		this.sleepDurations.push(ms);
		return Promise.resolve();
	}
}

async function sendWithRetry(retries: number, inner: Sender, sleeper: Sleeper) {
	const request = new Request();
	const sender = new RetrySender(retries, inner, sleeper);
	return await sender.send(request);
}

describe("Retry Sender tests", function () {
	it("test success does not retry", async function () {
		let inner = new CompatibleMockSender(["200"]);
		await sendWithRetry(5, inner, new CompatibleMockSleeper());

		expect(inner.currentStatusCodeIndex).to.equal(1);
	});

	it("test client error does not retry", async function () {
		let inner = new CompatibleMockSender(["422"]);
		await sendWithRetry(5, inner, new CompatibleMockSleeper());

		expect(inner.currentStatusCodeIndex).to.equal(1);
	});

	it("test will retry until success", async function () {
		let inner = new CompatibleMockSender(["500", "500", "500", "200", "500"]);
		await sendWithRetry(10, inner, new CompatibleMockSleeper());

		expect(inner.currentStatusCodeIndex).to.equal(4);
	});

	it("test return response if retry limit exceeded", async function () {
		let inner = new CompatibleMockSender(["500", "500", "500", "500", "500"]);
		const sleeper = new CompatibleMockSleeper();
		const response = await sendWithRetry(4, inner, sleeper);

		expect(response);
		expect(inner.currentStatusCodeIndex).to.equal(5);
		expect(response.statusCode).to.equal("500");
		expect(sleeper.sleepDurations).to.deep.equal([0, 1, 2, 3]);
	});

	it("test backoff does not exceed max", async function () {
		let inner = new CompatibleMockSender([
			"500",
			"500",
			"500",
			"500",
			"500",
			"500",
			"500",
			"500",
			"500",
			"500",
			"500",
			"500",
			"500",
			"200",
		]);
		const sleeper = new CompatibleMockSleeper();

		await sendWithRetry(20, inner, sleeper);

		expect(sleeper.sleepDurations).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10]);
	});

	it("test empty status does not retry", async function () {
		let inner = new CompatibleMockSender([]);
		await sendWithRetry(5, inner, new CompatibleMockSleeper());

		expect(inner.currentStatusCodeIndex).to.equal(1);
	});

	it("test sleep on rate limit", async function () {
		let inner = new CompatibleMockSender(["429", "200"]);
		const sleeper = new CompatibleMockSleeper();

		await sendWithRetry(5, inner, sleeper);

		expect(sleeper.sleepDurations).to.deep.equal([10]);
	});

	it("test rate limit error return", async function () {
		let inner = new CompatibleMockSender(["429"], { "Retry-After": 7 });
		const sleeper = new CompatibleMockSleeper();

		await sendWithRetry(10, inner, sleeper);

		expect(sleeper.sleepDurations).to.deep.equal([7]);
	});

	it("test retry after invalid value", async function () {
		let inner = new CompatibleMockSender(["429"], { "Retry-After": "a" });
		const sleeper = new CompatibleMockSleeper();

		await sendWithRetry(10, inner, sleeper);

		expect(sleeper.sleepDurations).to.deep.equal([10]);
	});

	it("test retry error", async function () {
		let inner = new CompatibleMockSender(["429"], undefined, "Big Bad");
		const sleeper = new CompatibleMockSleeper();

		const response = await sendWithRetry(10, inner, sleeper);

		expect(response.error).to.equal("Big Bad");
	});
});
