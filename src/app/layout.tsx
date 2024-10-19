import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner'
import ReduxProviders from "@/lib/providers/providers";
import NavbarDashboard from "@/components/global/navbar/navbar";
import Providers from "@/lib/providers/react-query-provider";
import { constructMetadata } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProviders>
          
          <Providers>
          {children}
          </Providers>
        </ReduxProviders>
        <Toaster/>
      </body>
    </html>
  );
}
