# JavaScript Roadmap for Automation Testing (Playwright)

A complete, layered JavaScript learning roadmap for automation testers / SDETs.
Work top-to-bottom. Each level lists the concepts, the key syntax, why it matters
for automation, and what to practice.

- **Prerequisite:** Node.js installed (`node -v` works).
- **How to use this file:** read a level, run small examples with `node <file>.js`,
  then apply the concept inside a Playwright test.
- **Repo note:** this project is CommonJS (`"type": "commonjs"` in `package.json`),
  so use `require`/`module.exports` unless you deliberately switch to ES modules.

---

## Level 1 - Fundamentals

**Concepts:** variables (`let`, `const`, `var`), data types, operators, type
coercion, template literals, conditionals, loops, `console` debugging.

```js
const baseUrl = "https://example.com";
let retries = 3;
const isCI = process.env.CI === "true";

console.log(`Running against ${baseUrl}, retries=${retries}, CI=${isCI}`);
```

**Automation relevance:** `const` for fixed config/URLs, `let` for counters,
template literals for readable log and failure messages. `process.env` drives
environment-specific runs.

**Practice:** write a script that prints a test summary using a `for` loop.

---

## Level 2 - Functions & Scope

**Concepts:** function declarations vs expressions, arrow functions, default
parameters, rest parameters, return values, callbacks, closures, scope and
hoisting, `this`.

```js
const buildUrl = (path, base = "https://example.com") => `${base}${path}`;

function retry(times, action) {
  for (let i = 0; i < times; i++) {
    try { return action(); } catch (e) { if (i === times - 1) throw e; }
  }
}

console.log(buildUrl("/login"));
```

**Automation relevance:** helpers like `buildUrl`, `retry`, and `formatLog` keep
tests DRY. Arrow functions preserve `this`, which matters inside classes/fixtures.

**Practice:** write a `retry(times, fn)` helper and use it.

---

## Level 3 - Data Structures & Array Methods

**Concepts:** objects, arrays, destructuring, spread/rest, `map`, `filter`,
`reduce`, `find`, `some`, `every`, `JSON.parse`/`stringify`, `Map`/`Set`.

```js
const users = [
  { name: "admin", role: "admin" },
  { name: "guest", role: "viewer" },
];
const admins = users.filter(u => u.role === "admin").map(u => u.name);
console.log(admins); // [ 'admin' ]
```

**Automation relevance:** data-driven tests iterate arrays of test cases;
`filter`/`find` locate records in API responses; `JSON.parse` reads test data.

**Practice:** load a JSON array of test cases and loop over them.

---

## Level 4 - Strings & Regular Expressions

**Concepts:** `includes`, `startsWith`, `split`, `trim`, `replace`, and regex
with `test`, `match`, `exec`, `replace`.

```js
const order = "ORDER-2026-00042";
const id = order.match(/ORDER-\d{4}-(\d{5})/)[1];
console.log(id); // '00042'
```

**Automation relevance:** validate dynamic values (order ids, timestamps,
emails, currency) without brittle full-string equality.

**Practice:** extract and assert a dynamic value from a string.

---

## Level 5 - Asynchronous JavaScript

**Concepts:** callbacks -> promises -> `async`/`await`, the event loop, timers
(`setTimeout`), `try/catch/finally`, `Promise.all` / `allSettled` / `race`.

```js
async function loadUser(api, id) {
  try {
    const res = await api.get(`/users/${id}`);
    return res.body;
  } finally {
    console.log("loadUser finished");
  }
}
```

**Automation relevance:** almost every Playwright call is async. `await` page
actions, and use `Promise.all` to run independent steps or wait on multiple
things at once.

**Practice:** convert a callback example into `async`/`await`.

| Style | Shape | Use |
| --- | --- | --- |
| Callback | nested functions | legacy code only |
| Promise `.then` | chain | simple sequential flows |
| `async`/`await` | linear | default in tests |

---

## Level 6 - OOP & Modules

**Concepts:** classes, constructors, methods, inheritance, `static`,
encapsulation, CommonJS (`require`/`module.exports`) vs ES modules
(`import`/`export`).

```js
class LoginPage {
  constructor(page) { this.page = page; }
  async open(base) { await this.page.goto(`${base}/login`); }
}
module.exports = { LoginPage };
```

**Automation relevance:** Page Object Model classes wrap locators and actions.
Modules let you share config, fixtures, and helpers across test files.

| CommonJS | ES Modules |
| --- | --- |
| `const x = require("m")` | `import x from "m"` |
| `module.exports = { x }` | `export { x }` |

**Practice:** create a small page object class and export it.

---

## Level 7 - Error Handling & Debugging

**Concepts:** `Error` types, `throw`, custom errors, assertions, logging,
Node inspector (`node --inspect`).

```js
class TestDataError extends Error {
  constructor(msg) { super(msg); this.name = "TestDataError"; }
}
```

**Automation relevance:** custom errors give clear failure messages; `finally`
handles cleanup even when a test throws.

**Practice:** throw a custom error when a required env var is missing.

---

## Level 8 - ES6+ Modern Syntax

**Concepts:** optional chaining (`?.`), nullish coalescing (`??`), logical
assignment (`??=`, `||=`), `Object.entries`/`fromEntries`, shallow iterators/
generators (intro).

```js
const timeout = process.env.TIMEOUT ?? 30000;
const city = user?.address?.city ?? "unknown";
```

**Automation relevance:** safely read nested API/page data and provide defaults
for optional config.

**Practice:** replace nested `if` guards with `?.` and `??`.

---

## Level 9 - Automation / Testing-Specific JavaScript

**Concepts and patterns:**

- Environment variables with `.env` + `dotenv` (`require("dotenv").config()`).
- Central config objects (base URL, timeouts, credentials).
- Data-driven tests: arrays of `{ name, input, expected }`.
- Page objects as classes and reusable helper functions.
- Setup/teardown hooks patterns (`beforeEach`/`afterEach` style).
- Reading and writing JSON test data.
- HTTP calls with `fetch` for API setup/teardown.
- Playwright `expect` assertions and locators from a JS angle.

```js
require("dotenv").config();
const config = {
  baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
  timeout: Number(process.env.TIMEOUT ?? 30000),
};

const cases = [
  { name: "valid login", user: "admin", ok: true },
  { name: "bad password", user: "admin", ok: false },
];
module.exports = { config, cases };
```

**Practice:** build a data-driven test that reads its cases from a JSON file.

---

## Level 10 - Tooling & Practice

**Concepts:** running files with `node`, `npm` scripts in `package.json`,
linting/formatting basics, project folder layout.

```json
{
  "scripts": {
    "run": "node chapter_01_Basics/01_HelloWorld.js",
    "test": "playwright test"
  }
}
```

**Automation relevance:** `npm run <script>` standardizes how tests run locally
and in CI.

**Practice:** add an npm script and run it.

---

## Suggested Chapter Mapping

| Level | Suggested folder |
| --- | --- |
| 1-2 Basics & functions | `chapter_01_Basics` |
| 1-8 JS concepts | `chapter_02_JS_Concepts` |
| 9 Automation JS patterns | future automation chapter |
| 10 Tooling, then Playwright | Playwright test suites |

---

## Quick Reference Checklist

- [ ] Level 1 - Fundamentals: variables, types, operators, loops, template literals
- [ ] Level 2 - Functions & Scope: arrows, defaults, callbacks, closures, `this`
- [ ] Level 3 - Data & Arrays: objects, destructuring, `map`/`filter`/`reduce`, JSON
- [ ] Level 4 - Strings & Regex: `includes`, `split`, `match`, `test`
- [ ] Level 5 - Async: promises, `async`/`await`, `Promise.all`, event loop
- [ ] Level 6 - OOP & Modules: classes, inheritance, `require`/`export`
- [ ] Level 7 - Errors & Debugging: `throw`, custom errors, `try/catch/finally`
- [ ] Level 8 - ES6+: `?.`, `??`, `??=`, `Object.entries`
- [ ] Level 9 - Automation patterns: config, `.env`, data-driven tests, page objects
- [ ] Level 10 - Tooling: `npm` scripts, running with `node`

---

## Next Steps

After Levels 1-8, move into Playwright: locators, actions, assertions, fixtures,
`playwright.config.js`, reporters, and CI integration.