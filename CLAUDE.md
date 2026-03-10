# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm install        # Install dependencies
npm test           # Run all tests
npm run build      # Build the library (outputs to dist/)
npx tsc --noEmit   # Type-check without emitting
npx prettier --write .  # Format all files (respects .prettierignore)
```

Makefile targets (used by CI):
```bash
make test          # fmt + test (installs deps if needed)
make build         # Rollup build
make fmt           # Prettier format
make integrate     # Run all example files against built dist/
```

To run a single test file:

```bash
npx mocha --require tsx/cjs tests/test_RetrySender.ts
```

Build outputs dual formats via Rollup: `dist/cjs/` (CommonJS), `dist/esm/` (ESM), and `dist/types/` (declarations). Rollup preserves module structure (`preserveModules: true`). Axios and axios-retry are external dependencies (not bundled).

## Architecture

This is the official JavaScript SDK for Smarty address validation APIs. It supports both Node.js (CommonJS/ESM) and browser environments. The entire codebase is TypeScript.

### Sender Chain Pattern

The core architecture uses a chain-of-responsibility/middleware pattern for HTTP requests. Each "Sender" wraps another Sender, processing requests through this chain:

```
CustomQuerySender → LicenseSender → BaseUrlSender → CustomHeaderSender
→ AgentSender → RetrySender → SigningSender → StatusCodeSender → HttpSender
```

Each sender adds specific functionality (authentication, retries, headers, etc.). The `HttpSender` at the end uses Axios for actual HTTP transport.

All senders implement the `Sender` interface from `src/types.ts`, which also defines the core `Request` and `Response` contracts that flow through the chain.

### Key Abstractions

- **ClientBuilder**: Fluent API for configuring and building API-specific clients. Accepts either `StaticCredentials` (server-side: auth-id + auth-token) or `SharedCredentials` (client-side: embedded key).

- **Lookup classes**: Each API has a `Lookup` that holds both input parameters and results after the API call. Located in `src/<api_name>/Lookup.ts`.

- **Batch**: Container for up to 100 lookups. Single lookups use GET requests; batches with 2+ lookups use POST.

- **Client classes**: Each API has a `Client` in `src/<api_name>/Client.ts` that handles domain-specific request building and response parsing.

### API Modules

Each API follows the same structure in `src/<api_name>/`:

- `Lookup.ts` - Input/output container
- `Client.ts` - Request/response handling
- `Candidate.ts`, `Result.ts`, or `Suggestion.ts` - Response data structures

Supported APIs: `us_street`, `us_zipcode`, `us_autocomplete_pro`, `us_extract`, `us_enrichment`, `us_reverse_geo`, `international_street`, `international_address_autocomplete`, `international_postal_code`

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
