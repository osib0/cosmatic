import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Serenlogue - Premium Beauty & Lifestyle",
  description: "Discover premium beauty and lifestyle products. Skincare, makeup, haircare, and wellness essentials with the finest ingredients.",
  keywords: "beauty, skincare, makeup, haircare, wellness, premium, luxury",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
    >
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
