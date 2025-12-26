import Link from "next/link";
import { Heading } from "@/components/selia/heading";
import { Button } from "@/components/selia/button";
import { ChevronLeft } from "lucide-react";

export function DetailError({ message }: { message: string }) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-background px-6 py-10 text-center">
      <Heading size="lg" className="text-primary font-black">
        404
      </Heading>
      <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground mt-2">
        {message}
      </p>
      <Button
        variant="primary"
        pill
        render={<Link href="/" />}
        className="mt-8"
      >
        <ChevronLeft size={18} /> Kembali ke Home
      </Button>
    </div>
  );
}
