export interface Request {
	baseUrl: string;
	baseUrlParam: string;
	payload: string | object | null;
	headers: Record<string, string>;
	parameters: Record<string, string | number>;
}

export interface Response {
	statusCode: string | number;
	payload: object[] | object | string | null;
	error: Error | null;
	headers: Record<string, string>;
}

export interface Sender {
	send(request: Request): Promise<Response>;
}

export interface Sleeper {
	sleep(seconds: number): Promise<void>;
}

export interface MockSenderInstance extends Sender {
	statusCodes: string[];
	headers?: Record<string, unknown> | undefined;
	error?: string | undefined;
	currentStatusCodeIndex: number;
}

export interface MockSleeperInstance extends Sleeper {
	sleepDurations: number[];
}
