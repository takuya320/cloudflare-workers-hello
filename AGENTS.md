# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Cursor, Codex, etc.) when working with code in this repository.

## Project Overview

Minimal Cloudflare Workers app in TypeScript. A single `fetch` handler in `src/index.ts` returns a greeting. Deployed at <https://hello.takuya9525020062.workers.dev/>.

## Commands

```bash
pnpm run dev            # Start local dev server (wrangler dev, http://localhost:8787/)
pnpm run deploy         # Deploy to Cloudflare Workers
pnpm test               # Run tests (jest)
pnpm run test:coverage  # Run tests with coverage
pnpm run test:smoke     # Boot the Worker with wrangler dev (workerd) and check GET / over HTTP
pnpm run format         # Format with Prettier (auto-fix)
pnpm run lint           # Prettier check + tsc --noEmit (same as CI "Lint & Type Check")
```

Node version is pinned in `.node-version` (CI and mise/fnm read it). Package manager is **pnpm** (version pinned in `package.json`; Node 26 does not bundle corepack, so CI uses `pnpm/action-setup`). Use `pnpm install` to install dependencies.

## Architecture

**Entry point**: `src/index.ts` — default export with an async `fetch(request, env, ctx)` handler, plus the `Env` interface that declares bindings (currently empty).

**Testing**: tests live under `src/__tests__/` and run with Jest (`ts-jest`). Call the handler directly with a `Request`; no HTTP server is needed. Mock runtime objects such as `ExecutionContext` partially (only what the code under test uses): `@cloudflare/workers-types` keeps adding required members, so an exhaustive mock breaks type-checking on routine Dependabot bumps.

**Type checking**: `tsconfig.json` has `noEmit: true`; Wrangler does the bundling. `pnpm run lint` runs `tsc --noEmit`.

## Cloudflare Workers

Config lives in `wrangler.toml`. No bindings (KV, R2, D1, ...) are active; commented-out templates exist.

To add a binding, update **both** the `Env` interface in `src/index.ts` and `wrangler.toml`, then read it from the `env` parameter.

Local env variables go in `.dev.vars` (gitignored). Never put secrets in `wrangler.toml`; use `wrangler secret put`.

## Code Style

Prettier (`.prettierrc`, `.editorconfig`) is the only formatter; tabs for indentation, YAML uses spaces. A Husky pre-commit hook runs `pnpm run lint` and `pnpm test`.

## Language

- **Agent-facing files are written in English**: `AGENTS.md`, `CLAUDE.md`, `.agents/` (skills), code comments, and commit messages.
- **Human-facing documents are written in Japanese**: `README.md`, `SECURITY.md`, `.github/pull_request_template.md`, and PR descriptions.
- Replies, plans, and review reports addressed to the maintainer are in Japanese.

## Conventions

Solo project: no external contributors are expected, so these rules exist for consistency, not onboarding.

**Branches**: changes to `main` go through a PR. Name branches `<type>/<short-description>` (e.g. `feat/health-endpoint`), with `type` matching the commit type. Dependabot branches are the exception.

**Commits**: Conventional Commits, in English.

- Types: `feat` / `fix` / `docs` / `test` / `refactor` / `chore` / `ci` / `build`
- Subject: imperative, lowercase, ≤72 chars, no trailing period
- Body explains **why**, not what (the diff shows what)
- Breaking changes: `type!:` plus a `BREAKING CHANGE:` line in the body
- One purpose per commit

**Pull requests**: one purpose per PR; title in the same format as a commit subject; description follows `.github/pull_request_template.md` (in Japanese). CI must pass before merging.

**Code comments**: English, and only for **why** and **why not**: non-obvious constraints, workaround reasons, deliberate behavior, and improvements knowingly skipped, with the reason. Express what the code does through naming and types. `TODO` / `FIXME` carry a reason or issue number.

**Tests**: test behavior, not implementation; cover error paths; inject time and randomness so tests stay deterministic.

**Security**: secrets only via environment variables; validate all input server-side. Run `pnpm audit` regularly. Vulnerability reports: see `SECURITY.md`.

**Agent skills**: skills live in `.agents/skills/<name>/SKILL.md`, which Codex and Cursor read directly. `.claude/skills` is a symlink to it for Claude Code, so never add skills under `.claude/skills` directly.

**Dependencies**: minimize them; vet license, size, and maintenance before adding. Always commit `pnpm-lock.yaml`. Dependabot opens weekly update PRs (Mondays 09:00 JST) with minor/patch updates grouped.

**GitHub Actions**: pin third-party actions to a full commit SHA with a version comment, and keep `permissions` minimal.
