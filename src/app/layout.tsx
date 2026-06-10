import type { Metadata } from "next";
import "./globals.css";
import ClientWrapper from "../components/ClientWrapper";
import { siteFontClassName } from "../lib/fonts";

export const metadata: Metadata = { title: "Aumaporn T. | Portfolio", description: "Paged portfolio" };

export default function RootLayout({ children }:{ children: React.ReactNode }){
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${siteFontClassName} font-sans antialiased`}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
