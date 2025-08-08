import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { buildSmartyResponse } from "./util/buildSmartyResponse";
import { Request, Response } from "./types";

interface ProxyConfig {
	host: string;
	port: number;
	protocol: string;
	auth?: {
		username: string;
		password: string;
	};
}

export default class HttpSender {
	private axiosInstance: AxiosInstance;
	private timeout: number;
	private proxyConfig?: ProxyConfig;

	constructor(timeout = 10000, proxyConfig?: ProxyConfig, debug = false) {
		this.axiosInstance = axios.create();
		this.timeout = timeout;
		this.proxyConfig = proxyConfig;
		if (debug) this.enableDebug();
	}

	private buildRequestConfig(request: Request): AxiosRequestConfig {
		let config: AxiosRequestConfig = {
			method: "GET",
			timeout: this.timeout,
			params: request.parameters,
			headers: request.headers,
			baseURL: request.baseUrl,
			validateStatus: function (status: number) {
				return status < 500;
			},
		};

		if (request.payload) {
			config.method = "POST";
			config.data = request.payload;
		}

		if (this.proxyConfig) config.proxy = this.proxyConfig;
		return config;
	}

	async send(request: Request): Promise<Response> {
		try {
			const requestConfig = this.buildRequestConfig(request);
			const response = await this.axiosInstance(requestConfig);
			const smartyResponse = buildSmartyResponse(response);

			if (smartyResponse.statusCode >= 400) {
				throw smartyResponse;
			}

			return smartyResponse;
		} catch (error) {
			throw buildSmartyResponse(undefined, error);
		}
	}

	private enableDebug(): void {
		this.axiosInstance.interceptors.request.use((request: any) => {
			console.log("Request:\r\n", request);
			console.log("\r\n*******************************************\r\n");
			return request;
		});

		this.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
			console.log("Response:\r\n");
			console.log("Status:", response.status, response.statusText);
			console.log("Headers:", response.headers);
			console.log("Data:", response.data);
			return response;
		});
	}
}

