export default class Request {
	public baseUrl: string = "";
	public baseUrlParam: string = "";
	public payload: string | object | null;
	public headers: Record<string, string>;
	public parameters: Record<string, string | number>;

	constructor(
		payload?: string | object | null,
		headers: Record<string, string> = { "Content-Type": "application/json; charset=utf-8" },
	) {
		this.payload = payload || null;
		this.headers = headers;
		this.parameters = {};
	}
}
