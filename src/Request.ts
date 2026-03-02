import { Request as IRequest } from "./types.js";

export default class Request implements IRequest {
	baseUrl: string;
	baseUrlParam: string;
	payload: string | object | null;
	headers: Record<string, string>;
	parameters: Record<string, string | number>;

	constructor(
		payload: string | object | null = null,
		headers: Record<string, string> = { "Content-Type": "application/json; charset=utf-8" },
	) {
		this.baseUrl = "";
		this.baseUrlParam = "";
		this.payload = payload;
		this.headers = headers;

		this.parameters = {};
	}
}
