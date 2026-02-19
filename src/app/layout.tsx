import type { Metadata } from "next";
import { Barlow, Oswald, Saira_Condensed } from "next/font/google"; // Saira Condensed for blocky hero text
import "./globals.css";

const barlow = Barlow({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-barlow" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const saira = Saira_Condensed({ subsets: ["latin"], weight: ["800", "900"], variable: "--font-saira" });

export const metadata: Metadata = {
  title: "Eastern Creek Soccer Club",
  description: "Join the Legacy - Eastern Creek Soccer Club Official Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} ${oswald.variable} ${saira.variable} font-body bg-[#F8F9FA] text-[#1A1A1A]`}>
        {children}
      </body>
    </html>
  );
}
