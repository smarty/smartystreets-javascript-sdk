export interface Request {
	baseUrl: string;
	baseUrlParam: string;
	payload: string | object | null;
	headers: Record<string, string>;
	parameters: Record<string, string | number>;
}

export interface Response {
	statusCode: number;
	payload: object[] | object | string | null;
	error: Error | string | null;
	headers: Record<string, string>;
}

export interface Sender {
	send(request: Request): Promise<Response>;
}

export interface Sleeper {
	sleep(seconds: number): Promise<void>;
}

export interface Signer {
	sign(request: Request): void;
}

export interface ProxyConfig {
	url: string;
}

export interface BaseLookup {
	inputId?: string | number | undefined;
	customParameters: Record<string, string>;
	result: { inputIndex: number }[];
}
