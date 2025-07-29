import { expect } from "chai";
import Request from "../src/Request.js";
import Response from "../src/Response.js";
import SigningSender from "../src/SigningSender.js";
import StaticCredentials from "../src/StaticCredentials.js";
import SharedCredentials from "../src/SharedCredentials.js";
import { UnprocessableEntityError } from "../src/Errors.js";

describe("A signing sender", function () {
	const mockAuthId = "testId";
	const mockAuthToken = "testToken";
	const mockHostName = "testHostName";
	const mockSender = {
		send: (_request: Request) => Promise.resolve(new Response(200, {})),
	};
	let request: Request;

	beforeEach(function () {
		request = new Request();
	});

	it("signs a request with static credentials.", function () {
		const staticCredentials = new StaticCredentials(mockAuthId, mockAuthToken);
		const signingSender = new SigningSender(mockSender, staticCredentials);

		signingSender.send(request);

		expect("auth-id" in request.parameters).to.equal(true);
		expect((request.parameters as Record<string, string>)["auth-id"]).to.equal(mockAuthId);
		expect("auth-token" in request.parameters).to.equal(true);
		expect((request.parameters as Record<string, string>)["auth-token"]).to.equal(mockAuthToken);
	});

	it("signs a request with shared credentials.", function () {
		const sharedCredentials = new SharedCredentials(mockAuthId, mockHostName);
		const signingSender = new SigningSender(mockSender, sharedCredentials);

		signingSender.send(request);

		expect("key" in request.parameters).to.equal(true);
		expect((request.parameters as Record<string, string>)["key"]).to.equal(mockAuthId);
		expect("Referer" in request.headers).to.equal(true);
		expect((request.headers as Record<string, string>)["Referer"]).to.equal("https://" + mockHostName);
	});

	it("errors if signing a POST request with shared credentials.", function () {
		const sharedCredentials = new SharedCredentials(mockAuthId, mockHostName);
		const signingSender = new SigningSender(mockSender, sharedCredentials);
		const mockRequestPayload = {
			foo: "bar",
		};
		request.payload = mockRequestPayload;

		expect(() => signingSender.send(request)).to.throw(UnprocessableEntityError);
	});
});
