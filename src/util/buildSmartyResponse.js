const Response = require("../Response.js");

function buildSmartyResponse(response, error) {
	if (response) return new Response(response.status, response.data, response.error, response.headers);
	return new Response(undefined, undefined, error)
}

module.exports = {
	buildSmartyResponse
};