# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm install        # Install dependencies
npm test           # Run all tests (JS + TS)
npm run test:js    # Run JavaScript tests only
npm run test:ts    # Run TypeScript tests only
npm run build      # Build the library (outputs to dist/)
```

To run a single test file:
```bash
npx mocha tests/us_street/test_Client.js           # JS test
npx mocha --require tsx/cjs tests/test_RetrySender.ts   # TS test
```

## Architecture

This is the official JavaScript SDK for Smarty address validation APIs. It supports both Node.js (CommonJS/ESM) and browser environments.

### Sender Chain Pattern

The core architecture uses a chain-of-responsibility/middleware pattern for HTTP requests. Each "Sender" wraps another Sender, processing requests through this chain:

```
CustomQuerySender → LicenseSender → BaseUrlSender → CustomHeaderSender
→ AgentSender → RetrySender → SigningSender → StatusCodeSender → HttpSender
```

Each sender adds specific functionality (authentication, retries, headers, etc.). The `HttpSender` at the end uses Axios for actual HTTP transport.

### Key Abstractions

- **ClientBuilder**: Fluent API for configuring and building API-specific clients. Accepts either `StaticCredentials` (server-side: auth-id + auth-token) or `SharedCredentials` (client-side: embedded key).

- **Lookup classes**: Each API has a `Lookup` that holds both input parameters and results after the API call. Located in `src/<api_name>/Lookup.js`.

- **Batch**: Container for up to 100 lookups. Single lookups use GET requests; batches with 2+ lookups use POST.

- **Client classes**: Each API has a `Client` in `src/<api_name>/Client.js` that handles domain-specific request building and response parsing.

### API Modules

Each API follows the same structure in `src/<api_name>/`:
- `Lookup.js` - Input/output container
- `Client.js` - Request/response handling
- `Candidate.js`, `Result.js`, or `Suggestion.js` - Response data structures

Supported APIs: `us_street`, `us_zipcode`, `us_autocomplete_pro`, `us_extract`, `us_enrichment`, `us_reverse_geo`, `international_street`, `international_address_autocomplete`, `international_postal_code`

### Entry Point

`index.mjs` exports all public classes organized by API namespace (e.g., `core`, `usStreet`, `usZipcode`).

## Code Style

- Uses Prettier: tabs, double quotes, 100 char line width, trailing commas
- Mixed JS/TS: Core business logic in JavaScript, infrastructure (credentials, senders) in TypeScript
- Tests use Mocha + Chai with `expect` style assertions
- Test files are prefixed with `test_` and mirror the source structure
