import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Montserrat } from "next/font/google";

const avantStyle = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-avant"
});

export const metadata: Metadata = {
  title: "Black Sky Labs Portfolio",
  description:
    "A clean portfolio storefront concept for premium aerospace blueprint apparel."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${avantStyle.variable} bg-[#f6f5f1] text-[#111111] font-sans antialiased`}
      >
          <Header />
          <main className="pt-28 md:pt-32">
            <div className="mx-auto min-h-[calc(100vh-96px)] max-w-7xl px-5 pb-20 md:px-8">
              {children}
            </div>
          </main>
          <Footer />
      </body>
    </html>
  );
}
