import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cosmatic — Premium Beauty & Lifestyle",
  description: "Discover premium beauty and lifestyle products. Skincare, makeup, haircare, and wellness essentials.",
  keywords: "beauty, skincare, makeup, haircare, wellness, premium, cosmatic",
};

import { StoreProvider } from "@/context/StoreContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900 antialiased">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
