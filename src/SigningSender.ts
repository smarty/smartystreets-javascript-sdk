import { Request, Response, Sender, Signer } from "./types.js";
import SharedCredentials from "./SharedCredentials.js";
import { UnprocessableEntityError } from "./Errors.js";

export default class SigningSender {
	private signer: Signer;
	private sender: Sender;

	constructor(innerSender: Sender, signer: Signer) {
		this.signer = signer;
		this.sender = innerSender;
	}

	send(request: Request): Promise<Response> {
		const sendingPostWithSharedCredentials =
			request.payload && this.signer instanceof SharedCredentials;
		if (sendingPostWithSharedCredentials) {
			const message =
				"Shared credentials cannot be used in batches with a length greater than 1 or when using the US Extract API.";
			throw new UnprocessableEntityError(message);
		}

		this.signer.sign(request);
		return this.sender.send(request);
	}
}
