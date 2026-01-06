// FILE: scripts/validate-links.mjs
/**
 * Validate linkage between:
 * - registry/registry.json
 * - protocols/manifest.json
 *
 * Run:
 *   node scripts/validate-links.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// scripts/validate-links.mjs  -> repoRoot = ../
const repoRoot = path.resolve(__dirname, "..");

const PATHS = {
  registryJson: path.join(repoRoot, "registry", "registry.json"),
  manifestJson: path.join(repoRoot, "protocols", "manifest.json")
};

function toFsPathFromWebPath(webPath) {
  const p = String(webPath || "").trim();
  if (!p.startsWith("/")) return null;
  return path.join(repoRoot, p.replace(/^\//, ""));
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

function isHttpUrl(value) {
  const s = String(value || "").trim();
  if (!s) return false;
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function isWebPath(value) {
  const s = String(value || "").trim();
  return s.startsWith("/");
}

function normalizeStr(s) {
  return String(s || "").trim();
}

function startsWithAny(haystack, prefixes) {
  const h = normalizeStr(haystack);
  return prefixes.some((p) => h.startsWith(String(p)));
}

function tokenMatchesPrefixes(tokenId, prefixes) {
  const t = normalizeStr(tokenId).toUpperCase();
  return prefixes.some((p) => t.startsWith(String(p).toUpperCase()));
}

function entryMatchesProtocol(entry, proto) {
  const token = normalizeStr(entry.token_id);
  const category = normalizeStr(entry.work_category);

  const match = proto.registry?.match ?? {};
  const tokenPrefixes = Array.isArray(match.token_id_prefixes) ? match.token_id_prefixes : [];
  const categories = Array.isArray(match.work_categories) ? match.work_categories : [];

  const byToken = token && tokenPrefixes.length > 0 ? tokenMatchesPrefixes(token, tokenPrefixes) : false;
  const byCategory = category && categories.length > 0 ? categories.includes(category) : false;

  return byToken || byCategory;
}

function validateRegistryEntryBasics(entry) {
  const errors = [];

  const required = [
    "artist",
    "artist_handle",
    "work_title",
    "work_category",
    "verification_status",
    "chain",
    "evidence_pack",
    "last_renewal",
    "registered_at"
  ];

  for (const key of required) {
    if (!normalizeStr(entry[key])) errors.push(`missing "${key}"`);
  }

  const st = normalizeStr(entry.verification_status);
  if (st && !["verified", "pending", "revoked"].includes(st)) {
    errors.push(`invalid verification_status="${st}"`);
  }

  const d1 = new Date(entry.registered_at);
  const d2 = new Date(entry.last_renewal);
  if (Number.isNaN(d1.getTime())) errors.push(`invalid registered_at="${entry.registered_at}"`);
  if (Number.isNaN(d2.getTime())) errors.push(`invalid last_renewal="${entry.last_renewal}"`);
  if (!Number.isNaN(d1.getTime()) && !Number.isNaN(d2.getTime()) && d2 < d1) {
    errors.push(`last_renewal (${entry.last_renewal}) is before registered_at (${entry.registered_at})`);
  }

  const ev = normalizeStr(entry.evidence_pack);
  if (ev && !(isHttpUrl(ev) || isWebPath(ev))) {
    errors.push(`evidence_pack must be http(s) URL or web path starting with "/": "${ev}"`);
  }

  return errors;
}

async function validateManifestFiles(manifest) {
  const errors = [];

  const protocols = Array.isArray(manifest.protocols) ? manifest.protocols : [];
  for (const proto of protocols) {
    const protoId = normalizeStr(proto.id) || "(missing-id)";

    if (!normalizeStr(proto.canonical_path) || !isWebPath(proto.canonical_path)) {
      errors.push(`[manifest:${protoId}] canonical_path missing/invalid: "${proto.canonical_path}"`);
    }

    const versions = Array.isArray(proto.versions) ? proto.versions : [];
    const active = versions.find((v) => normalizeStr(v.version) === normalizeStr(proto.active_version));
    if (!active) {
      errors.push(`[manifest:${protoId}] active_version "${proto.active_version}" not found in versions[]`);
    }

    for (const v of versions) {
      const vId = normalizeStr(v.version) || "(missing-version)";

      for (const key of ["spec_path", "params_path", "changelog_path"]) {
        const webPath = normalizeStr(v[key]);
        if (!webPath || !isWebPath(webPath)) {
          errors.push(`[manifest:${protoId}@${vId}] ${key} missing/invalid: "${webPath}"`);
          continue;
        }

        const fsPath = toFsPathFromWebPath(webPath);
        if (!fsPath) {
          errors.push(`[manifest:${protoId}@${vId}] ${key} could not be mapped to fs path: "${webPath}"`);
          continue;
        }

        const ok = await exists(fsPath);
        if (!ok) errors.push(`[manifest:${protoId}@${vId}] file not found: ${webPath}`);
      }
    }
  }

  return errors;
}

async function validateProtocolRegistryLinkage(manifest, registry) {
  const errors = [];

  const protocols = Array.isArray(manifest.protocols) ? manifest.protocols : [];
  for (const proto of protocols) {
    const protoId = normalizeStr(proto.id) || "(missing-id)";
    const rules = proto.registry ?? {};
    const requiredMin = Number(rules.required_registry_entries_min ?? 0);

    const matched = registry.filter((e) => entryMatchesProtocol(e, proto));

    if (requiredMin > 0 && matched.length < requiredMin) {
      errors.push(
        `[link:${protoId}] expected at least ${requiredMin} matching registry entries; found ${matched.length}`
      );
      continue;
    }

    const allowed = Array.isArray(rules.allowed_evidence_prefixes) ? rules.allowed_evidence_prefixes : [];

    for (const entry of matched) {
      const title = normalizeStr(entry.work_title) || "(untitled)";
      const evidence = normalizeStr(entry.evidence_pack);

      if (!evidence) {
        errors.push(`[link:${protoId}] "${title}" missing evidence_pack`);
        continue;
      }

      if (allowed.length > 0 && !startsWithAny(evidence, allowed)) {
        errors.push(
          `[link:${protoId}] "${title}" evidence_pack not allowed. Got: "${evidence}". Allowed prefixes: ${allowed.join(
            ", "
          )}`
        );
      }

      if (isWebPath(evidence)) {
        const fsPath = toFsPathFromWebPath(evidence);
        if (fsPath && !(await exists(fsPath))) {
          errors.push(`[link:${protoId}] "${title}" evidence_pack web path not found in repo: "${evidence}"`);
        }
      }
    }
  }

  return errors;
}

async function main() {
  const hardErrors = [];
  const warnings = [];

  if (!(await exists(PATHS.registryJson))) hardErrors.push(`Missing file: registry/registry.json`);
  if (!(await exists(PATHS.manifestJson))) hardErrors.push(`Missing file: protocols/manifest.json`);

  if (hardErrors.length) {
    console.error("❌ FAIL (missing files)");
    for (const e of hardErrors) console.error(" -", e);
    process.exit(1);
  }

  const registry = await readJson(PATHS.registryJson);
  const manifest = await readJson(PATHS.manifestJson);

  if (!Array.isArray(registry)) {
    console.error("❌ FAIL registry/registry.json must be an array");
    process.exit(1);
  }

  // Basic registry validation
  for (const [i, entry] of registry.entries()) {
    const errs = validateRegistryEntryBasics(entry);
    for (const err of errs) {
      hardErrors.push(`[registry#${i}] ${err}`);
    }
  }

  // Manifest file presence validation
  hardErrors.push(...(await validateManifestFiles(manifest)));

  // Linkage validation
  hardErrors.push(...(await validateProtocolRegistryLinkage(manifest, registry)));

  // Soft warnings (optional)
  const anyProtocolLike = registry.some((e) => {
    const cat = normalizeStr(e.work_category);
    return ["Official Protocol", "Governance"].includes(cat);
  });
  if (!anyProtocolLike) warnings.push("No registry entries found with work_category Official Protocol/Governance.");

  if (warnings.length) {
    console.warn("⚠️ WARN");
    for (const w of warnings) console.warn(" -", w);
  }

  if (hardErrors.length) {
    console.error("❌ FAIL");
    for (const e of hardErrors) console.error(" -", e);
    process.exit(1);
  }

  console.log("✅ PASS — manifest ↔ registry link validation OK");
}

main().catch((err) => {
  console.error("❌ FAIL (exception)");
  console.error(err?.stack || err);
  process.exit(1);
});
