import type { Metadata } from "next";
import { Instagram, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Plan B Superbike Club — Instagram, WhatsApp, email, and our Coimbatore base.",
};

const CHANNELS = [
  {
    icon: Instagram,
    label: "Instagram",
    value: "@planb.club",
    href: "https://instagram.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 98765 43210",
    href: "https://wa.me/919876543210",
  },
  {
    icon: Mail,
    label: "Email",
    value: "ride@planbclub.in",
    href: "mailto:ride@planbclub.in",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-px mx-auto">
        <Reveal>
          <p className="heading-eyebrow">Get In Touch</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold uppercase tracking-tightest md:text-6xl">
            Contact
          </h1>
          <p className="mt-5 max-w-xl text-foreground-muted">
            Questions about a ride, membership, or partnership? Reach us through any channel below.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col gap-4">
            {CHANNELS.map((channel, i) => (
              <Reveal key={channel.label} delay={i * 0.08}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-md border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent/50"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                    <channel.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest2 text-foreground-muted">
                      {channel.label}
                    </p>
                    <p className="mt-1 font-display text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
                      {channel.value}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.24}>
              <div className="flex items-start gap-4 rounded-md border border-border bg-surface p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest2 text-foreground-muted">Location</p>
                  <p className="mt-1 font-display text-lg font-bold tracking-tight text-foreground">
                    Coimbatore, Tamil Nadu
                  </p>
                  <p className="mt-1 text-sm text-foreground-muted">India</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="flex items-start gap-4 rounded-md border border-border bg-surface p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest2 text-foreground-muted">
                    Response Time
                  </p>
                  <p className="mt-1 text-sm text-foreground-muted">Within 24–48 hours on all channels</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="h-full min-h-[420px] overflow-hidden rounded-md border border-border">
              <iframe
                title="Plan B location — Coimbatore, Tamil Nadu"
                src="https://www.google.com/maps?q=Coimbatore,Tamil+Nadu,India&output=embed"
                className="h-full w-full grayscale invert-[0.92] contrast-[1.1]"
                style={{ minHeight: 420, border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
