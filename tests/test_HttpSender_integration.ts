import { expect } from "chai";
import * as http from "node:http";
import Request from "../src/Request.js";
import HttpSender from "../src/HttpSender.js";

let server: http.Server;
let baseUrl: string;

function startServer(handler: http.RequestListener): Promise<void> {
	return new Promise((resolve) => {
		server = http.createServer(handler);
		server.listen(0, "127.0.0.1", () => {
			const addr = server.address() as { port: number };
			baseUrl = `http://127.0.0.1:${addr.port}`;
			resolve();
		});
	});
}

function stopServer(): Promise<void> {
	return new Promise((resolve) => server.close(() => resolve()));
}

describe("HttpSender integration (real fetch against local server)", function () {
	afterEach(async function () {
		if (server) await stopServer();
	});

	it("sends a GET request and receives a JSON response.", async function () {
		await startServer((req, res) => {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ method: req.method, url: req.url }));
		});

		const request = new Request();
		request.baseUrl = baseUrl + "/lookup";
		request.parameters["auth-id"] = "123";
		request.parameters["zipcode"] = "20500";

		const sender = new HttpSender();
		const response = await sender.send(request);

		expect(response.statusCode).to.equal(200);
		const payload = response.payload as { method: string; url: string };
		expect(payload.method).to.equal("GET");
		expect(payload.url).to.include("auth-id=123");
		expect(payload.url).to.include("zipcode=20500");
	});

	it("sends a POST request with a JSON body.", async function () {
		let receivedBody = "";
		let receivedContentType = "";

		await startServer((req, res) => {
			receivedContentType = req.headers["content-type"] ?? "";
			req.on("data", (chunk: Buffer) => (receivedBody += chunk.toString()));
			req.on("end", () => {
				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ method: req.method, body: JSON.parse(receivedBody) }));
			});
		});

		const payload = [{ street: "123 Main St" }, { street: "456 Oak Ave" }];
		const request = new Request(payload);
		request.baseUrl = baseUrl + "/street-address";

		const sender = new HttpSender();
		const response = await sender.send(request);

		expect(response.statusCode).to.equal(200);
		expect(receivedContentType).to.include("application/json");
		const result = response.payload as { method: string; body: object[] };
		expect(result.method).to.equal("POST");
		expect(result.body).to.deep.equal(payload);
	});

	it("rejects with the correct status on a 401 response.", async function () {
		await startServer((_req, res) => {
			res.writeHead(401, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "unauthorized" }));
		});

		const request = new Request();
		request.baseUrl = baseUrl + "/lookup";

		const sender = new HttpSender();

		try {
			await sender.send(request);
			expect.fail("should have rejected");
		} catch (error: any) {
			expect(error.statusCode).to.equal(401);
		}
	});

	it("rejects with status 0 on a connection error.", async function () {
		const request = new Request();
		request.baseUrl = "http://127.0.0.1:1"; // nothing listening

		const sender = new HttpSender(1000);

		try {
			await sender.send(request);
			expect.fail("should have rejected");
		} catch (error: any) {
			expect(error.statusCode).to.equal(0);
			expect(error.error).to.be.an("error");
		}
	});

	it("preserves custom headers through the request.", async function () {
		let receivedHeaders: http.IncomingHttpHeaders = {};

		await startServer((req, res) => {
			receivedHeaders = req.headers;
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({}));
		});

		const request = new Request();
		request.baseUrl = baseUrl + "/lookup";
		request.headers["X-Custom"] = "test-value";

		const sender = new HttpSender();
		await sender.send(request);

		expect(receivedHeaders["x-custom"]).to.equal("test-value");
	});

	it("returns response headers to the caller.", async function () {
		await startServer((_req, res) => {
			res.writeHead(200, {
				"Content-Type": "application/json",
				"X-RateLimit-Remaining": "99",
			});
			res.end(JSON.stringify({}));
		});

		const request = new Request();
		request.baseUrl = baseUrl + "/lookup";

		const sender = new HttpSender();
		const response = await sender.send(request);

		expect(response.headers["x-ratelimit-remaining"]).to.equal("99");
	});

	it("handles a plain text response.", async function () {
		await startServer((_req, res) => {
			res.writeHead(200, { "Content-Type": "text/plain" });
			res.end("plain text body");
		});

		const request = new Request();
		request.baseUrl = baseUrl + "/lookup";

		const sender = new HttpSender();
		const response = await sender.send(request);

		expect(response.statusCode).to.equal(200);
		expect(response.payload).to.equal("plain text body");
	});

	it("times out when the server is too slow.", async function () {
		await startServer((_req, _res) => {
			// never respond
		});

		const request = new Request();
		request.baseUrl = baseUrl + "/lookup";

		const sender = new HttpSender(100); // 100ms timeout

		try {
			await sender.send(request);
			expect.fail("should have rejected");
		} catch (error: any) {
			expect(error.statusCode).to.equal(0);
			expect(error.error).to.not.be.null;
		}
	});
});
