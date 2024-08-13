import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { NextFont } from "next/dist/compiled/@next/font";

const inter: NextFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "keykap | typing test",
  description:
    "Keykap is the ultimate typing test website. Boost your WPM, accuracy, and speed with fun exercises. Track progress, compete, and become a typing champion. Join now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-primary-100 text-primary-900`}>
        <main className={`min-h-screen`}>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
