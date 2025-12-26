"use client";
import { Button } from "@/components/selia/button";
import * as React from "react";

export function DownloadButton({
  url,
  children,
  ...props
}: {
  url: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Button
      {...props}
      render={<a href={url} target="_blank" rel="noopener noreferrer" />}
    >
      {children}
    </Button>
  );
}
