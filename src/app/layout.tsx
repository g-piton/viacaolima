import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/layout/header";
import { Footer } from "../components/layout/footer";
import { WhatsAppFloat } from "../components/layout/whatsapp-float";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://viacaolima.com.br"),
  title: {
    default: "Viação Lima",
    template: "%s | Viação Lima"
  },
  description:
    "Fretamento intermunicipal, interestadual e internacional para transporte coletivo de passageiros.",
  openGraph: {
    title: "Viação Lima",
    description:
      "Transporte de passageiros com conforto, segurança e pontualidade.",
    type: "website",
    locale: "pt_BR"
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
