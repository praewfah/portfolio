"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../lib/translations";

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const [activeSection, setActiveSection] = useState("about");

  const navItems = [
    { id: "about", label: t.nav.about },
    { id: "experience", label: t.nav.experience },
    { id: "skills", label: t.nav.skills },
    { id: "education", label: t.nav.education },
    { id: "gallery", label: t.nav.gallery },
    { id: "contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i]!.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [language]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/90 border-b border-gray-200">
      <nav className="container flex items-center justify-between py-4">
        <div className="flex gap-6">
          {navItems.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  relative text-base font-medium transition-all duration-200
                  ${
                    active
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }
                `}
              >
                {item.label}
                <span
                  className={`
                    absolute left-0 bottom-[-4px] h-[2px] w-full rounded-full
                    bg-gradient-to-r from-blue-400 to-cyan-400
                    transition-opacity duration-300
                    ${active ? "opacity-100" : "opacity-0 hover:opacity-60"}
                  `}
                />
              </button>
            );
          })}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage('th')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              language === 'th'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ไทย
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              language === 'en'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            EN
          </button>
        </div>
      </nav>
    </header>
  );
}
