import { expect } from "chai";
import StaticCredentials from "../src/StaticCredentials.js";
import ClientBuilder from "../src/ClientBuilder.js";
import Lookup from "../src/us_street/Lookup.js";
import { Request as IRequest, Response as IResponse, Sender } from "../src/types.js";

describe("ClientBuilder", function () {
	const credentials = new StaticCredentials("test-id", "test-token");

	it("sets the iana-timezone feature flag.", function () {
		const builder = new ClientBuilder(credentials);
		builder.withFeatureIANATimeZone();

		expect((builder as any).customQueries.get("features")).to.equal("iana-timezone");
	});

	it("appends iana-timezone when combined with component-analysis.", function () {
		const builder = new ClientBuilder(credentials);
		builder.withFeatureComponentAnalysis();
		builder.withFeatureIANATimeZone();

		expect((builder as any).customQueries.get("features")).to.equal(
			"component-analysis,iana-timezone",
		);
	});

	it("wraps a custom http sender with the full middleware chain (baseUrl and auth are set).", async function () {
		let capturedRequest: IRequest | undefined;
		const capturingSender: Sender = {
			send(request: IRequest): Promise<IResponse> {
				capturedRequest = request;
				return Promise.resolve({ statusCode: 200, payload: [], error: null, headers: {} });
			},
		};

		const client = new ClientBuilder(credentials).withSender(capturingSender).buildUsStreetApiClient();

		const lookup = new Lookup();
		lookup.street = "1 Rosedale";
		await client.send(lookup);

		expect(capturedRequest!.baseUrl).to.include("us-street.api.smarty.com");
		expect(capturedRequest!.parameters["auth-id"]).to.equal("test-id");
		expect(capturedRequest!.parameters["auth-token"]).to.equal("test-token");
	});
});
