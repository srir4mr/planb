import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export function BecomeSupplierCta() {
  return (
    <section className="section-y border-t border-border-hair">
      <div className="container-px mx-auto">
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-md border border-accent/30 bg-accent/5 px-6 py-16 text-center">
            <span className="heading-eyebrow">For Manufacturers, Distributors &amp; Workshops</span>
            <h2 className="max-w-2xl text-balance font-display text-3xl font-bold uppercase tracking-tightest md:text-4xl">
              Sell on Plan B Marketplace
            </h2>
            <p className="max-w-xl text-foreground-muted">
              Reach a vetted community of serious riders. List your catalog, get matched by exact fitment, and get paid securely — no inventory risk on our side, ever.
            </p>
            <Link href="/marketplace/supplier">
              <Button variant="primary" size="lg">
                Become a Supplier <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
