#!/usr/bin/env node
// Send a pageview to Umami with a REAL Chrome UA (Umami's isbot check drops
// HeadlessChrome / headless agents) and assert it shows up in website stats.
//
// Env:
//   UMAMI_BASE_URL   Umami host (default: https://analytics.simho.xyz)
//   UMAMI_USER       Umami login username (required, for the stats assertion)
//   UMAMI_PASSWORD   Umami login password (required, for the stats assertion)

// Playwright is intentionally NOT required here. If it is unavailable we use
// plain fetch with a real Chrome UA string, which is enough to pass isbot.
async function checkPlaywright() {
  try {
    await import.meta.resolve("playwright");
    console.error("[info] playwright is available (not needed for this check)");
  } catch {
    console.error(
      "[info] playwright is not installed; using fetch with a real Chrome UA instead.",
    );
    console.error(
      "[hint] for full browser verification: pnpm add -D playwright && pnpm exec playwright install chromium",
    );
  }
}

const REAL_CHROME_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
const DEFAULT_BASE_URL = "https://analytics.simho.xyz";

function help() {
  console.log(`Usage: node scripts/umami-track-verify.mjs <url> <website-id>

Send a pageview for <url> to Umami with a real Chrome User-Agent, then poll
the website stats API until the pageview count increases.

Environment:
  UMAMI_BASE_URL   Umami host (default: ${DEFAULT_BASE_URL})
  UMAMI_USER       Umami login username (required)
  UMAMI_PASSWORD   Umami login password (required)

Options:
  --tries N   stats poll attempts (default: 12)
  --sleep N   seconds between polls (default: 5)

Example:
  UMAMI_USER=admin UMAMI_PASSWORD=secret \\
    node scripts/umami-track-verify.mjs https://simho.xyz/ c7c11edc-...`);
}

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

async function readJson(res, label) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    fail(`${label} returned HTTP ${res.status}: ${text.slice(0, 200)}`);
  }
}

function statValue(stats, key) {
  const entry = stats[key];
  if (typeof entry === "number") return entry;
  if (entry && typeof entry.value === "number") return entry.value;
  return 0;
}

async function getPageviews(baseUrl, auth, websiteId) {
  const endAt = Date.now();
  const startAt = endAt - 10 * 60 * 1000;
  const res = await fetch(
    `${baseUrl}/api/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}`,
    { headers: auth },
  );
  if (!res.ok) fail(`stats request failed with HTTP ${res.status}`);
  const stats = await readJson(res, "stats");
  return statValue(stats, "pageviews");
}

async function main() {
  await checkPlaywright();

  const rawArgs = process.argv.slice(2);
  if (rawArgs.length === 0 || rawArgs.includes("--help") || rawArgs.includes("-h")) {
    help();
    process.exit(rawArgs.length === 0 ? 2 : 0);
  }
  const args = [];
  let tries = 12;
  let sleepSecs = 5;
  for (let i = 0; i < rawArgs.length; i++) {
    if (rawArgs[i] === "--tries") tries = Number(rawArgs[++i]);
    else if (rawArgs[i] === "--sleep") sleepSecs = Number(rawArgs[++i]);
    else if (!rawArgs[i].startsWith("-")) args.push(rawArgs[i]);
    else fail(`unknown flag ${rawArgs[i]}`);
  }
  if (args.length < 2) fail("missing <url> and <website-id> arguments");
  const [pageUrl, websiteId] = args;

  let parsed;
  try {
    parsed = new URL(pageUrl);
  } catch {
    fail("<url> is not a valid URL");
  }

  const baseUrl = (process.env.UMAMI_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, "");
  const username = process.env.UMAMI_USER;
  const password = process.env.UMAMI_PASSWORD;
  if (!username || !password) fail("UMAMI_USER and UMAMI_PASSWORD must be set");

  // Login first so we can take a baseline stat.
  const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!loginRes.ok) fail(`login failed with HTTP ${loginRes.status}`);
  const login = await readJson(loginRes, "login");
  if (!login.token) fail("login response did not contain a token");
  const auth = { Authorization: `Bearer ${login.token}` };

  const baseline = await getPageviews(baseUrl, auth, websiteId);
  console.error(`baseline pageviews (last 10m): ${baseline}`);

  // Send the pageview with a real Chrome UA so isbot does not drop it.
  const sendRes = await fetch(`${baseUrl}/api/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": REAL_CHROME_UA },
    body: JSON.stringify({
      type: "event",
      payload: {
        website: websiteId,
        hostname: parsed.hostname,
        language: "en-US",
        referrer: "",
        screen: "1920x1080",
        title: "track-verify",
        url: parsed.pathname + parsed.search,
      },
    }),
  });
  if (sendRes.status < 200 || sendRes.status >= 300) {
    fail(`/api/send returned HTTP ${sendRes.status}`);
  }
  console.error(`sent pageview for ${parsed.pathname || "/"} (HTTP ${sendRes.status})`);

  for (let i = 1; i <= tries; i++) {
    await new Promise((r) => setTimeout(r, sleepSecs * 1000));
    const current = await getPageviews(baseUrl, auth, websiteId);
    console.error(`poll ${i}/${tries}: pageviews=${current}`);
    if (current > baseline) {
      console.log(`TRACKED pageviews ${baseline} -> ${current}`);
      return;
    }
  }
  fail(`pageview was sent but stats did not increase after ${tries} polls`);
}

main().catch((err) => fail(err.message ?? String(err)));
