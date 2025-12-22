import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "../components/ui/sonner";
import Providers from "../providers/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CCTV TIK POLDA SUMSEL",
  description:
    "FileGear is a document management system that allows you to manage your documents in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${poppins.className}`}>
        <Toaster richColors position="top-right" theme="light" />
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
