import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { RfqForm } from "@/components/marketplace/rfq/rfq-form";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Can't find the part you need? Submit an RFQ and get quotes from verified suppliers.",
};

export default function RfqPage() {
  return (
    <div className="pb-24 pt-10">
      <div className="container-px mx-auto grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="heading-eyebrow">Not Listed Yet?</p>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-tightest md:text-5xl">
              Request a Quote
            </h1>
            <p className="mt-5 max-w-md text-foreground-muted">
              Tell us what you&apos;re looking for and we&apos;ll route it to suppliers authorized for that category and brand. Compare quotes and buy the one you like — still protected by Plan B escrow.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-md border border-border bg-surface p-8 md:p-10">
            <RfqForm />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
