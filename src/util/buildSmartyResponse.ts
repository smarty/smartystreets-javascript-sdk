import Response from "../Response.js";

export function buildSmartyResponse(response?: Record<string, any>, error?: Error): Response {
	if (response)
		return new Response(response.status, response.data, response.error, response.headers);
	return new Response(0, null, error);
}
