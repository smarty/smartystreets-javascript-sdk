import Axios, { AxiosInstance, AxiosProxyConfig, AxiosRequestConfig } from "axios";
import { buildSmartyResponse } from "./util/buildSmartyResponse.js";
import { Request as SmartyRequest, Response as SmartyResponse } from "./types.js";

export default class HttpSender {
	private axiosInstance: AxiosInstance;
	private timeout: number;
	private proxyConfig: AxiosProxyConfig | undefined;

	constructor(timeout: number = 10000, proxyConfig?: AxiosProxyConfig, debug: boolean = false) {
		this.axiosInstance = Axios.create();
		this.timeout = timeout;
		this.proxyConfig = proxyConfig;
		if (debug) this.enableDebug();
	}

	buildRequestConfig(request: SmartyRequest): AxiosRequestConfig {
		const config: AxiosRequestConfig = {
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

	send(request: SmartyRequest): Promise<SmartyResponse> {
		return new Promise((resolve, reject) => {
			const requestConfig = this.buildRequestConfig(request);

			this.axiosInstance(requestConfig)
				.then((response) => {
					const smartyResponse = buildSmartyResponse(response);

					if (smartyResponse.statusCode >= 400) return reject(smartyResponse);

					resolve(smartyResponse);
				})
				.catch((error) => reject(buildSmartyResponse(undefined, error)));
		});
	}

	private enableDebug(): void {
		this.axiosInstance.interceptors.request.use((request) => {
			console.log("Request:\r\n", request);
			console.log("\r\n*******************************************\r\n");
			return request;
		});

		this.axiosInstance.interceptors.response.use((response) => {
			console.log("Response:\r\n");
			console.log("Status:", response.status, response.statusText);
			console.log("Headers:", response.headers);
			console.log("Data:", response.data);
			return response;
		});
	}
}
