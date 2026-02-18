import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/main/navbar/Navbar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Nailart AI — YouTube Thumbnail Generator",
  description: "AI가 만드는 클릭률 극대화 유튜브 썸네일",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${outfit.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
