import { expect } from "chai";
import LicenseSender from "../src/LicenseSender.js";
import Request from "../src/Request.js";

describe("A license sender", function () {
	let innerSender: any;
	let request: any;
	let licenses: any;
	let licenseSender: any;

	beforeEach(() => {
		innerSender = {
			send: () => Promise.resolve(),
		};
		request = new Request();
	});

	it("appends licenses to parameters.", function () {
		licenses = ["0", "1", "2"];
		licenseSender = new LicenseSender(innerSender, licenses);
		licenseSender.send(request);

		expect(request.parameters).contains({ license: "0,1,2" });
	});

	it("doesn't append license to query if array is empty.", function () {
		licenses = [];
		licenseSender = new LicenseSender(innerSender, licenses);
		licenseSender.send(request);

		expect(request.parameters).to.not.have.property("license");
	});

	it("returns a promise.", function () {
		licenses = [];
		licenseSender = new LicenseSender(innerSender, licenses);
		expect(licenseSender.send(request) instanceof Promise).to.equal(true);
	});
});
