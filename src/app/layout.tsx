import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://subzerowolf-sea.com"),
  title: {
    default: "Sub-Zero Wolf SEA",
    template: "%s | Sub-Zero Wolf SEA",
  },
  description:
    "Luxury Sub-Zero and Wolf appliance catalog, showroom appointments, owner resources, and regional experiences for Southeast Asia.",
  openGraph: {
    title: "Sub-Zero Wolf SEA",
    description:
      "Luxury appliance catalog and showroom experience for Southeast Asia.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sub-Zero Wolf SEA",
    description:
      "Luxury appliance catalog and showroom experience for Southeast Asia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full bg-[#0F0F0F] text-[#FBF9F5]">{children}</body>
    </html>
  );
}
