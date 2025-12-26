import Link from "next/link";
import { Button } from "@/components/selia/button";
import { Badge } from "@/components/selia/badge";
import { ChevronLeft } from "lucide-react";

export function DetailTopbar({ episodesCount }: { episodesCount: number }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Button
        variant="outline"
        size="sm"
        pill
        render={<Link href="/" />}
        className="bg-foreground/5 border-foreground/10 text-foreground"
      >
        <ChevronLeft size={18} /> Back
      </Button>

      <div className="hidden sm:flex items-center gap-2">
        <Badge variant="primary" pill size="sm" className="font-bold px-3">
          DETAILS
        </Badge>
        <Badge
          variant="info"
          pill
          size="sm"
          className="font-bold border-foreground/10 bg-foreground/5 text-foreground"
        >
          {episodesCount} EPS
        </Badge>
      </div>
    </div>
  );
}
