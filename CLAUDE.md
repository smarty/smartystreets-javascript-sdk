# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

Requires Node >= 20 (enforced via `engines` in `package.json`).

```bash
npm install        # Install dependencies
npm test           # Run all tests
npm run build      # Build the library (outputs to dist/)
npx tsc            # Type-check (tsconfig sets noEmit: true)
npx prettier --write .  # Format all files (respects .prettierignore)
```

Makefile targets (used by CI):

```bash
make test          # fmt + test (installs deps if needed)
make build         # Rollup build
make fmt           # Prettier format
make integrate     # Alias for `examples` — runs examples-ts and examples-js against built dist/
```

To run a single test file:

```bash
npx mocha --require tsx/cjs tests/test_RetrySender.ts
```

Build outputs dual formats via Rollup: `dist/cjs/` (CommonJS), `dist/esm/` (ESM), and `dist/types/` (declarations). Rollup preserves module structure (`preserveModules: true`). `undici` is the only external dependency (not bundled).

## Architecture

This is the official JavaScript SDK for Smarty address validation APIs. It supports both Node.js (CommonJS/ESM) and browser environments. The entire codebase is TypeScript.

### Sender Chain Pattern

The core architecture uses a chain-of-responsibility/middleware pattern for HTTP requests. Each "Sender" wraps another Sender, processing requests through this chain:

```
CustomQuerySender → LicenseSender → BaseUrlSender → CustomHeaderSender
→ AgentSender → RetrySender → SigningSender → StatusCodeSender → HttpSender
```

Each sender adds specific functionality (authentication, retries, headers, etc.). The `HttpSender` at the end uses the Fetch API for HTTP transport (with optional `undici` `ProxyAgent` for proxy support in Node.js).

All senders implement the `Sender` interface from `src/types.ts`, which also defines the core `Request` and `Response` contracts that flow through the chain. `Request.baseUrlParam` is appended to `baseUrl` by `BaseUrlSender` to form the final URL — Clients use this to build per-endpoint paths (e.g. `lookup.smartyKey + "/property/principal"`).

### Key Abstractions

- **ClientBuilder**: Fluent API for configuring and building API-specific clients. Accepts either `StaticCredentials` (server-side: auth-id + auth-token) or `SharedCredentials` (client-side: embedded key).

- **buildClient helper** (`src/util/buildClients.ts`, re-exported from `index.ts`): ergonomic alternative to `ClientBuilder` for default configuration — e.g. `buildClient.usStreet(credentials)` is equivalent to `new ClientBuilder(credentials).buildUsStreetApiClient()`.

- **Lookup classes**: Each API has a `Lookup` that holds both input parameters and results after the API call. Located in `src/<api_name>/Lookup.ts`.

- **Batch**: Container for up to 100 lookups. Single lookups use GET requests; batches with 2+ lookups use POST.

- **Client classes**: Each API has a `Client` in `src/<api_name>/Client.ts` that handles domain-specific request building and response parsing.

- **Errors** (`src/Errors.ts`): `SmartyError` is the base class; `NotModifiedError` (304) and `SmartyError` are re-exported from `index.ts`. Internal subclasses include `UndefinedLookupError` and `BadCredentialsError`.

### API Modules

Each API follows the same structure in `src/<api_name>/`:

- `Lookup.ts` - Input/output container
- `Client.ts` - Request/response handling
- `Candidate.ts`, `Result.ts`, or `Suggestion.ts` - Response data structures

Supported APIs: `us_street`, `us_zipcode`, `us_autocomplete_pro`, `us_extract`, `us_enrichment`, `us_reverse_geo`, `international_street`, `international_address_autocomplete`, `international_postal_code`

### us_enrichment specifics

`us_enrichment` deviates from the one-Lookup/one-send-method pattern. It has sub-namespaces `secondary/` and `business/`, and its `Client` exposes multiple send methods: `sendPrincipal`, `sendFinancial`, `sendGeo`, `sendSecondary`, `sendSecondaryCount`, `sendBusinessSummary`, `sendBusinessDetail`. Response shape varies by endpoint — `Response`, `GeoResponse`, `SecondaryResponse`, `SecondaryCountResponse`, `SummaryResult`, `DetailResult`. All enrichment lookups extend `EnrichmentLookupBase`.

**ETag support**: enrichment lookups carry `requestEtag` / `responseEtag`. When the server returns 304, the Client rejects with `NotModifiedError` (unwrapped from the `StatusCodeSender`'s Response wrapper in `dispatch`). A caught `NotModifiedError` is part of the happy path for cache-revalidation flows.

### Credentials

Three credential types, each implementing a `sign(request)` method used by `SigningSender`:

- **StaticCredentials** - Server-side: adds `auth-id` + `auth-token` query params
- **SharedCredentials** - Client-side/browser: adds embedded `key` param + `Referer` header. Cannot be used with POST (batch) requests.
- **BasicAuthCredentials** - Adds HTTP Basic Auth `Authorization` header

### Entry Point

`index.ts` exports all public classes organized by API namespace (e.g., `core`, `usStreet`, `usZipcode`).

### Test Infrastructure

Tests use Mocha + Chai (`expect` style). Test files are prefixed with `test_` and mirror the source structure under `tests/`.

`tests/fixtures/mock_senders.ts` provides reusable mocks:

- `MockSender` - Captures the request for inspection
- `MockSenderWithResponse` - Returns a fixed payload/error
- `MockSenderWithStatusCodesAndHeaders` - Iterates through status codes (useful for retry tests)

## Code Style

- Uses Prettier: tabs, double quotes, 100 char line width, trailing commas
- All source and test files are TypeScript with ES module syntax (`import`/`export`)
- Import paths use `.js` extensions (TypeScript resolves `.js` to `.ts`)
- TypeScript is configured with `strict: true`, `exactOptionalPropertyTypes`, and `noPropertyAccessFromIndexSignature`
- Tests use Mocha + Chai with `expect` style assertions
- Test files are prefixed with `test_` and mirror the source structure
