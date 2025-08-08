import { buildSmartyResponse } from "../../src/util/buildSmartyResponse.js";
import Response from "../../src/Response.js";

export class MockSender {
	request: { payload: any; parameters: any; baseUrlParam: any };
	constructor() {
		const request = {
			payload: undefined,
			parameters: undefined,
			baseUrlParam: undefined,
		};
		this.request = request;
	}

	send(clientRequest: any) {
		this.request.payload = clientRequest.payload;
		this.request.parameters = clientRequest.parameters;
		this.request.baseUrlParam = clientRequest.baseUrlParam;
	}
}

export class MockSenderWithResponse {
	private statusCodes?: string[];
	private headers?: Record<string, unknown>;
	private error?: unknown;
	currentStatusCodeIndex: number = 0;
	private expectedPayload?: any;

	constructor(expectedPayload?: any, expectedError?: any) {
		this.expectedPayload = expectedPayload;
		this.error = expectedError;
	}

	send() {
		return new Promise<Response>((resolve) => {
			resolve(new Response("", this.expectedPayload as any, this.error as any, {}));
		});
	}
}

export class MockSenderWithStatusCodesAndHeaders {
	statusCodes: string[];
	headers?: Record<string, unknown>;
	error?: unknown;
	currentStatusCodeIndex: number = 0;

	constructor(statusCodes: string[], headers: Record<string, unknown> | undefined = undefined, error: unknown = undefined) {
		this.statusCodes = statusCodes;
		this.headers = headers;
		this.error = error;
	}

	send() {
		const mockResponse = {
			status: this.statusCodes[this.currentStatusCodeIndex],
			headers: this.headers,
			error: this.error,
		};
		const response = buildSmartyResponse(mockResponse);
		this.currentStatusCodeIndex += 1;
		return response;
	}
}
