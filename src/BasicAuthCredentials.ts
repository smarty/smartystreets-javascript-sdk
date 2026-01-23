import { Request } from "./types";

export default class BasicAuthCredentials {
	private authId: string;
	private authToken: string;

	constructor(authId: string, authToken: string) {
		if (!authId || !authToken) {
			throw new Error("credentials (auth id, auth token) required");
		}
		this.authId = authId;
		this.authToken = authToken;
	}

	sign(request: Request): void {
		const encoded = Buffer.from(`${this.authId}:${this.authToken}`).toString("base64");
		request.headers["Authorization"] = `Basic ${encoded}`;
	}
}
