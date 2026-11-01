---
name: security-review
description: Review Cloudflare Workers source code for security vulnerabilities
argument-hint: '[file path, or empty for everything]'
allowed-tools: Read Glob Grep
---

# Security Review

Read the target source code, identify vulnerabilities, and report them. Write the report in Japanese.

## Scope

- If the user names a target (`$ARGUMENTS` in Claude Code), review only that file or directory
- Otherwise, review all source code under `src/`, plus `wrangler.toml` and `.github/workflows/`

## What to look for

### Input and output

- Missing validation of user input (URL, query, headers, request body)
- Injection (SQL, NoSQL, command), XSS, path traversal, SSRF via user-controlled `fetch` targets
- Internal details leaked through error messages or responses

### Authentication and authorization

- Missing or bypassable authentication
- Missing authorization checks (IDOR, etc.)
- Missing CSRF protection on state-changing endpoints

### API design

- State changes via GET requests
- Missing rate limiting on costly operations
- Incorrect CORS settings (origins, methods, headers)
- Improper exposure of sensitive data

### Secrets and configuration

- Hard-coded secrets (API keys, tokens, account IDs) in source or `wrangler.toml` `[vars]`
- Sensitive data written to logs
- Bindings with broader access than needed
- Leftover debug code

### Supply chain and CI

- Dependencies with known vulnerabilities (`pnpm audit`)
- GitHub Actions not pinned to a commit SHA, or with excessive `permissions`
- Untrusted input (PR title, branch name) interpolated into `run:` steps

## Output format

1. Order findings by severity (High → Medium → Low)
2. For each finding, include:
   - Severity (High / Medium / Low)
   - Location (file path:line number)
   - The problematic code snippet
   - A concrete description of the risk
   - A suggested fix with concrete code
3. End with a summary table

## Notes

- Base findings on the code, not on speculation
- Report problems that actually exist, not a generic list of best practices
- If nothing is found, say so explicitly
