'use client';
import { LanguageProvider } from "../contexts/LanguageContext";
import Nav from "../components/Nav";
import PageTransition from "../components/PageTransition";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Nav />
      <main className="min-h-[80vh]">
        <PageTransition>{children}</PageTransition>
      </main>
    </LanguageProvider>
  );
}

