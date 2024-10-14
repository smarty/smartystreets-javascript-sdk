import {SharedCredentials} from "./SharedCredentials.js";
import {UnprocessableEntityError} from "./Errors.js";

export class SigningSender {
	constructor(innerSender, signer) {
		this.signer = signer;
		this.sender = innerSender;
	}

	send(request) {
		const sendingPostWithSharedCredentials = request.payload && this.signer instanceof SharedCredentials;
		if (sendingPostWithSharedCredentials) {
			const message = "Shared credentials cannot be used in batches with a length greater than 1 or when using the US Extract API.";
			throw new UnprocessableEntityError(message);
		}

		return new Promise((resolve, reject) => {
			this.signer.sign(request);
			this.sender.send(request)
				.then(resolve)
				.catch(reject);
		});
	}
}
