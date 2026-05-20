"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../lib/translations";

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const [activeSection, setActiveSection] = useState("about");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [demosOpen, setDemosOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const demosRef = useRef<HTMLDivElement>(null);
  const demosBtnRef = useRef<HTMLButtonElement>(null);
  const [demosMenuPos, setDemosMenuPos] = useState({ top: 0, left: 0 });

  const mainNavItems = useMemo(
    () => [
      { id: "about", label: t.nav.about },
      { id: "experience", label: t.nav.experience },
      { id: "skills", label: t.nav.skills },
      { id: "education", label: t.nav.education },
      { id: "portfolio", label: t.nav.portfolio },
      { id: "casestudies", label: t.nav.caseStudies },
      { id: "architecture", label: t.nav.architecture },
      { id: "contact", label: t.nav.contact },
    ],
    [t.nav],
  );

  const demoNavItems = useMemo(
    () => [
      { id: "fortune", label: t.nav.fortune },
      { id: "cardgame", label: t.nav.cardgame },
    ],
    [t.nav.fortune, t.nav.cardgame],
  );

  const navBeforeDemos = useMemo(
    () => mainNavItems.filter((item) => item.id !== "contact"),
    [mainNavItems],
  );

  const sectionOrder = useMemo(
    () => [
      ...navBeforeDemos.map((item) => item.id),
      ...demoNavItems.map((item) => item.id),
      "contact",
    ],
    [navBeforeDemos, demoNavItems],
  );

  const demosActive = demoNavItems.some((item) => activeSection === item.id);

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionOrder.map((id) => document.getElementById(id));
      const scrollPosition = window.scrollY + 100;
      setShowScrollTop(window.scrollY > 320);

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
    if (!demosOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        demosRef.current?.contains(target) ||
        demosBtnRef.current?.contains(target)
      ) {
        return;
      }
      setDemosOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [demosOpen]);

  const updateDemosMenuPos = () => {
    if (!demosBtnRef.current) return;
    const rect = demosBtnRef.current.getBoundingClientRect();
    setDemosMenuPos({ top: rect.bottom + 4, left: rect.left });
  };

  const toggleDemos = () => {
    setDemosOpen((prev) => {
      const next = !prev;
      if (next) requestAnimationFrame(updateDemosMenuPos);
      return next;
    });
  };

  useEffect(() => {
    if (!demosOpen) return;
    updateDemosMenuPos();
    window.addEventListener("scroll", updateDemosMenuPos, true);
    window.addEventListener("resize", updateDemosMenuPos);
    return () => {
      window.removeEventListener("scroll", updateDemosMenuPos, true);
      window.removeEventListener("resize", updateDemosMenuPos);
    };
  }, [demosOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
    setDemosOpen(false);
  };

  const linkClass = (active: boolean, id?: string) =>
    [
      "relative shrink-0 whitespace-nowrap rounded-md px-1.5 py-1.5 text-[11px] font-medium leading-tight transition-all duration-200 sm:px-2 sm:text-xs md:px-2 md:text-[12px] lg:text-xs xl:px-2.5 xl:text-sm",
      id === "fortune"
        ? active
          ? "bg-orange-100/70 text-orange-900"
          : "bg-orange-50/70 text-orange-800 hover:bg-orange-100/70 hover:text-orange-900"
        : active
          ? "text-gray-900"
          : "text-gray-600 hover:text-gray-900",
    ].join(" ");

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

  const submenuClass = (active: boolean, id: string) =>
    [
      "block w-full rounded-md px-3 py-2 text-left text-xs font-medium transition-colors sm:text-sm",
      id === "fortune"
        ? active
          ? "bg-orange-100/70 text-orange-900"
          : "text-orange-800 hover:bg-orange-50"
        : active
          ? "bg-gray-100 text-gray-900"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
    ].join(" ");

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur-xl">
        <nav className="container flex items-center justify-between gap-2 py-2 sm:gap-3 sm:py-2.5 md:py-3">
          {/* Desktop: nav left, language right */}
          <div className="hidden min-w-0 flex-1 items-center gap-3 md:flex">
            <div className="min-w-0 flex-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex w-max items-center justify-start gap-x-0.5 sm:gap-x-1 lg:gap-x-1.5 xl:gap-x-2">
                {navBeforeDemos.map((item) => {
                  const active = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={linkClass(active)}
                    >
                      {item.label}
                      <span
                        className={[
                          "pointer-events-none absolute inset-x-1 bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-opacity duration-300",
                          active ? "opacity-100" : "opacity-0 hover:opacity-50",
                        ].join(" ")}
                      />
                    </button>
                  );
                })}

                <div className="relative shrink-0" ref={demosRef}>
                  <button
                    ref={demosBtnRef}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDemos();
                    }}
                    className={[
                      linkClass(demosActive),
                      "inline-flex items-center gap-0.5",
                    ].join(" ")}
                    aria-expanded={demosOpen}
                    aria-haspopup="true"
                  >
                    {t.nav.demos}
                    <svg
                      className={`h-3 w-3 transition-transform ${demosOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 8l4 4 4-4" />
                    </svg>
                    <span
                      className={[
                        "pointer-events-none absolute inset-x-1 bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-opacity duration-300",
                        demosActive ? "opacity-100" : "opacity-0 hover:opacity-50",
                      ].join(" ")}
                    />
                  </button>
                  {demosOpen && (
                    <div
                      className="fixed z-[100] min-w-[9.5rem] rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                      style={{ top: demosMenuPos.top, left: demosMenuPos.left }}
                    >
                      {demoNavItems.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => scrollToSection(item.id)}
                          className={submenuClass(activeSection === item.id, item.id)}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className={linkClass(activeSection === "contact")}
                >
                  {t.nav.contact}
                  <span
                    className={[
                      "pointer-events-none absolute inset-x-1 bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-opacity duration-300",
                      activeSection === "contact" ? "opacity-100" : "opacity-0 hover:opacity-50",
                    ].join(" ")}
                  />
                </button>
              </div>
            </div>
            {langSwitcher}
          </div>

          {/* Mobile */}
          <div className="flex w-full min-w-0 items-center justify-between gap-2 md:hidden">
            <span className="truncate text-sm font-semibold tracking-wide text-gray-800">
              Aumaporn T.
            </span>
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
          <div className="max-h-[min(70vh,calc(100dvh-4rem))] overflow-y-auto border-t border-gray-200 bg-white/95 backdrop-blur md:hidden">
            <div className="container flex flex-col gap-1 py-3">
              {navBeforeDemos.map((item) => {
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={[
                      "rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200",
                      active
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    ].join(" ")}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="mt-1 rounded-lg border border-gray-100 bg-gray-50/80">
                <button
                  type="button"
                  onClick={() => setDemosOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-gray-800 transition hover:bg-gray-100/80"
                  aria-expanded={demosOpen}
                >
                  {t.nav.demos}
                  <svg
                    className={`h-4 w-4 text-gray-500 transition-transform ${demosOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 8l4 4 4-4" />
                  </svg>
                </button>
                {demosOpen && (
                  <div className="border-t border-gray-100 px-2 pb-2 pt-1">
                    {demoNavItems.map((item) => {
                      const active = activeSection === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => scrollToSection(item.id)}
                          className={[
                            "w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-200",
                            item.id === "fortune"
                              ? active
                                ? "bg-orange-100/70 text-orange-900"
                                : "bg-orange-50/70 text-orange-800 hover:bg-orange-100/70 hover:text-orange-900"
                              : active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-600 hover:bg-white hover:text-gray-900",
                          ].join(" ")}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className={[
                  "rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200",
                  activeSection === "contact"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                ].join(" ")}
              >
                {t.nav.contact}
              </button>
            </div>
          </div>
        )}
      </header>
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-[70] inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-50 hover:text-gray-900 md:bottom-5 md:right-5"
          aria-label={language === "th" ? "เลื่อนขึ้นด้านบน" : "Scroll to top"}
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 15V5m0 0l-4 4m4-4l4 4" />
          </svg>
        </button>
      )}
    </>
  );
}
