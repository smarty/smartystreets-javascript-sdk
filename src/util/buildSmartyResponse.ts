import Response from "../Response.js";

interface HttpResponse {
	status: number;
	data?: object[] | object | string | null | undefined;
	error?: string | Error | undefined;
	headers?: Record<string, string> | undefined;
}

export function buildSmartyResponse(response?: HttpResponse, error?: Error): Response {
	if (response)
		return new Response(response.status, response.data, response.error, response.headers);
	return new Response(0, null, error);
}
