import type { Metadata } from "next";
import localFont from "next/font/local";
import { buildMetadata } from "@/lib/metadata";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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

const gilroy = localFont({
  variable: "--font-gilroy",
  src: [
    { path: "../../public/fonts/gilroy/Gilroy-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/gilroy/Gilroy-Semibold.otf", weight: "600", style: "normal" },
    { path: "../../public/fonts/gilroy/Gilroy-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/gilroy/Gilroy-Extrabold.otf", weight: "800", style: "normal" },
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
      className={`${graphik.variable} ${tungsten.variable} ${gilroy.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-graphik" suppressHydrationWarning>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
