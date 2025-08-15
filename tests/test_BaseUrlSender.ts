import { expect } from "chai";
import BaseUrlSender from "../src/BaseUrlSender";
import Request from "../src/Request";
import Response from "../src/Response";
import { Sender } from "../src/types";

describe("A base url sender", function () {
	let innerSender: Sender;
	let request: Request;
	let urlOverride: string;
	let baseUrlSender: BaseUrlSender;

	beforeEach(() => {
		innerSender = {
			send: () => Promise.resolve(new Response(200, {})),
		};
		request = new Request();
		urlOverride = "I'm in your base, killing your mans.";
		baseUrlSender = new BaseUrlSender(innerSender, urlOverride);
	});

	it("replaces the request's base url with a new value.", function () {
		request.baseUrl = "All your baseUrl are belong to us.";
		baseUrlSender.send(request);

		expect(request.baseUrl).to.equal(urlOverride);
	});

	it("returns a promise.", function () {
		expect(baseUrlSender.send(request) instanceof Promise).to.equal(true);
	});
});
