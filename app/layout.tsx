import type { Metadata } from "next";
import { Inter, Rubik } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });

export const metadata: Metadata = {
  title: "Flashcards MVP",
  description: "Language learning companion for Escola Bom Dia students."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${rubik.variable}`}>
      <body>{children}</body>
    </html>
  );
}
