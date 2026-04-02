import { buildSmartyResponse } from "./util/buildSmartyResponse.js";
import { Request as SmartyRequest, Response as SmartyResponse } from "./types.js";

type FetchFunction = typeof fetch;

export default class HttpSender {
	private timeout: number;
	private debug: boolean;
	private fetchFn: FetchFunction | undefined;
	private dispatcher: import("undici").Dispatcher | undefined;

	constructor(
		timeout: number = 10000,
		proxyConfig?: { url: string },
		debug = false,
		fetchFn?: FetchFunction,
	) {
		this.timeout = timeout;
		this.debug = debug;
		this.fetchFn = fetchFn;

		if (proxyConfig) {
			this.initProxy(proxyConfig);
		}
	}

	private resolveFetch(): FetchFunction {
		if (this.fetchFn) return this.fetchFn;
		if (typeof globalThis.fetch === "function") {
			this.fetchFn = globalThis.fetch.bind(globalThis);
			return this.fetchFn;
		}
		throw new Error("No fetch implementation available. Provide one via the fetchFn constructor parameter.");
	}

	private initProxy(config: { url: string }): void {
		try {
			// eslint-disable-next-line @typescript-eslint/no-require-imports
			const { ProxyAgent } = require("undici");
			this.dispatcher = new ProxyAgent(config.url);
		} catch {
			throw new Error(
				"The 'undici' package is required for proxy support. Install it with: npm install undici",
			);
		}
	}

	buildFetchArgs(request: SmartyRequest): { url: string; init: RequestInit } {
		const url = this.buildUrl(request);

		const init: RequestInit = {
			method: request.payload ? "POST" : "GET",
			headers: request.headers,
			signal: AbortSignal.timeout(this.timeout),
		};

		if (request.payload) {
			init.body =
				typeof request.payload === "string"
					? request.payload
					: JSON.stringify(request.payload);
		}

		if (this.dispatcher) {
			(init as Record<string, unknown>)["dispatcher"] = this.dispatcher;
		}

		return { url, init };
	}

	async send(request: SmartyRequest): Promise<SmartyResponse> {
		const fetchFn = this.resolveFetch();
		const { url, init } = this.buildFetchArgs(request);

		if (this.debug) {
			console.log("Request:\r\n", { url, ...init });
			console.log("\r\n*******************************************\r\n");
		}

		try {
			const response = await fetchFn(url, init);
			const data = await this.parseResponseBody(response);
			const headers = Object.fromEntries(response.headers.entries());

			if (this.debug) {
				console.log("Response:\r\n");
				console.log("Status:", response.status, response.statusText);
				console.log("Headers:", headers);
				console.log("Data:", data);
			}

			const smartyResponse = buildSmartyResponse({ status: response.status, data, headers });

			if (smartyResponse.statusCode >= 400) throw smartyResponse;

			return smartyResponse;
		} catch (error) {
			if (error && typeof error === "object" && "statusCode" in error) throw error;
			throw buildSmartyResponse(undefined, error instanceof Error ? error : new Error(String(error)));
		}
	}

	private buildUrl(request: SmartyRequest): string {
		if (!request.baseUrl || !/^https?:\/\//i.test(request.baseUrl)) {
			throw new Error(`Invalid baseUrl: "${request.baseUrl}". Expected an absolute HTTP(S) URL.`);
		}
		const url = new URL(request.baseUrl);
		for (const [key, value] of Object.entries(request.parameters)) {
			url.searchParams.append(key, String(value));
		}
		return url.toString();
	}

	private async parseResponseBody(
		response: globalThis.Response,
	): Promise<object[] | object | string | null> {
		const contentType = response.headers.get("content-type") ?? "";
		if (contentType.includes("application/json")) {
			return await response.json();
		}
		const text = await response.text();
		return text || null;
	}
}
