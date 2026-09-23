#!/usr/bin/env bash
# Poll live HTML until <grep-string> appears (e.g. after a Vercel deploy).
# Bounded retries: default 20 tries x 15s sleep, overridable via env/flags.
set -u

TRIES="${TRIES:-20}"
SLEEP_SECS="${SLEEP_SECS:-15}"
SITE_URL="${SITE_URL:-https://simho.xyz}"

usage() {
  cat <<USAGE
Usage: scripts/vercel-wait.sh <commit> <grep-string> [url]

Poll live HTML at [url] (default: \$SITE_URL, currently ${SITE_URL})
until <grep-string> appears. <commit> is informational (the deploy
being waited on) and is echoed in progress logs.

Environment / flags:
  SITE_URL     default URL when [url] is omitted (default: https://simho.xyz)
  TRIES        max attempts (default: 20), or --tries N
  SLEEP_SECS   seconds between attempts (default: 15), or --sleep N

Exit 0 when the string appears, 1 on timeout.

Example:
  scripts/vercel-wait.sh abc1234 "data-website-id" https://simho.xyz
USAGE
}

while [[ "${1:-}" == --* ]]; do
  case "$1" in
    --tries) TRIES="${2:?--tries needs a value}"; shift 2 ;;
    --sleep) SLEEP_SECS="${2:?--sleep needs a value}"; shift 2 ;;
    -h|--help|help) usage; exit 0 ;;
    *) echo "error: unknown flag $1" >&2; usage >&2; exit 2 ;;
  esac
done

if [[ $# -lt 2 ]]; then
  usage >&2
  exit 2
fi
if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

COMMIT="$1"
NEEDLE="$2"
URL="${3:-$SITE_URL}"

echo "Waiting for commit ${COMMIT} to be live at ${URL}"
echo "Looking for: ${NEEDLE} (max ${TRIES} tries, ${SLEEP_SECS}s apart)"

i=0
while [[ "$i" -lt "$TRIES" ]]; do
  i=$((i + 1))
  if html="$(curl -fsSL --max-time 30 "$URL" 2>/dev/null)" && printf '%s' "$html" | grep -qF "$NEEDLE"; then
    echo "Found on try ${i}/${TRIES}: commit ${COMMIT} appears live."
    exit 0
  fi
  echo "Try ${i}/${TRIES}: not present yet."
  if [[ "$i" -lt "$TRIES" ]]; then
    sleep "$SLEEP_SECS"
  fi
done

echo "Timed out after ${TRIES} tries: '${NEEDLE}' never appeared at ${URL}." >&2
exit 1
