import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { GarageClient } from "./garage-client";

export const metadata: Metadata = {
  title: "My Garage",
  description: "Manage your bikes — the personalization engine behind Plan B Marketplace's fitment matching.",
};

export default function GaragePage() {
  return (
    <div className="pb-24 pt-10">
      <div className="container-px mx-auto">
        <Reveal>
          <p className="heading-eyebrow">Your Personalization Engine</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold uppercase tracking-tightest md:text-5xl">
            My Garage
          </h1>
          <p className="mt-5 max-w-xl text-foreground-muted">
            Every bike you add here scopes the entire marketplace to what actually fits — no more guessing at OEM catalogs.
          </p>
        </Reveal>

        <div className="mt-14">
          <GarageClient />
        </div>
      </div>
    </div>
  );
}
