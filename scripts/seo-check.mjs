#!/usr/bin/env node
// SEO smoke check for a live URL: meta robots + X-Robots-Tag + robots.txt +
// sitemap + canonical. Exits non-zero when a noindex leak is detected.
// Pure node, no new dependencies.

function help() {
  console.log(`Usage: node scripts/seo-check.mjs <live-url> [--strict]

Read-only SEO smoke check for a deployed page.

Checks:
  meta robots     <meta name="robots"> must not contain noindex/none
  X-Robots-Tag    response header must not contain noindex/none
  robots.txt      origin /robots.txt must not "Disallow: /" for all agents
  sitemap         sitemap (linked or /sitemap-index.xml, /sitemap.xml) must load
  canonical       <link rel="canonical"> must exist and match the page origin

Exit codes:
  0   no failures (warnings allowed unless --strict)
  1   warnings present with --strict
  2   noindex leak or usage error

Example:
  node scripts/seo-check.mjs https://simho.xyz`);
}

const results = [];
function record(status, name, detail) {
  results.push({ status, name, detail });
  console.log(`[${status}] ${name}: ${detail}`);
}

function hasNoindex(value) {
  return value
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .some((v) => v === "noindex" || v === "none");
}

async function fetchText(url, accept) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "personal-site-seo-check/1.0",
      ...(accept ? { Accept: accept } : {}),
    },
  });
  return res;
}

function robotsDisallowsAll(text) {
  // Heuristic: a "User-agent: *" group containing a bare "Disallow: /" line.
  const lines = text.split(/\r?\n/);
  let inWildcardGroup = false;
  let seenWildcardGroup = false;
  for (const raw of lines) {
    const line = raw.split("#")[0].trim();
    if (/^user-agent\s*:/i.test(line)) {
      inWildcardGroup = /^\s*user-agent\s*:\s*\*\s*$/i.test(line);
      if (inWildcardGroup) seenWildcardGroup = true;
    } else if (/^disallow\s*:\s*\/\s*$/i.test(line) && inWildcardGroup) {
      return true;
    }
  }
  // Fallback: any bare root disallow when no explicit user-agent parsing matched.
  if (!seenWildcardGroup && /^disallow\s*:\s*\/\s*$/im.test(text)) return true;
  return false;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    help();
    process.exit(args.length === 0 ? 2 : 0);
  }
  const strict = args.includes("--strict");
  const rawUrl = args.find((a) => !a.startsWith("-"));
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    console.error("error: <live-url> is not a valid URL");
    process.exit(2);
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    console.error("error: <live-url> must be http(s)");
    process.exit(2);
  }

  const origin = `${url.protocol}//${url.host}`;

  // 1. Page fetch.
  let html = "";
  try {
    const res = await fetchText(url.href, "text/html");
    if (!res.ok) {
      record("FAIL", "page", `GET ${url.href} -> HTTP ${res.status}`);
    } else {
      record("ok", "page", `GET ${url.href} -> HTTP ${res.status}`);
    }
    const robotsHeader = res.headers.get("x-robots-tag") ?? "";
    if (robotsHeader && hasNoindex(robotsHeader)) {
      record("FAIL", "X-Robots-Tag", `noindex leaked via header: ${robotsHeader}`);
    } else if (robotsHeader) {
      record("ok", "X-Robots-Tag", robotsHeader);
    } else {
      record("ok", "X-Robots-Tag", "header absent");
    }
    html = await res.text();
  } catch (err) {
    record("FAIL", "page", `fetch failed: ${err.message}`);
  }

  // 2. Meta robots.
  if (html) {
    const tags = [...html.matchAll(/<meta[^>]*>/gi)].map((m) => m[0]);
    const robotsMetas = tags.filter((t) => /name\s*=\s*["']?(robots|googlebot)["']?/i.test(t));
    const leaked = robotsMetas.filter((t) => {
      const content = /content\s*=\s*["']([^"']*)["']/i.exec(t);
      return content && hasNoindex(content[1]);
    });
    if (leaked.length > 0) {
      record("FAIL", "meta robots", `noindex leaked: ${leaked[0].slice(0, 120)}`);
    } else if (robotsMetas.length > 0) {
      record("ok", "meta robots", `${robotsMetas.length} robots meta tag(s), index allowed`);
    } else {
      record("ok", "meta robots", "no robots meta tag (defaults to index)");
    }
  }

  // 3. robots.txt.
  try {
    const res = await fetchText(`${origin}/robots.txt`, "text/plain");
    if (!res.ok) {
      record("WARN", "robots.txt", `HTTP ${res.status} (no robots.txt served)`);
    } else {
      const body = await res.text();
      if (robotsDisallowsAll(body)) {
        record("FAIL", "robots.txt", "Disallow: / applies to all agents (noindex leak)");
      } else {
        record("ok", "robots.txt", "does not disallow the whole site");
      }
    }
  } catch (err) {
    record("WARN", "robots.txt", `fetch failed: ${err.message}`);
  }

  // 4. Sitemap: prefer the linked one, fall back to well-known paths.
  const linked = /<link[^>]*rel\s*=\s*["']sitemap["'][^>]*href\s*=\s*["']([^"']+)["']/i.exec(html ?? "");
  const candidates = linked
    ? [new URL(linked[1], origin).href]
    : [`${origin}/sitemap-index.xml`, `${origin}/sitemap.xml`];
  let sitemapOk = false;
  let sitemapDetail = "";
  for (const candidate of candidates) {
    try {
      const res = await fetchText(candidate, "application/xml");
      const body = res.ok ? await res.text() : "";
      if (res.ok && /<(urlset|sitemapindex)\b/i.test(body)) {
        sitemapOk = true;
        sitemapDetail = `${candidate} loads`;
        break;
      }
      sitemapDetail = `${candidate} -> HTTP ${res.status}`;
    } catch (err) {
      sitemapDetail = `${candidate}: ${err.message}`;
    }
  }
  record(sitemapOk ? "ok" : "WARN", "sitemap", sitemapDetail);

  // 5. Canonical.
  if (html) {
    const canonical = /<link[^>]*rel\s*=\s*["']canonical["'][^>]*href\s*=\s*["']([^"']+)["']/i.exec(html);
    if (!canonical) {
      record("WARN", "canonical", "no canonical link found");
    } else {
      try {
        const canonicalUrl = new URL(canonical[1], origin);
        if (canonicalUrl.origin === origin) {
          record("ok", "canonical", canonicalUrl.href);
        } else {
          record("WARN", "canonical", `origin mismatch: ${canonicalUrl.href}`);
        }
      } catch {
        record("WARN", "canonical", `unparseable href: ${canonical[1]}`);
      }
    }
  }

  const fails = results.filter((r) => r.status === "FAIL").length;
  const warns = results.filter((r) => r.status === "WARN").length;
  if (fails > 0) {
    console.error(`seo-check: ${fails} failure(s) — possible noindex leak`);
    process.exit(2);
  }
  if (strict && warns > 0) {
    console.error(`seo-check: ${warns} warning(s) with --strict`);
    process.exit(1);
  }
  console.error(`seo-check: passed${warns > 0 ? ` with ${warns} warning(s)` : ""}`);
}

main().catch((err) => {
  console.error(`error: ${err.message ?? err}`);
  process.exit(2);
});
