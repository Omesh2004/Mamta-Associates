import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "MAMTA ASSOCIATES | Green Cleaning Product Catalog",
  description:
    "Premium B2B product catalog powered by Haylide Green Cleaning Technology."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slatewash text-slate-950 antialiased">
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
