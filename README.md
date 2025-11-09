# Cloudflare Workers Hello

A serverless TypeScript application running on Cloudflare's edge network. This project demonstrates the basics of Cloudflare Workers development and serves as a foundation for building edge-computing applications.

**Live Demo:** <https://hello.takuya9525020062.workers.dev/>

## Features

- TypeScript support with strict type checking
- Serverless edge computing on Cloudflare's global network
- Fast local development environment
- Automated dependency updates via Dependabot
- Production-ready configuration

## Tech Stack

- **Runtime:** Cloudflare Workers
- **Language:** TypeScript (ES2021)
- **Build Tool:** Wrangler CLI
- **Package Manager:** pnpm
- **Type Definitions:** @cloudflare/workers-types

## Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Cloudflare account (for deployment)

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/takuya320/cloudflare-workers-hello.git
cd cloudflare-workers-hello

# Install dependencies
pnpm install
```

### Local Development

Start the local development server:

```bash
pnpm run dev
# or
npx wrangler dev
```

The worker will be available at <http://localhost:8787/>

### Deployment

Deploy to Cloudflare's edge network:

```bash
pnpm run deploy
# or
npx wrangler deploy
```

### Type Checking

Run TypeScript type checking:

```bash
npx tsc --noEmit
```

## Project Structure

```
.
├── src/
│   └── index.ts          # Worker entry point
├── wrangler.toml         # Worker configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies and scripts
├── CLAUDE.md            # AI assistant guidance
└── README.md            # This file
```

## Configuration

### Environment Bindings

To add Cloudflare services (KV, R2, Durable Objects, etc.):

1. Update `wrangler.toml` with the binding configuration
2. Add the corresponding type to the `Env` interface in `src/index.ts`
3. Access via the `env` parameter in the fetch handler

Example bindings are commented out in both files for reference.

## Development Commands

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `pnpm run dev`     | Start local development server |
| `pnpm run deploy`  | Deploy to Cloudflare Workers   |
| `pnpm run start`   | Alias for `dev`                |
| `npx tsc --noEmit` | Run type checking              |

## Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Cloudflare Workers Examples](https://developers.cloudflare.com/workers/examples/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**takuya320**

- GitHub: [@takuya320](https://github.com/takuya320)

## Acknowledgments

- Built with [Cloudflare Workers](https://workers.cloudflare.com/)
- Bootstrapped with `npm create cloudflare@latest`
