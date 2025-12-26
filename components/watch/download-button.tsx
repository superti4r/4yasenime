"use client";

import * as React from "react";
import { Button } from "@/components/selia/button";

type DownloadButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "render"
> & {
  url: string;
  children: React.ReactNode;
};

export function DownloadButton({
  url,
  children,
  ...props
}: DownloadButtonProps) {
  return (
    <Button
      {...props}
      render={<a href={url} target="_blank" rel="noopener noreferrer" />}
    >
      {children}
    </Button>
  );
}
