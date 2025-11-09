# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Cloudflare Workers project - a serverless JavaScript/TypeScript application that runs on Cloudflare's edge network. The worker is deployed at: https://hello.takuya9525020062.workers.dev/

## Development Commands

### Local Development

```bash
npm run dev
# or
npx wrangler dev
```

Starts local development server at http://localhost:8787/

### Deployment

```bash
npm run deploy
# or
npx wrangler deploy
```

Deploys the worker to Cloudflare's edge network.

### Type Checking

The project uses TypeScript with `noEmit: true`, meaning Wrangler handles compilation. Run type checking with:

```bash
npx tsc --noEmit
```

## Architecture

### Entry Point

- **src/index.ts**: Single file containing the worker's fetch handler
- Exports a default object with an async `fetch()` method
- Uses the standard Workers API: `fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response>`

### Environment Bindings

The `Env` interface in src/index.ts defines available bindings (currently empty). When adding Cloudflare services, update both:

1. The `Env` interface in src/index.ts
2. The corresponding binding configuration in wrangler.toml

### Configuration

- **wrangler.toml**: Worker configuration including name, entry point, compatibility date, and service bindings
- **tsconfig.json**: Configured for ES2021 target with Cloudflare Workers types (@cloudflare/workers-types/2023-07-01)

## Adding Cloudflare Services

To add KV, R2, Durable Objects, Queues, or other Workers services:

1. Add binding configuration to wrangler.toml (examples are commented out in the file)
2. Add corresponding type to the Env interface in src/index.ts
3. Access via the `env` parameter in the fetch handler

## TypeScript Configuration Notes

- Strict mode enabled
- Target: ES2021
- Module: ES2022 with node resolution
- JSX support configured (react)
- `isolatedModules: true` - each file must be independently transpilable
- `noEmit: true` - Wrangler handles the build process

## Package Management

This project uses **pnpm**. While npm/npx commands work, pnpm is preferred:

```bash
pnpm install
pnpm run dev
pnpm run deploy
```

## Dependency Updates

Dependabot is configured for automated dependency updates:

- Runs weekly on Mondays at 09:00 JST
- Groups minor/patch updates for development and production dependencies
- PRs auto-assigned to @takuya320
