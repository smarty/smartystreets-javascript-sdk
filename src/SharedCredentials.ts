import { Request } from "./types.js";

export default class SharedCredentials {
	private authId: string;
	private hostName: string | undefined;

	constructor(authId: string, hostName?: string) {
		this.authId = authId;
		this.hostName = hostName;
	}

	sign(request: Request): void {
		request.parameters["key"] = this.authId;
		if (this.hostName) request.headers["Referer"] = "https://" + this.hostName;
	}
}
