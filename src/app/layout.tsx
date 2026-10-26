import type { Metadata } from "next";
import localFont from "next/font/local";
import { buildMetadata } from "@/lib/metadata";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagManager from "@/components/GoogleTagManager";
import "./globals.css";

const graphik = localFont({
  variable: "--font-graphik",
  src: [
    { path: "../../public/fonts/graphik/Graphik-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/graphik/Graphik-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/graphik/Graphik-RegularItalic.otf", weight: "400", style: "italic" },
    { path: "../../public/fonts/graphik/Graphik-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/graphik/Graphik-Semibold.otf", weight: "600", style: "normal" },
    { path: "../../public/fonts/graphik/Graphik-Bold.otf", weight: "700", style: "normal" },
  ],
});

const tungsten = localFont({
  variable: "--font-tungsten",
  src: [
    { path: "../../public/fonts/tungsten/TungstenCond-Semibold.otf", weight: "600", style: "normal" },
    { path: "../../public/fonts/tungsten/TungstenCond-Bold.otf", weight: "700", style: "normal" },
  ],
});

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${graphik.variable} ${tungsten.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-graphik" suppressHydrationWarning>
        {children}
        <GoogleAnalytics />
        <GoogleTagManager />
      </body>
    </html>
  );
}
