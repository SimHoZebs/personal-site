#!/usr/bin/env node
// Ensure an Umami website exists for <domain> (idempotent create-or-get).
// Prints the website id on stdout; progress goes to stderr.
//
// Env (never hardcode credentials):
//   UMAMI_BASE_URL   Umami host, e.g. https://analytics.simho.xyz
//   UMAMI_USER       Umami login username
//   UMAMI_PASSWORD   Umami login password

const DEFAULT_BASE_URL = "https://analytics.simho.xyz";

function help() {
  console.log(`Usage: node scripts/umami-site-ensure.mjs <domain>

Idempotently create-or-get an Umami website for <domain> and print its id.

Environment:
  UMAMI_BASE_URL   Umami host (default: ${DEFAULT_BASE_URL})
  UMAMI_USER       Umami login username (required)
  UMAMI_PASSWORD   Umami login password (required)

Example:
  UMAMI_BASE_URL=https://analytics.simho.xyz UMAMI_USER=admin \\
    UMAMI_PASSWORD=secret node scripts/umami-site-ensure.mjs simho.xyz`);
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

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    help();
    process.exit(args.length === 0 ? 2 : 0);
  }
  const domain = args.find((a) => !a.startsWith("-"));
  if (!domain) fail("missing <domain> argument");

  const baseUrl = (process.env.UMAMI_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, "");
  const username = process.env.UMAMI_USER;
  const password = process.env.UMAMI_PASSWORD;
  if (!username || !password) fail("UMAMI_USER and UMAMI_PASSWORD must be set");

  // 1. Login.
  const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!loginRes.ok) fail(`login failed with HTTP ${loginRes.status}`);
  const login = await readJson(loginRes, "login");
  const token = login.token;
  if (!token) fail("login response did not contain a token");
  const auth = { Authorization: `Bearer ${token}` };
  console.error("logged in to Umami");

  // 2. List existing websites (paginated) and look for the domain.
  let page = 1;
  let found = null;
  for (;;) {
    const listRes = await fetch(`${baseUrl}/api/websites?page=${page}&pageSize=100`, {
      headers: auth,
    });
    if (!listRes.ok) fail(`listing websites failed with HTTP ${listRes.status}`);
    const list = await readJson(listRes, "websites list");
    const sites = Array.isArray(list) ? list : (list.data ?? []);
    const total = Array.isArray(list) ? list.length : (list.count ?? sites.length);
    for (const site of sites) {
      const domains = String(site.domain ?? "")
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean);
      if (domains.includes(domain) || site.name === domain) {
        found = site;
        break;
      }
    }
    if (found || sites.length === 0 || page * 100 >= total) break;
    page += 1;
  }
  if (found) {
    console.error(`website already exists for ${domain}`);
    console.log(found.id);
    return;
  }

  // 3. Create it.
  const createRes = await fetch(`${baseUrl}/api/websites`, {
    method: "POST",
    headers: { ...auth, "Content-Type": "application/json" },
    body: JSON.stringify({ name: domain, domain }),
  });
  if (!createRes.ok) {
    const text = await createRes.text();
    fail(`creating website failed with HTTP ${createRes.status}: ${text.slice(0, 200)}`);
  }
  const created = await readJson(createRes, "website create");
  if (!created.id) fail("create response did not contain an id");
  console.error(`created website for ${domain}`);
  console.log(created.id);
}

main().catch((err) => fail(err.message ?? String(err)));
