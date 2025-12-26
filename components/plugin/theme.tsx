"use client";

import * as React from "react";
import { ThemeProvider as ThemePlugin } from "next-themes";

export function Theme({
  children,
  ...props
}: React.ComponentProps<typeof ThemePlugin>) {
  return <ThemePlugin {...props}>{children}</ThemePlugin>;
}
