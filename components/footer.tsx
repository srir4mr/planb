import Link from "next/link";
import { Instagram, MessageCircle, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/logo";

const EXPLORE_LINKS = [
  { href: "/upcoming-rides", label: "Upcoming Rides" },
  { href: "/previous-rides", label: "Previous Rides" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
];

const CLUB_LINKS = [
  { href: "/join", label: "Join Plan B" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-hair bg-background">
      <div className="container-px mx-auto grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:py-20">
        <div>
          <Logo size={44} />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-foreground-muted">
            An elite superbike riding community out of Coimbatore. Ride Beyond Limits.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-accent hover:text-accent"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="mailto:ride@planbclub.in"
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="heading-eyebrow">Explore</p>
          <ul className="mt-5 space-y-3">
            {EXPLORE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-foreground-muted transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="heading-eyebrow">Club</p>
          <ul className="mt-5 space-y-3">
            {CLUB_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-foreground-muted transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="heading-eyebrow">Base</p>
          <div className="mt-5 flex items-start gap-2 text-sm text-foreground-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>Coimbatore, Tamil Nadu, India</span>
          </div>
        </div>
      </div>

      <div className="container-px mx-auto flex flex-col items-center justify-between gap-4 border-t border-border-hair py-6 text-xs text-foreground-muted md:flex-row">
        <p>&copy; {new Date().getFullYear()} Plan B Superbike Club. All rights reserved.</p>
        <p className="font-mono uppercase tracking-widest2">Ride Beyond Limits</p>
      </div>
    </footer>
  );
}
