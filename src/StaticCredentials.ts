import { Request } from "./types";

export default class StaticCredentials {
	private authId: string;
	private authToken: string;

	constructor(authId: string, authToken: string) {
		this.authId = authId;
		this.authToken = authToken;
	}

	sign(request: Request): void {
		request.parameters["auth-id"] = this.authId;
		request.parameters["auth-token"] = this.authToken;
	}
}
