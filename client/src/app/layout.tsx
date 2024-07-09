import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <nav>hh</nav>   yeta bata whole entire html nai dekhauxa  */}
      {/* yesle jastai maile nav banaye vani purai page lai nai kaam lagxa home about sab */}
       <body className={inter.className}>{children}</body>
    </html>
  );
}