import type { Metadata } from "next";
import "./globals.css";
import ClientWrapper from "../components/ClientWrapper";

export const metadata: Metadata = { title: "Aumaporn T. | Portfolio", description: "Paged portfolio" };

export default function RootLayout({ children }:{ children: React.ReactNode }){
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
