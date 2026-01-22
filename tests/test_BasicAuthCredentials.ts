import { expect } from "chai";
import BasicAuthCredentials from "../src/BasicAuthCredentials.js";
import Request from "../src/Request.js";

describe("BasicAuthCredentials", function () {
	it("creates credentials with valid authId and authToken", function () {
		const credentials = new BasicAuthCredentials("testID", "testToken");

		expect(credentials).to.not.be.null;
	});

	it("throws error when authId is empty", function () {
		expect(() => new BasicAuthCredentials("", "testToken")).to.throw(
			"credentials (auth id, auth token) required",
		);
	});

	it("throws error when authToken is empty", function () {
		expect(() => new BasicAuthCredentials("testID", "")).to.throw(
			"credentials (auth id, auth token) required",
		);
	});

	it("throws error when both authId and authToken are empty", function () {
		expect(() => new BasicAuthCredentials("", "")).to.throw(
			"credentials (auth id, auth token) required",
		);
	});

	it("creates credentials with special characters", function () {
		const credentials = new BasicAuthCredentials("test@id#123", "token!@#$%^&*()");

		expect(credentials).to.not.be.null;
	});

	it("signs request with Authorization header", function () {
		const credentials = new BasicAuthCredentials("myID", "myToken");
		const request = new Request();

		credentials.sign(request);

		expect("Authorization" in request.headers).to.equal(true);
		const authHeader = request.headers["Authorization"] as string;
		expect(authHeader.startsWith("Basic ")).to.equal(true);

		const encoded = authHeader.substring(6);
		const decoded = Buffer.from(encoded, "base64").toString("utf-8");
		expect(decoded).to.equal("myID:myToken");
	});

	it("signs request with password containing colon", function () {
		const credentials = new BasicAuthCredentials("validUserID", "password:with:colons");
		const request = new Request();

		credentials.sign(request);

		const authHeader = request.headers["Authorization"] as string;
		const encoded = authHeader.substring(6);
		const decoded = Buffer.from(encoded, "base64").toString("utf-8");
		expect(decoded).to.equal("validUserID:password:with:colons");
	});

	it("signs request with special characters", function () {
		const credentials = new BasicAuthCredentials("user@domain.com", "p@ssw0rd!");
		const request = new Request();

		credentials.sign(request);

		const authHeader = request.headers["Authorization"] as string;
		const encoded = authHeader.substring(6);
		const decoded = Buffer.from(encoded, "base64").toString("utf-8");
		expect(decoded).to.equal("user@domain.com:p@ssw0rd!");
	});

	it("signs request with unicode characters", function () {
		const credentials = new BasicAuthCredentials("用户", "密码");
		const request = new Request();

		credentials.sign(request);

		const authHeader = request.headers["Authorization"] as string;
		const encoded = authHeader.substring(6);
		const decoded = Buffer.from(encoded, "base64").toString("utf-8");
		expect(decoded).to.equal("用户:密码");
	});

	it("overwrites existing Authorization header", function () {
		const credentials = new BasicAuthCredentials("newID", "newToken");
		const request = new Request();
		request.headers["Authorization"] = "Bearer oldtoken";

		credentials.sign(request);

		const authHeader = request.headers["Authorization"] as string;
		expect(authHeader.startsWith("Basic ")).to.equal(true);
		const encoded = authHeader.substring(6);
		const decoded = Buffer.from(encoded, "base64").toString("utf-8");
		expect(decoded).to.equal("newID:newToken");
	});
});
