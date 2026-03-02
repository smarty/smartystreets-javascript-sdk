import { buildSmartyResponse } from "../../src/util/buildSmartyResponse.js";
import Response from "../../src/Response.js";

export class MockSender {
	request: {
		payload: any;
		parameters: any;
		baseUrlParam: any;
	};

	constructor() {
		this.request = {
			payload: undefined,
			parameters: undefined,
			baseUrlParam: undefined,
		};
	}

	send(clientRequest: any): any {
		this.request.payload = clientRequest.payload;
		this.request.parameters = clientRequest.parameters;
		this.request.baseUrlParam = clientRequest.baseUrlParam;
	}
}

export class MockSenderWithResponse {
	private expectedPayload: any;
	private expectedError: any;

	constructor(expectedPayload: any, expectedError?: any) {
		this.expectedPayload = expectedPayload;
		this.expectedError = expectedError;
	}

	send(): Promise<any> {
		return new Promise((resolve) => {
			resolve(new Response(0, this.expectedPayload, this.expectedError));
		});
	}
}

export class MockSenderWithStatusCodesAndHeaders {
	statusCodes: any[];
	headers: any;
	error: any;
	currentStatusCodeIndex: number;

	constructor(statusCodes: any[], headers?: any, error?: any) {
		this.statusCodes = statusCodes;
		this.headers = headers;
		this.error = error;
		this.currentStatusCodeIndex = 0;
	}

	send(_request: any) {
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
