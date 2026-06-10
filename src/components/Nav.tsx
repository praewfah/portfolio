"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../lib/translations";

type NavItem = {
  id: string;
  label: string;
  accent?: "fortune" | "cardgame";
};

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const [activeSection, setActiveSection] = useState("about");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const moreBtnRef = useRef<HTMLButtonElement>(null);
  const [moreMenuPos, setMoreMenuPos] = useState({ top: 0, left: 0 });

  const primaryNavItems = useMemo<NavItem[]>(
    () => [
      { id: "about", label: t.nav.about },
      { id: "experience", label: t.nav.experience },
      { id: "skills", label: t.nav.skills },
      { id: "portfolio", label: t.nav.portfolio },
      { id: "fortune", label: t.nav.fortune, accent: "fortune" },
      { id: "cardgame", label: t.nav.cardgame, accent: "cardgame" },
    ],
    [t.nav],
  );

  const moreNavItems = useMemo<NavItem[]>(
    () => [
      { id: "education", label: t.nav.education },
      { id: "casestudies", label: t.nav.caseStudies },
      { id: "architecture", label: t.nav.architecture },
    ],
    [t.nav],
  );

  const sectionOrder = useMemo(
    () => [
      "about",
      "experience",
      "skills",
      "education",
      "portfolio",
      "casestudies",
      "architecture",
      "fortune",
      "cardgame",
    ],
    [],
  );

  const moreActive = moreNavItems.some((item) => activeSection === item.id);

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionOrder.map((id) => document.getElementById(id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i]!.offsetTop <= scrollPosition) {
          setActiveSection(sectionOrder[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionOrder]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!moreOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (moreRef.current?.contains(target) || moreBtnRef.current?.contains(target)) {
        return;
      }
      setMoreOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [moreOpen]);

  const updateMoreMenuPos = () => {
    if (!moreBtnRef.current) return;
    const rect = moreBtnRef.current.getBoundingClientRect();
    setMoreMenuPos({ top: rect.bottom + 4, left: rect.left });
  };

  const toggleMore = () => {
    setMoreOpen((prev) => {
      const next = !prev;
      if (next) requestAnimationFrame(updateMoreMenuPos);
      return next;
    });
  };

  useEffect(() => {
    if (!moreOpen) return;
    updateMoreMenuPos();
    window.addEventListener("scroll", updateMoreMenuPos, true);
    window.addEventListener("resize", updateMoreMenuPos);
    return () => {
      window.removeEventListener("scroll", updateMoreMenuPos, true);
      window.removeEventListener("resize", updateMoreMenuPos);
    };
  }, [moreOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
    setMoreOpen(false);
  };

  const linkClass = (active: boolean, accent?: NavItem["accent"]) => {
    if (accent === "fortune") {
      return [
        "relative shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 sm:px-3 sm:text-sm",
        active
          ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm"
          : "bg-orange-50 text-orange-800 ring-1 ring-orange-200/80 hover:bg-orange-100 hover:text-orange-900",
      ].join(" ");
    }
    if (accent === "cardgame") {
      return [
        "relative shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 sm:px-3 sm:text-sm",
        active
          ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-sm"
          : "bg-violet-50 text-violet-800 ring-1 ring-violet-200/80 hover:bg-violet-100 hover:text-violet-900",
      ].join(" ");
    }
    return [
      "relative shrink-0 whitespace-nowrap rounded-md px-2 py-1.5 text-xs font-medium transition-all duration-200 sm:text-sm",
      active ? "text-gray-900" : "text-gray-600 hover:text-gray-900",
    ].join(" ");
  };

  const mobileLinkClass = (active: boolean, accent?: NavItem["accent"]) => {
    if (accent === "fortune") {
      return [
        "rounded-xl px-3 py-3 text-left text-sm font-semibold transition-all duration-200",
        active
          ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm"
          : "bg-orange-50 text-orange-900 ring-1 ring-orange-200/80 hover:bg-orange-100",
      ].join(" ");
    }
    if (accent === "cardgame") {
      return [
        "rounded-xl px-3 py-3 text-left text-sm font-semibold transition-all duration-200",
        active
          ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-sm"
          : "bg-violet-50 text-violet-900 ring-1 ring-violet-200/80 hover:bg-violet-100",
      ].join(" ");
    }
    return [
      "rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200",
      active ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
    ].join(" ");
  };

  const langSwitcher = (
    <div
      className="inline-flex shrink-0 items-center rounded-full border border-gray-200/90 bg-white/95 p-0.5 shadow-sm"
      role="group"
      aria-label={language === "th" ? "เลือกภาษา" : "Choose language"}
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all sm:px-3 sm:py-1.5 sm:text-xs ${
          language === "en"
            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("th")}
        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all sm:px-3 sm:py-1.5 sm:text-xs ${
          language === "th"
            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        ไทย
      </button>
    </div>
  );

  const renderUnderline = (active: boolean, accent?: NavItem["accent"]) =>
    accent ? null : (
      <span
        className={[
          "pointer-events-none absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-opacity duration-300",
          active ? "opacity-100" : "opacity-0 group-hover:opacity-50",
        ].join(" ")}
      />
    );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur-xl">
        <nav className="container flex items-center justify-between gap-3 py-2.5 md:py-3">
          <button
            type="button"
            onClick={scrollToTop}
            className="hidden shrink-0 text-sm font-semibold tracking-wide text-gray-800 transition hover:text-gray-900 md:inline"
          >
            Aumaporn T.
          </button>

          {/* Desktop */}
          <div className="hidden min-w-0 flex-1 items-center justify-end gap-4 md:flex">
            <div className="flex items-center gap-1 lg:gap-1.5">
              {primaryNavItems.map((item) => {
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`group ${linkClass(active, item.accent)}`}
                  >
                    {item.label}
                    {renderUnderline(active, item.accent)}
                  </button>
                );
              })}

              <div className="relative shrink-0" ref={moreRef}>
                <button
                  ref={moreBtnRef}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMore();
                  }}
                  className={`group inline-flex items-center gap-0.5 ${linkClass(moreActive)}`}
                  aria-expanded={moreOpen}
                  aria-haspopup="true"
                >
                  {t.nav.more}
                  <svg
                    className={`h-3 w-3 transition-transform ${moreOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 8l4 4 4-4" />
                  </svg>
                  {renderUnderline(moreActive)}
                </button>
                {moreOpen && (
                  <div
                    className="fixed z-[100] min-w-[11rem] rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                    style={{ top: moreMenuPos.top, left: moreMenuPos.left }}
                  >
                    {moreNavItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        className={[
                          "block w-full px-3 py-2 text-left text-sm font-medium transition-colors",
                          activeSection === item.id
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        ].join(" ")}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {langSwitcher}
          </div>

          {/* Mobile */}
          <div className="flex w-full min-w-0 items-center justify-between gap-2 md:hidden">
            <button
              type="button"
              onClick={scrollToTop}
              className="truncate text-sm font-semibold tracking-wide text-gray-800"
            >
              Aumaporn T.
            </button>
            <div className="flex shrink-0 items-center gap-2">
              {langSwitcher}
              <button
                type="button"
                className="inline-flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Toggle navigation"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 4l12 12M16 4L4 16" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 6h14M3 10h14M3 14h14" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="max-h-[min(75vh,calc(100dvh-4rem))] overflow-y-auto border-t border-gray-200 bg-white/95 backdrop-blur md:hidden">
            <div className="container flex flex-col gap-1 py-3">
              <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {t.nav.demos}
              </p>
              <div className="mb-2 grid grid-cols-2 gap-2 px-1">
                {primaryNavItems
                  .filter((item) => item.accent)
                  .map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={mobileLinkClass(activeSection === item.id, item.accent)}
                    >
                      {item.label}
                    </button>
                  ))}
              </div>

              {primaryNavItems
                .filter((item) => !item.accent)
                .map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={mobileLinkClass(activeSection === item.id)}
                  >
                    {item.label}
                  </button>
                ))}

              <div className="mt-2 rounded-lg border border-gray-100 bg-gray-50/80">
                <button
                  type="button"
                  onClick={() => setMoreOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-gray-800 transition hover:bg-gray-100/80"
                  aria-expanded={moreOpen}
                >
                  {t.nav.more}
                  <svg
                    className={`h-4 w-4 text-gray-500 transition-transform ${moreOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 8l4 4 4-4" />
                  </svg>
                </button>
                {moreOpen && (
                  <div className="border-t border-gray-100 px-2 pb-2 pt-1">
                    {moreNavItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        className={mobileLinkClass(activeSection === item.id)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
