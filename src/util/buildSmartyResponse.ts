import Response from "../Response.js";

interface AxiosLikeResponse {
	status: number;
	data?: object[] | object | string | null | undefined;
	error?: any;
	headers?: Record<string, any> | undefined;
}

export function buildSmartyResponse(response?: AxiosLikeResponse, error?: Error): Response {
	if (response)
		return new Response(response.status, response.data, response.error, response.headers);
	return new Response(0, null, error);
}
