import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-20 text-center">
      <p className="heading-eyebrow">404</p>
      <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-tightest md:text-6xl">
        Wrong Turn
      </h1>
      <p className="mt-5 max-w-sm text-foreground-muted">
        This road doesn&apos;t exist. Let&apos;s get you back on route.
      </p>
      <Link href="/" className="mt-8">
        <Button variant="primary">Back To Home</Button>
      </Link>
    </div>
  );
}
