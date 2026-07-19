import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://planbclub.in"),
  title: {
    default: "Plan B | Elite Superbike Riding Club, Coimbatore",
    template: "%s | Plan B Superbike Club",
  },
  description:
    "Plan B is an elite superbike riding community based in Coimbatore, Tamil Nadu. Ride Beyond Limits — join upcoming rides, explore ride archives, and become part of an exclusive riding brotherhood.",
  keywords: [
    "Plan B",
    "superbike club",
    "Coimbatore riders",
    "motorcycle club India",
    "riding community",
    "superbike rides Tamil Nadu",
  ],
  openGraph: {
    title: "Plan B | Elite Superbike Riding Club",
    description: "Ride Beyond Limits. An exclusive superbike riding community based in Coimbatore.",
    url: "https://planbclub.in",
    siteName: "Plan B Superbike Club",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
