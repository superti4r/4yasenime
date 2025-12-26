
import { Button } from "@/components/selia/button";
import Image from "next/image";
function Home() {
  return (
    <main className="flex flex-1 min-h-screen w-full max-w-3xl mx-auto flex-col items-center justify-center py-24 px-4 sm:px-8 md:px-16 pb-24">
      <Image
        className="dark:invert mb-8"
        src="/next.svg"
        alt="Next.js logo"
        width={100}
        height={20}
        priority
      />
      <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight">
          To get started, edit the page.tsx file.
        </h1>
        <p className="max-w-md text-lg leading-8 text-muted-foreground">
          Looking for a starting point or more instructions? Head over to{' '}
          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            className="font-medium underline"
          >
            Templates
          </a>{' '}
          or the{' '}
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            className="font-medium underline"
          >
            Learning
          </a>{' '}
          center.
        </p>
      </div>
      <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-8 w-full sm:w-auto justify-center sm:justify-start">
        <Button variant="primary">
          Read the docs
        </Button>
        <Button variant="secondary">
          Deploy your own
        </Button>
      </div>
    </main>
  );
}

export default Home;
