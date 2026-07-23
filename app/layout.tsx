import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AuthProvider } from "@/components/AuthProvider";
import { Footer } from "@/components/Footer";

import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL('https://mamtaassociates.com'),
  title: "MAMTA ASSOCIATES | Green Cleaning Product Catalog",
  description: "Premium B2B product catalog powered by Haylide Green Cleaning Technology.",
  openGraph: {
    title: "MAMTA ASSOCIATES | Green Cleaning Product Catalog",
    description: "Premium B2B product catalog powered by Haylide Green Cleaning Technology.",
    url: 'https://mamtaassociates.com',
    siteName: 'Mamta Associates',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slatewash text-slate-950 antialiased dark:bg-slate-950 dark:text-slate-100 transition-colors duration-500">
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <SmoothScroll>
              <Navbar />
              {children}
              <Footer />
            </SmoothScroll>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
