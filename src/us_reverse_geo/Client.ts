import Request from "../Request";
import Response from "./Response";
import buildInputData from "../util/buildInputData";
import apiToSDKKeyMap from "../util/apiToSDKKeyMap";
import { UndefinedLookupError } from "../Errors";
import { Sender } from "../types";
import Lookup from "./Lookup";

/**
 * This client sends lookups to the Smarty US Reverse Geo API, <br>
 *     and attaches the results to the appropriate Lookup objects.
 */
export default class Client {
	private sender: Sender;

	constructor(sender: Sender) {
		this.sender = sender;
	}

	async send(lookup: Lookup): Promise<Lookup> {
		if (typeof lookup === "undefined") throw new UndefinedLookupError();

		const request = new Request(null);
		request.parameters = buildInputData(lookup, apiToSDKKeyMap.usReverseGeo);

		try {
			const response = await this.sender.send(request);

			if (response.error) throw response.error;

			return attachLookupResults(response, lookup);
		} catch (error) {
			throw error;
		}

		function attachLookupResults(response: any, lookup: Lookup): Lookup {
			lookup.response = new Response(response.payload);
			return lookup;
		}
	}
}
