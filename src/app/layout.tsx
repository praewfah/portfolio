import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { AuroraBackground } from "@/components/AuroraBackground";

export const metadata: Metadata = {
  title: "Praew | Futuristic Portfolio",
  description: "AI/Futuristic gradient portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuroraBackground />
        <Navbar />
        <main className="container-px mx-auto">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
