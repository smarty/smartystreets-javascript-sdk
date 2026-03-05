import { expect } from "chai";
import StaticCredentials from "../src/StaticCredentials.js";
import ClientBuilder from "../src/ClientBuilder.js";

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
});
