var https = require("https"),
	sign = require("./credential_signer");

var send = function (credentials, data, options) {
	options = setApiOptions(options);
	options = sign(options, credentials);
	// console.log(options);

	return new Promise((resolve, reject) => {
		var request = https.request(options, (response) => {
			var body = "";

			if (response.statusCode != 200) {
				reject(response.statusCode);
			}

			response.on("data", (data) => {
				body += data;
			});

			response.on("end", () => resolve(body));
		});

		request.write(JSON.stringify(data));

		request.end();
		request.on("error", (err) => reject(err));
	});
};

var setApiOptions = (options) => {
	options.method = "POST";
	options.headers = {
		"Content-Type": "application/json",
		"Host": "us-street.api.smartystreets.com"
	};
	
	return options;	
}

module.exports = send;