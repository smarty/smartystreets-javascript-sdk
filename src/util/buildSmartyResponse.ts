import Response from "../Response.js";

interface HttpResponse {
	status: number;
	data?: object[] | object | string | null | undefined;
	error?: string | Error | undefined;
	headers?: Record<string, string> | undefined;
}

function normalizeError(error: string | Error | undefined | null): Error | null {
	if (error == null) return null;
	return error instanceof Error ? error : new Error(error);
}

export function buildSmartyResponse(response?: HttpResponse, error?: Error): Response {
	if (response)
		return new Response(
			response.status,
			response.data,
			normalizeError(response.error),
			response.headers,
		);
	return new Response(0, null, error);
}
