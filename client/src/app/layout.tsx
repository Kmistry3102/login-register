import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { Outfit } from "next/font/google";
import NavBar from "@/components/layout/NavBar";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Login Register App",
  description: "A simple login and register application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen items-center justify-center">
            <NavBar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
