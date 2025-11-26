import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "나노사진관 | AI 증명사진 & 여권사진 생성",
  description: "AI 기술로 고품질 증명사진, 여권사진을 간편하게 만들어보세요. 전문 사진관 수준의 품질을 집에서 경험하세요.",
  keywords: ["증명사진", "여권사진", "AI 사진", "온라인 사진관", "나노사진관"],
  openGraph: {
    title: "나노사진관 | AI 증명사진 & 여권사진 생성",
    description: "AI 기술로 고품질 증명사진, 여권사진을 간편하게 만들어보세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
