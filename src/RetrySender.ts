import { Request, Response, Sender, Sleeper } from "./types";

export default class RetrySender {
	private maxRetries: number;
	private statusToRetry: number[];
	private statusTooManyRequests: number;
	private maxBackoffDuration: number;
	private inner: Sender;
	private sleeper: Sleeper;

	constructor(maxRetries: number = 5, inner: Sender, sleeper: Sleeper) {
		this.maxRetries = maxRetries;
		this.statusToRetry = [408, 429, 500, 502, 503, 504];
		this.statusTooManyRequests = 429;
		this.maxBackoffDuration = 10;
		this.inner = inner;
		this.sleeper = sleeper;
	}

	async send(request: Request): Promise<Response> {
		let response = await this.trySend(request);

		for (let i = 0; i < this.maxRetries; i++) {
			const statusCode = response.statusCode;
			if (!this.statusToRetry.includes(statusCode)) {
				break;
			}

			if (statusCode === this.statusTooManyRequests) {
				let secondsToBackoff = 10;
				if (response.headers) {
					const retryAfterHeader = response.headers["retry-after"];
					if (Number.isInteger(Number(retryAfterHeader))) {
						secondsToBackoff = Number(retryAfterHeader);
					}
				}
				await this.rateLimitBackOff(secondsToBackoff);
			} else {
				await this.backoff(i);
			}
			response = await this.trySend(request);
		}

		return response;
	}

	private async trySend(request: Request): Promise<Response> {
		try {
			return await this.inner.send(request);
		} catch (error) {
			if (error && typeof error === "object" && "statusCode" in error) {
				return error as Response;
			}
			throw error;
		}
	}

	private async backoff(attempt: number): Promise<void> {
		const backoffDuration = Math.min(attempt, this.maxBackoffDuration);
		console.log(
			`There was an error processing the request. Retrying in ${backoffDuration} seconds...`,
		);
		await this.sleeper.sleep(backoffDuration);
	}

	private async rateLimitBackOff(backoffDuration: number): Promise<void> {
		console.log(`Rate limit reached. Retrying in ${backoffDuration} seconds...`);
		await this.sleeper.sleep(backoffDuration);
	}
}
