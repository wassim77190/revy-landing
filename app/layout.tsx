import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Revy — La carte de fidélité qui fait revenir vos clients",
  description:
    "Revy digitalise la fidélité de votre commerce. Carte dans Apple Wallet & Google Wallet, notifications push, zéro application à télécharger.",
  keywords: "carte fidélité digitale, wallet, notifications push, restaurant, fast-food, fidélisation client",
  openGraph: {
    title: "Revy — La carte de fidélité qui fait revenir vos clients",
    description: "Digitalisez la fidélité de votre commerce en 24h.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-surface text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
