import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/Nav";
import PageTransition from "../components/PageTransition";

export const metadata: Metadata = { title: "Aumaporn T. | Portfolio", description: "Paged portfolio" };

export default function RootLayout({ children }:{ children: React.ReactNode }){
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="min-h-[80vh]"><PageTransition>{children}</PageTransition></main>
      </body>
    </html>
  );
}
