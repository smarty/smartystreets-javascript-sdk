const Response = require("../Response.js");

function buildSmartyResponse(response, error) {
	if (response) return new Response(response.status, response.data);
	return new Response(undefined, undefined, error)
}

module.exports = {
	buildSmartyResponse
};