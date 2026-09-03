import type { Metadata, Viewport } from "next";
import { GeistPixelSquare } from "geist/font/pixel";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { AdvancementToast } from "./components/PolishLayer";

export const metadata: Metadata = {
  title: "Prarambha — Build. Break. Ignite.",
  description:
    "Prarambha is a hackathon where builders, breakers, and creators come together to forge something legendary. Register now.",
  openGraph: {
    title: "Prarambha — Build. Break. Ignite.",
    description: "A hackathon for builders and creators.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: 1280,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistPixelSquare.variable} ${GeistSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col text-white antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <AdvancementToast />
      </body>
    </html>
  );
}
