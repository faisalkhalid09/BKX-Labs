import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bkxlabs.com"),
  title: {
    default: "BKX Tools | Utility Tool Suite",
    template: "%s | BKX Tools",
  },
  description:
    "Fast, one-visit utility tools for AI compliance, cloud costs, post-quantum readiness, and technical risk scoring.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "BKX Tools | Utility Tool Suite",
    description:
      "Fast utility tools built for technical teams and compliance workflows.",
    url: "https://bkxlabs.com/tools",
    siteName: "BKX Tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BKX Tools | Utility Tool Suite",
    description:
      "Fast utility tools built for technical teams and compliance workflows.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas text-ink selection:bg-ink selection:text-canvas">
        <div className="site-shell">
          <header className="site-header">
            <a href="/tools" className="logo-mark" aria-label="BKX Tools Home">
              BKX Tools
            </a>
            <p className="header-note">Best for one visit.</p>
          </header>

          <main className="content-wrap">{children}</main>

          <footer className="site-footer">
            <p>BKX Labs Utility Tool Suite</p>
          </footer>
        </div>

        <div className="anchor-ad-slot" aria-label="Anchor ad reserved slot">
          <div className="ad-slot-inner">Anchor Ad Placeholder</div>
        </div>
      </body>
    </html>
  );
}
