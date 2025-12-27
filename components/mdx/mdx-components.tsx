import React from "react";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ComponentType } from "react";
import { cn } from "@/lib/utils";
import { Card, CardBody } from "@/components/selia/card";

type H1Props = ComponentPropsWithoutRef<"h1">;
type H2Props = ComponentPropsWithoutRef<"h2">;
type H3Props = ComponentPropsWithoutRef<"h3">;
type PProps = ComponentPropsWithoutRef<"p">;
type ULProps = ComponentPropsWithoutRef<"ul">;
type OLProps = ComponentPropsWithoutRef<"ol">;
type LIProps = ComponentPropsWithoutRef<"li">;
type AProps = ComponentPropsWithoutRef<"a">;
type BQProps = ComponentPropsWithoutRef<"blockquote">;
type PreProps = ComponentPropsWithoutRef<"pre">;
type CodeProps = ComponentPropsWithoutRef<"code">;

type CalloutProps = { children?: React.ReactNode; className?: string };

type AnyProps = Record<string, unknown>;
type MDXComponents = Record<string, ComponentType<AnyProps>>;

function asProps<T>(props: AnyProps): T {
  return props as unknown as T;
}

function getString(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined;
}

function getNode(v: unknown): React.ReactNode {
  return v as React.ReactNode;
}

export const mdxComponents = {
  h1: (props: AnyProps) => {
    const p = asProps<H1Props>(props);
    return (
      <h1
        {...p}
        className={cn("text-3xl font-semibold tracking-tight", p.className)}
      />
    );
  },
  h2: (props: AnyProps) => {
    const p = asProps<H2Props>(props);
    return (
      <h2
        {...p}
        className={cn(
          "text-2xl font-semibold tracking-tight mt-8",
          p.className
        )}
      />
    );
  },
  h3: (props: AnyProps) => {
    const p = asProps<H3Props>(props);
    return (
      <h3
        {...p}
        className={cn("text-xl font-semibold tracking-tight mt-6", p.className)}
      />
    );
  },
  p: (props: AnyProps) => {
    const p = asProps<PProps>(props);
    return (
      <p
        {...p}
        className={cn("text-muted leading-relaxed mt-3", p.className)}
      />
    );
  },
  ul: (props: AnyProps) => {
    const p = asProps<ULProps>(props);
    return (
      <ul
        {...p}
        className={cn(
          "mt-3 list-disc pl-6 text-muted space-y-1.5",
          p.className
        )}
      />
    );
  },
  ol: (props: AnyProps) => {
    const p = asProps<OLProps>(props);
    return (
      <ol
        {...p}
        className={cn(
          "mt-3 list-decimal pl-6 text-muted space-y-1.5",
          p.className
        )}
      />
    );
  },
  li: (props: AnyProps) => {
    const p = asProps<LIProps>(props);
    return <li {...p} className={cn("leading-relaxed", p.className)} />;
  },
  a: (props: AnyProps) => {
    const p = asProps<AProps>(props);
    const href = getString((props as { href?: unknown }).href) ?? "";
    const className = getString((props as { className?: unknown }).className);
    const children = getNode((props as { children?: unknown }).children);

    const linkClass = cn("underline underline-offset-4", className);

    if (href.startsWith("/")) {
      const { href: _h, className: _c, children: _ch, ...rest } = p;
      return (
        <Link href={href} className={linkClass} {...rest}>
          {children}
        </Link>
      );
    }

    const { href: _h, className: _c, children: _ch, ...rest } = p;
    return (
      <a
        href={href}
        className={linkClass}
        target="_blank"
        rel="noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  },
  blockquote: (props: AnyProps) => {
    const p = asProps<BQProps>(props);
    return (
      <blockquote
        {...p}
        className={cn(
          "mt-4 border-l-2 border-border pl-4 text-muted italic",
          p.className
        )}
      />
    );
  },
  pre: (props: AnyProps) => {
    const p = asProps<PreProps>(props);
    return (
      <pre
        {...p}
        className={cn(
          "mt-4 overflow-x-auto rounded-xl ring-1 ring-border/50 bg-background/40 p-4 text-sm",
          p.className
        )}
      />
    );
  },
  code: (props: AnyProps) => {
    const p = asProps<CodeProps>(props);
    return (
      <code
        {...p}
        className={cn(
          "rounded-md bg-background/50 px-1.5 py-0.5 ring-1 ring-border/40 text-[0.9em]",
          p.className
        )}
      />
    );
  },
  Callout: (props: AnyProps) => {
    const p = asProps<CalloutProps>(props);
    return (
      <Card className={cn("mt-4 bg-background/40", p.className)}>
        <CardBody className="text-muted">{p.children}</CardBody>
      </Card>
    );
  },
} satisfies MDXComponents;
