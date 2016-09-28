var chai = require("chai"),
	chaiAsPromised = require("chai-as-promised"),
	expect = chai.expect,
	sign = require("../internal/credential_signer.js");

chai.use(chaiAsPromised);

describe ("Test signing request objects with user credentials", () => {
	it ("expects the path property of a https options object to include fields for credentials", () => {
		var options = {
			path: "/street-address"
		},
		credentials = {
			authId: "",
			authToken: ""
		},
		signedOptions = sign(options, credentials);
		expect(signedOptions.path).to.have.lengthOf(36);
	});

	it ("expects the path property of a https options object to include credentials when they are passed", () => {
		var options = {
			path: "/street-address"
		},
		credentials = {
			authId: "a",
			authToken: "a"
		},
		signedOptions = sign(options, credentials);
		expect(signedOptions.path).to.have.lengthOf(38);
	});
});