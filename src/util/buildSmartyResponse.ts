import Response from "../Response";

export function buildSmartyResponse(response?: any, error?: any): Response {
	if (response) {
		return new Response(response.status, response.data, response.error, response.headers);
	}
	return new Response(0, null, error, {});
}
