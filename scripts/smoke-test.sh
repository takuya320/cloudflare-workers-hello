#!/usr/bin/env bash
# Starts `wrangler dev` (workerd) and checks that the Worker answers over HTTP.
# Unit tests run on Node and `deploy --dry-run` only bundles, so neither would
# catch a Worker that fails to boot in the real runtime.
set -euo pipefail

PORT="${PORT:-8787}"
URL="http://127.0.0.1:${PORT}/"
LOG="$(mktemp)"

pnpm exec wrangler dev --ip 127.0.0.1 --port "$PORT" >"$LOG" 2>&1 &
WRANGLER_PID=$!

cleanup() {
	kill "$WRANGLER_PID" 2>/dev/null || true
	wait "$WRANGLER_PID" 2>/dev/null || true
	rm -f "$LOG"
}
trap cleanup EXIT

fail() {
	echo "smoke test failed: $1" >&2
	echo "--- wrangler output ---" >&2
	cat "$LOG" >&2
	exit 1
}

for _ in $(seq 1 30); do
	kill -0 "$WRANGLER_PID" 2>/dev/null || fail "wrangler dev exited before becoming ready"
	curl -fsS -o /dev/null "$URL" 2>/dev/null && break
	sleep 1
done

STATUS="$(curl -sS -o /tmp/smoke-body.$$ -w '%{http_code}' "$URL")" || fail "request to $URL failed"
BODY="$(cat /tmp/smoke-body.$$)"
rm -f /tmp/smoke-body.$$

[ "$STATUS" = "200" ] || fail "expected status 200, got $STATUS"
[ "$BODY" = "Hello Worker!" ] || fail "unexpected body: $BODY"

echo "smoke test passed: GET / -> 200 \"$BODY\""
