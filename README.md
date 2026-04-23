#### SMARTY DISCLAIMER: Subject to the terms of the associated license agreement, this software is freely available for your use. This software is FREE, AS IN PUPPIES, and is a gift. Enjoy your new responsibility. This means that while we may consider enhancement requests, we may or may not choose to entertain requests at our sole and absolute discretion.


# Smarty JavaScript SDK

The official JavaScript/TypeScript SDK for accessing [Smarty](https://www.smarty.com) address validation APIs. Works in both Node.js and browser environments.

[![npm](https://img.shields.io/npm/v/smartystreets-javascript-sdk)](https://www.npmjs.com/package/smartystreets-javascript-sdk)
[![license](https://img.shields.io/npm/l/smartystreets-javascript-sdk)](LICENSE.md)

## Installation

```bash
npm install smartystreets-javascript-sdk
```

## Quick Start: US Street Address Validation

```javascript
import SmartySDK from "smartystreets-javascript-sdk";

const credentials = new SmartySDK.core.StaticCredentials(
  process.env.SMARTY_AUTH_ID,
  process.env.SMARTY_AUTH_TOKEN,
);
const client = new SmartySDK.core.ClientBuilder(credentials).buildUsStreetApiClient();

const lookup = new SmartySDK.usStreet.Lookup();
lookup.street = "1600 Amphitheatre Parkway";
lookup.city = "Mountain View";
lookup.state = "CA";

const response = await client.send(lookup);
console.log(response.lookups[0].result);
```

## Quick Start: US Autocomplete Pro

```javascript
const client = new SmartySDK.core.ClientBuilder(credentials).buildUsAutocompleteProClient();

const lookup = new SmartySDK.usAutocompletePro.Lookup("4770 Lincoln");
lookup.maxResults = 10;
lookup.preferStates = ["IL"];

const response = await client.send(lookup);
console.log(response.result); // Array of address suggestions
```

## Supported APIs

| API | Module | Build Method | Example |
| --- | --- | --- | --- |
| [US Street](https://www.smarty.com/docs/cloud/us-street-api) | `usStreet` | `buildUsStreetApiClient()` | [example](examples/us_street.mjs) |
| [US Zipcode](https://www.smarty.com/docs/cloud/us-zipcode-api) | `usZipcode` | `buildUsZipcodeClient()` | [example](examples/us_zipcode.mjs) |
| [US Autocomplete Pro](https://www.smarty.com/docs/cloud/us-autocomplete-pro-api) | `usAutocompletePro` | `buildUsAutocompleteProClient()` | [example](examples/us_autocomplete_pro.mjs) |
| [US Extract](https://www.smarty.com/docs/cloud/us-extract-api) | `usExtract` | `buildUsExtractClient()` | [example](examples/us_extract.mjs) |
| [US Enrichment](https://www.smarty.com/docs/cloud/us-address-enrichment-api) | `usEnrichment` | `buildUsEnrichmentClient()` | [example](examples/us_enrichment.mjs) |
| [US Reverse Geocoding](https://www.smarty.com/docs/cloud/us-reverse-geo-api) | `usReverseGeo` | `buildUsReverseGeoClient()` | [example](examples/us_reverse_geo.mjs) |
| [International Street](https://www.smarty.com/docs/cloud/international-street-api) | `internationalStreet` | `buildInternationalStreetClient()` | [example](examples/international_street.mjs) |
| [International Autocomplete](https://www.smarty.com/docs/cloud/international-address-autocomplete-api) | `internationalAddressAutocomplete` | `buildInternationalAddressAutocompleteClient()` | [example](examples/international_address_autocomplete.mjs) |
| [International Postal Code](https://www.smarty.com/docs/cloud/international-postal-code-api) | `internationalPostalCode` | `buildInternationalPostalCodeClient()` | [example](examples/international_postal_code.mjs) |

## Authentication

Three credential types are available:

- **`StaticCredentials(authId, authToken)`** — Server-side authentication using auth-id and auth-token.
- **`SharedCredentials(key)`** — Client-side (browser) authentication using an embedded key. Does not support batch (POST) requests.
- **`BasicAuthCredentials(authId, authToken)`** — HTTP Basic Auth.

## Browser Usage

The SDK works in modern browsers out of the box — it uses the native `fetch` API for transport.

### Credentials

Use `SharedCredentials` with an embedded key registered to your website's host:

```javascript
const credentials = new SmartySDK.core.SharedCredentials("YOUR_EMBEDDED_KEY");
const client = new SmartySDK.core.ClientBuilder(credentials).buildUsStreetApiClient();
```

Note that `SharedCredentials` does not support batch (POST) requests — send one lookup at a time.

### Features not available in the browser

- **`withProxy()`** is Node-only. It relies on `undici`'s `ProxyAgent`, which uses Node internals. Browsers route requests through the user's network configuration, so a proxy option wouldn't apply anyway.
- **Batch requests** require `StaticCredentials` or `BasicAuthCredentials`, which should not be used in the browser (they'd expose your auth-token to end users).

### Bundler configuration

`undici` is an `optionalDependencies` entry and is only imported dynamically when `withProxy()` is called. Some bundlers still statically analyze the dynamic `import("undici")` call and emit a warning or try to resolve it. If that happens, tell your bundler to ignore or externalize `undici`:

**webpack**

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    fallback: { undici: false },
  },
};
```

**Vite / Rollup**

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      external: ["undici"],
    },
  },
};
```

**esbuild**

```bash
esbuild app.js --bundle --external:undici
```

## Common Patterns

### Batch Requests

Send up to 100 lookups in a single request (not available with `SharedCredentials`):

```javascript
const batch = new SmartySDK.core.Batch();
batch.add(lookup1);
batch.add(lookup2);

const response = await client.send(batch);
```

### Error Handling

All API errors extend `SmartyError`:

```javascript
import { SmartyError } from "smartystreets-javascript-sdk";

try {
  const response = await client.send(lookup);
} catch (err) {
  if (err instanceof SmartyError) {
    console.error("API error:", err.message);
  }
}
```

### Retry and Timeout

```javascript
const client = new SmartySDK.core.ClientBuilder(credentials)
  .withMaxRetries(10)
  .withMaxTimeout(30000)
  .buildUsStreetApiClient();
```

### Proxy

```javascript
const client = new SmartySDK.core.ClientBuilder(credentials)
  .withProxy("proxy.example.com", 8080, "https")
  .buildUsStreetApiClient();
```

### Custom Headers

```javascript
const client = new SmartySDK.core.ClientBuilder(credentials)
  .withCustomHeaders({ "X-Custom-Header": "value" })
  .buildUsStreetApiClient();
```

## TypeScript

The SDK is written in TypeScript and ships with full type declarations — no `@types/` package needed. All types are available as named exports:

```typescript
import SmartySDK, { type MatchStrategy, type SmartyError } from "smartystreets-javascript-sdk";

const lookup = new SmartySDK.usStreet.Lookup();
lookup.street = "1600 Amphitheatre Parkway";
lookup.match = "enhanced" satisfies MatchStrategy;
```

JavaScript users benefit too — editors like VS Code automatically pick up the bundled type declarations, providing autocompletion and hover docs with no configuration.

See [UPGRADING.md](UPGRADING.md) for details on migrating from the previous JavaScript-only release.

## Documentation

Full API documentation is available at [smarty.com/docs/sdk/javascript](https://www.smarty.com/docs/sdk/javascript).

## License

[Apache 2.0](LICENSE.md)
