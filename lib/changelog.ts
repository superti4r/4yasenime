import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  ChangelogFrontmatter,
  ChangelogItem,
  ChangelogStatus,
} from "@/types/changelog";

const DIR = path.join(process.cwd(), "content", "changelog");

function ensureDir() {
  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
}

function isChangelogStatus(v: unknown): v is ChangelogStatus {
  return (
    v === "released" ||
    v === "fixed" ||
    v === "improved" ||
    v === "changed" ||
    v === "breaking" ||
    v === "deprecated" ||
    v === "planned" ||
    v === "info"
  );
}

function normalizeFrontmatter(
  slug: string,
  data: unknown
): ChangelogFrontmatter {
  const record = (
    typeof data === "object" && data !== null
      ? (data as Record<string, unknown>)
      : {}
  ) as Record<string, unknown>;

  const title = typeof record.title === "string" ? record.title : slug;
  const date = typeof record.date === "string" ? record.date : "";
  const statusRaw = record.status;
  const status: ChangelogStatus = isChangelogStatus(statusRaw)
    ? statusRaw
    : "info";
  const summary =
    typeof record.summary === "string" ? record.summary : undefined;

  return { title, date, status, summary };
}

export function getChangelogSlugs(): string[] {
  ensureDir();
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllChangelogs(): ChangelogItem[] {
  ensureDir();
  const slugs = getChangelogSlugs();

  const items: ChangelogItem[] = slugs.map((slug) => {
    const raw = fs.readFileSync(path.join(DIR, `${slug}.mdx`), "utf8");
    const { data } = matter(raw);
    const fm = normalizeFrontmatter(slug, data);
    return { slug, ...fm } satisfies ChangelogItem;
  });

  return items.sort((a, b) => {
    const ta = new Date(a.date).getTime();
    const tb = new Date(b.date).getTime();
    if (Number.isNaN(ta) && Number.isNaN(tb)) return 0;
    if (Number.isNaN(ta)) return 1;
    if (Number.isNaN(tb)) return -1;
    return tb - ta;
  });
}

export function getChangelogBySlug(
  slug: string
): { slug: string; frontmatter: ChangelogFrontmatter; content: string } | null {
  ensureDir();
  const full = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(full)) return null;

  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = normalizeFrontmatter(slug, data);

  return { slug, frontmatter, content };
}
