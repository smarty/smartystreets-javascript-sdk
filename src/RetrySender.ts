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
		let response = await this.inner.send(request);

		for (let i = 0; i < this.maxRetries; i++) {
			const statusCode = parseInt(String(response.statusCode));
			if (!this.statusToRetry.includes(statusCode)) {
				break;
			}

			if (statusCode === this.statusTooManyRequests) {
				let secondsToBackoff = 10;
				if (response.headers) {
					const retryAfterHeader = response.headers["Retry-After"];
					if (Number.isInteger(Number(retryAfterHeader))) {
						secondsToBackoff = Number(retryAfterHeader);
					}
				}
				await this.rateLimitBackOff(secondsToBackoff);
			} else {
				await this.backoff(i);
			}
			response = await this.inner.send(request);
		}

		return response;
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
