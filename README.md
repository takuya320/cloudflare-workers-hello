# Cloudflare Workers Hello

[![CI](https://github.com/takuya320/cloudflare-workers-hello/actions/workflows/ci.yml/badge.svg)](https://github.com/takuya320/cloudflare-workers-hello/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/takuya320/cloudflare-workers-hello/graph/badge.svg)](https://codecov.io/gh/takuya320/cloudflare-workers-hello)

Cloudflare Workers 上で動く最小構成の TypeScript アプリです。Workers の開発・テスト・CI・デプロイの土台として使います。

**Live Demo:** <https://hello.takuya9525020062.workers.dev/>

## 技術スタック

- **Runtime:** Cloudflare Workers
- **Language:** TypeScript (strict)
- **Build / Deploy:** Wrangler
- **Test:** Jest (ts-jest)
- **Format:** Prettier
- **Package Manager:** pnpm
- **Dependency updates:** Dependabot（毎週月曜 09:00 JST）

## セットアップ

必要なもの:

- Node.js 26 以上
- pnpm
- Cloudflare アカウント（デプロイする場合）

```bash
git clone https://github.com/takuya320/cloudflare-workers-hello.git
cd cloudflare-workers-hello
pnpm install
```

## コマンド

| コマンド                 | 内容                                              |
| ------------------------ | ------------------------------------------------- |
| `pnpm run dev`           | ローカル開発サーバーを起動（`localhost:8787`）    |
| `pnpm run deploy`        | Cloudflare Workers にデプロイ                     |
| `pnpm test`              | テストを実行                                      |
| `pnpm run test:coverage` | カバレッジ付きでテストを実行                      |
| `pnpm run format`        | Prettier で整形                                   |
| `pnpm run lint`          | Prettier のチェックと型チェック（`tsc --noEmit`） |

## ディレクトリ構成

```
.
├── src/
│   ├── index.ts           # Worker のエントリポイント
│   └── __tests__/         # テスト
├── wrangler.toml          # Worker 設定
├── AGENTS.md              # AI コーディングエージェント向けガイド
└── .github/               # CI / Dependabot / PR テンプレート
```

## バインディングの追加

KV / R2 / D1 などを使う場合は、`wrangler.toml` にバインディングを追加し、`src/index.ts` の `Env` インターフェースに型を追加します。`wrangler.toml` と `Env` にコメントアウトされた例があります。

シークレットは `wrangler.toml` に書かず、ローカルでは `.dev.vars`（gitignore 済み）、本番では `wrangler secret put` を使います。

## AI エージェントを使った開発

規約とコマンドは [`AGENTS.md`](AGENTS.md) にまとめています（`CLAUDE.md` はそれを参照するだけです）。

## セキュリティ

脆弱性の報告方法は [SECURITY.md](SECURITY.md) を参照してください。

## ライセンス

[MIT License](LICENSE)

## 参考

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
