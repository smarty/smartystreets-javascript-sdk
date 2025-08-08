export default class Response {
	public statusCode: number;
	public payload: object[] | object | string | null;
	public error: Error | null;
	public headers: Record<string, string>;

	constructor(
		statusCode: number,
		payload: object[] | object | string | null,
		error: Error | null,
		headers: Record<string, string>,
	) {
		this.statusCode = statusCode;
		this.payload = payload;
		this.error = error;
		this.headers = headers;
	}
}

