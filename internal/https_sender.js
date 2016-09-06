var https = require("https");

var sender = function () {};

sender.prototype.send = function (options) {
	options.method = "POST";

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

		request.end()
		request.on("error", (err) => reject(err));
	});
};

module.exports = sender;