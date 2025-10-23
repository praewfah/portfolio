"use client";
import { useState, useEffect } from "react";

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");

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
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/90 border-b border-gray-200">
      <nav className="container flex justify-end gap-6 py-4">
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
      </nav>
    </header>
  );
}
