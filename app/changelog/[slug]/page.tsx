import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { getChangelogBySlug, getChangelogSlugs } from "@/lib/changelog";
import { formatDate } from "@/lib/date";
import type { ChangelogStatus } from "@/types/changelog";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/selia/card";
import { Badge } from "@/components/selia/badge";
import { Separator } from "@/components/selia/separator";
import { mdxComponents } from "@/components/mdx/mdx-components";

function statusToBadge(status: ChangelogStatus) {
  switch (status) {
    case "released":
      return { variant: "success" as const, label: "Released" };
    case "fixed":
      return { variant: "primary" as const, label: "Fixed" };
    case "improved":
      return { variant: "tertiary" as const, label: "Improved" };
    case "changed":
      return { variant: "secondary" as const, label: "Changed" };
    case "breaking":
      return { variant: "danger" as const, label: "Breaking" };
    case "deprecated":
      return { variant: "warning" as const, label: "Deprecated" };
    case "planned":
      return { variant: "info" as const, label: "Planned" };
    default:
      return { variant: "secondary" as const, label: "Info" };
  }
}

export function generateStaticParams() {
  return getChangelogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getChangelogBySlug(slug);
  if (!post) return { title: "Changelog" };

  return {
    title: `${post.frontmatter.title} - Changelog`,
    description: post.frontmatter.summary ?? "Changelog post",
  };
}

export default async function ChangelogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getChangelogBySlug(slug);
  if (!post) notFound();

  const s = statusToBadge(post.frontmatter.status);

  return (
    <div className="min-h-dvh w-full bg-background">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-28 left-1/2 h-72 w-[28rem] -translate-x-1/2 rounded-full bg-primary/22 blur-3xl" />
          <div className="absolute top-28 left-[-10rem] h-72 w-72 rounded-full bg-tertiary/18 blur-3xl" />
          <div className="absolute top-56 right-[-10rem] h-72 w-72 rounded-full bg-secondary/18 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-background/40 to-background" />
        </div>

        <main className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-10 pt-7 sm:pt-10 pb-28 sm:pb-32 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/changelog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Kembali
            </Link>

            <Badge variant={s.variant} size="sm" pill>
              {s.label}
            </Badge>
          </div>

          <Card className="bg-background/25 border border-border/40 backdrop-blur-xl shadow-2xl overflow-hidden">
            <CardHeader className="p-4 sm:p-6">
              <div className="min-w-0">
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-black italic tracking-tight leading-tight">
                  {post.frontmatter.title}
                </CardTitle>
                <CardDescription className="mt-2 text-sm sm:text-base">
                  {formatDate(post.frontmatter.date)}
                  {post.frontmatter.summary
                    ? ` • ${post.frontmatter.summary}`
                    : ""}
                </CardDescription>
              </div>

              <div className="hidden sm:flex items-center justify-end">
                <div className="h-8 w-1.5 rounded-full bg-primary shadow-[0_0_20px_rgba(var(--primary),0.45)]" />
              </div>
            </CardHeader>

            <CardBody className="p-4 sm:p-6 space-y-5 sm:space-y-6">
              <Separator className="opacity-30" />

              <article className="prose prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none">
                <MDXRemote
                  source={post.content}
                  components={mdxComponents}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                />
              </article>

              <Separator className="opacity-20" />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Terima kasih sudah mengikuti update 4yasenime.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/90 hover:text-foreground transition-colors"
                >
                  Kembali ke Home <span className="translate-y-[1px]">→</span>
                </Link>
              </div>
            </CardBody>
          </Card>
        </main>
      </div>
    </div>
  );
}
