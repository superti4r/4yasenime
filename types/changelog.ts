export type ChangelogStatus =
  | "released"
  | "improved"
  | "fixed"
  | "changed"
  | "breaking"
  | "deprecated"
  | "planned"
  | "info";

export interface ChangelogFrontmatter {
  title: string;
  date: string;
  status: ChangelogStatus;
  summary?: string;
}

export interface ChangelogItem extends ChangelogFrontmatter {
  slug: string;
}
