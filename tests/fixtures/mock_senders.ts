import { buildSmartyResponse } from "../../src/util/buildSmartyResponse.js";
import Response from "../../src/Response.js";
import { Request as IRequest, Response as IResponse } from "../../src/types.js";

export class MockSender {
	request: {
		payload: string | object | null;
		parameters: Record<string, string | number>;
		baseUrlParam: string;
	};

	constructor() {
		this.request = {
			payload: null,
			parameters: {},
			baseUrlParam: "",
		};
	}

	send(clientRequest: IRequest): Promise<IResponse> {
		this.request.payload = clientRequest.payload;
		this.request.parameters = clientRequest.parameters;
		this.request.baseUrlParam = clientRequest.baseUrlParam;
		return undefined as unknown as Promise<IResponse>;
	}
}

export class MockSenderWithResponse {
	private expectedPayload: object[] | object | string | null;
	private expectedError: Error | null;

	constructor(expectedPayload: object[] | object | string | null, expectedError?: Error | null) {
		this.expectedPayload = expectedPayload;
		this.expectedError = expectedError ?? null;
	}

	send(): Promise<IResponse> {
		return new Promise((resolve) => {
			resolve(new Response(0, this.expectedPayload, this.expectedError));
		});
	}
}

export class MockSenderWithStatusCodesAndHeaders {
	statusCodes: number[];
	headers: Record<string, string> | undefined;
	error: string | undefined;
	currentStatusCodeIndex: number;

	constructor(statusCodes: number[], headers?: Record<string, string>, error?: string) {
		this.statusCodes = statusCodes;
		this.headers = headers;
		this.error = error;
		this.currentStatusCodeIndex = 0;
	}

	async send(_request: IRequest): Promise<IResponse> {
		const mockResponse = {
			status: this.statusCodes[this.currentStatusCodeIndex],
			headers: this.headers,
			error: this.error,
		};
		const response = buildSmartyResponse(mockResponse);
		this.currentStatusCodeIndex += 1;
		if (response.statusCode >= 400) throw response;
		return response;
	}
}
