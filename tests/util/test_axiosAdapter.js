const chai = require("chai");
const expect = chai.expect;
const { newAxiosAdapter, buildParams } = require("../../src/util/axiosAdapter.js");

describe("AxiosAdapter functionality", function () {
  const fakeFetch = async (url, options) => {
    let contentType;
    if (url.includes("json")) {
      contentType = "application/json";
    } else if (url.includes("text")) {
      contentType = "text/plain";
    } else {
      contentType = "application/octet-stream";
    }

    return {
      status: 200,
      headers: {
        get: (header) => header === "content-type" ? contentType : null,
      },
      json: async () => ({ message: "test" }),
      text: async () => "test text",
      blob: async () => new Blob(["test"], { type: "application/octet-stream" })
    };
  };

  let oldFetch;

  before(function () {
    oldFetch = global.fetch;
    global.fetch = fakeFetch;
  });

  after(function () {
    global.fetch = oldFetch;
  });

  it("should call request interceptors", async function () {
    const adapter = newAxiosAdapter();
    const interceptorCalled = [];

    adapter.interceptors.request.use((config) => {
      interceptorCalled.push("request");
      return config;
    });

    await adapter({
      method: "GET",
      baseURL: "https://example.com/json",
    });

    expect(interceptorCalled).to.deep.equal(["request"]);
  });

  it("should call response interceptors", async function () {
    const adapter = newAxiosAdapter();
    const interceptorCalled = [];

    adapter.interceptors.response.use((res) => {
      interceptorCalled.push("response");
      return res;
    });

    await adapter({
      method: "GET",
      baseURL: "https://example.com/json",
    });

    expect(interceptorCalled).to.deep.equal(["response"]);
  });

  it("should build param string correctly and append to URL", async function () {
    let data = { search: "test", sort: ["asc", "desc"] }
    const queryParams = buildParams(data)
    
    expect(queryParams).to.equal("search=test&sort=asc&sort=desc");
    const parsed = {}
    let parsedParams = new URLSearchParams(queryParams)
    for (const key of parsedParams.keys()) {
      if(parsed[key]) continue
      let allValues = parsedParams.getAll(key)
      parsed[key] = allValues;
      if (allValues.length <=1) {
        parsed[key] = allValues[0];
      }
    }
    expect(parsed).to.deep.equal(data);
  });

  it("should throw error for invalid status code", async function () {
    const adapter = newAxiosAdapter();
    const requestConfig = {
      method: "GET",
      baseURL: "https://example.com/json",
      validateStatus: (status) => status !== 200,
    };

    let error;

    try {
      await adapter(requestConfig);
    } catch (e) {
      error = e;
    }

    expect(error).to.be.an("Error");
    expect(error.message).to.include("failed with status code 200");
  });

  it("should process JSON response correctly", async function () {
    const adapter = newAxiosAdapter();

    const response = await adapter({
      method: "GET",
      baseURL: "https://example.com/json",
    });

    expect(response.data).to.deep.equal({ message: "test" });
  });

  it("should process text response correctly", async function () {
    const adapter = newAxiosAdapter();

    const response = await adapter({
      method: "GET",
      baseURL: "https://example.com/text",
    });

    expect(response.data).to.equal("test text");
  });

  it("should process blob response correctly", async function () {
    const adapter = newAxiosAdapter();

    const response = await adapter({
      method: "GET",
      baseURL: "https://example.com/blob",
    });

    expect(response.data).to.be.instanceOf(Blob);
    expect(response.data.type).to.equal("application/octet-stream");
  });
});