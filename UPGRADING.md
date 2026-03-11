# Upgrading to the TypeScript Release

This SDK has been rewritten from JavaScript to TypeScript. This guide explains what changed and what it means for your project.

## Nothing Breaks

The published npm package ships the same compiled JavaScript it always has — CommonJS (`dist/cjs/`) and ESM (`dist/esm/`). **Your existing code continues to work without modification.** All classes, methods, and namespaces are unchanged.

The only addition is a new `dist/types/` directory containing `.d.ts` type declaration files. These are automatically picked up by TypeScript-aware editors but are completely invisible to plain JavaScript usage.

## For JavaScript Users

**No code changes are required.** Both `require()` and `import` work exactly as before:

```javascript
// ESM (unchanged)
import SmartySDK from "smartystreets-javascript-sdk";

// CommonJS (unchanged)
const SmartySDK = require("smartystreets-javascript-sdk");
```

### Free IDE improvements

Even without TypeScript in your project, you now get automatic benefits in editors like VS Code and WebStorm:

- **Autocompletion** — property names, method signatures, and constructor parameters are suggested as you type
- **Hover documentation** — hover over any SDK class or method to see its type signature
- **Inline error detection** — your editor can flag typos in property names or incorrect argument types

These features come from the bundled `.d.ts` files and require no configuration on your part.

### Optional: JSDoc type references

If you use JSDoc annotations in your JavaScript, you can reference SDK types directly:

```javascript
/** @type {import("smartystreets-javascript-sdk").usStreet.Lookup} */
const lookup = new SmartySDK.usStreet.Lookup();
```

## For TypeScript Users

Full type declarations ship with the package. There is no need to install a separate `@types/` package.

### Exported types

The following types are available as named exports:

```typescript
// Core interfaces
import type { Request, Response, Sender, Sleeper, Signer } from "smartystreets-javascript-sdk";

// Error class
import { SmartyError } from "smartystreets-javascript-sdk";

// US Street types
import type { MatchStrategy, OutputFormat, CountySource } from "smartystreets-javascript-sdk";
import type { CoordinateLicense, MatchInfo } from "smartystreets-javascript-sdk";

// US Autocomplete Pro types
import type { Geolocation } from "smartystreets-javascript-sdk";

// International Street types
import type { Language, Geocode } from "smartystreets-javascript-sdk";
```

### Example

```typescript
import SmartySDK, { type MatchStrategy } from "smartystreets-javascript-sdk";

const credentials = new SmartySDK.core.StaticCredentials(
	process.env.SMARTY_AUTH_ID!,
	process.env.SMARTY_AUTH_TOKEN!,
);
const client = new SmartySDK.core.ClientBuilder(credentials).buildUsStreetApiClient();

const lookup = new SmartySDK.usStreet.Lookup();
lookup.street = "1600 Amphitheatre Parkway";
lookup.city = "Mountain View";
lookup.state = "CA";
lookup.match = "enhanced" satisfies MatchStrategy;

const response = await client.send(lookup);
console.log(response.lookups[0].result);
```

## Import Patterns

| Style | Syntax |
| --- | --- |
| ESM default import | `import SmartySDK from "smartystreets-javascript-sdk"` |
| ESM named imports | `import { core, usStreet } from "smartystreets-javascript-sdk"` |
| CommonJS | `const SmartySDK = require("smartystreets-javascript-sdk")` |
| TypeScript type import | `import type { MatchStrategy } from "smartystreets-javascript-sdk"` |

## FAQ

**Do I need TypeScript installed to use this package?**
No. The package contains compiled JavaScript. TypeScript is not a runtime dependency. The type declarations are optional metadata used only by editors and the TypeScript compiler.

**Did any method signatures change?**
No. The public API is identical to previous releases.

**Are the examples still JavaScript?**
Yes. The [`examples/`](examples/) directory uses plain `.mjs` files to demonstrate that JavaScript usage is fully supported.

**What Node.js versions are supported?**
The same as before. The compiled output targets ES2015.
