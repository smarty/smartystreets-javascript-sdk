import { Response as IResponse } from "./types.js";

export default class Response implements IResponse {
	statusCode: number;
	payload: object[] | object | string | null;
	error: Error | null;
	headers: Record<string, string>;

	constructor(
		statusCode: number,
		payload: object[] | object | string | null = null,
		error: Error | null = null,
		headers: Record<string, string> = {},
	) {
		this.statusCode = statusCode;
		this.payload = payload;
		this.error = error;
		this.headers = headers;
	}
}
