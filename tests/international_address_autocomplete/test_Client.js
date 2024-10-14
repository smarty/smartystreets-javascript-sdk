import { mockSenders } from "../fixtures/mock_senders.js";
import { Client } from "../../src/international_address_autocomplete/Client.js";
import { Lookup } from "../../src/international_address_autocomplete/Lookup.js";
import { UndefinedLookupError } from "../../src/Errors.js";
import { Suggestion } from "../../src/international_address_autocomplete/Suggestion.js";
import { expect } from "chai";

describe("An International Address Autocomplete Client", function () {
  it("correctly builds parameter", function () {
    let mockSender = new mockSenders.MockSender();
    let client = new Client(mockSender);
    let search = "(";
    let lookup = new Lookup({ search });
    let expectedParameters = {
      max_results: 5,
      search: "(",
    };

    client.send(lookup);
    expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
  });

  it("builds parameters for different country", function () {
    let mockSender = new mockSenders.MockSender();
    let client = new Client(mockSender);
    let search = "(";
    let lookup = new Lookup({ search });
    lookup.search = search;
    lookup.country = "Russia";
    let expectedParameters = {
      country: "Russia",
      max_results: 5,
      search: search,
    };

    client.send(lookup);
    expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
  });

  it("builds parameters with different max results", function () {
    let mockSender = new mockSenders.MockSender();
    let client = new Client(mockSender);
    let search = "(";
    let lookup = new Lookup({ search });
    lookup.search = search;
    lookup.maxResults = 10;
    let expectedParameters = {
      max_results: 10,
      search: search,
    };

    client.send(lookup);
    expect(mockSender.request.parameters).to.deep.equal(expectedParameters);
  });

  it("throws an error if sending without a lookup.", function () {
    let mockSender = new mockSenders.MockSender();
    let client = new Client(mockSender);
    expect(client.send).to.throw(UndefinedLookupError);
  });

  it("attaches suggestions from a response to a lookup", function () {
    const responseData = {
      candidates: [
        {
          street: "L alleya",
          locality: "Novosibirsk",
          administrative_area: "Novosibirskaya oblast'",
          postal_code: "40000",
          country_iso3: "RUS",
        },
      ],
    };

    let mockSender = new mockSenders.MockSenderWithResponse(responseData);
    let client = new Client(mockSender);
    let lookup = new Lookup({ search: "f" });
    let expectedSuggestion = new Suggestion(responseData.candidates[0]);

    return client.send(lookup).then(() => {
      expect(lookup.result[0]).to.deep.equal(expectedSuggestion);
    });
  });
});
