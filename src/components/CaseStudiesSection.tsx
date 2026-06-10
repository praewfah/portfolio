'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../lib/translations";

export default function CaseStudiesSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const cs = t.caseStudies;
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleOpenIndex = (index: number) => {
    setOpenIndexes(openIndexes.includes(index) ? openIndexes.filter(i => i !== index) : [...openIndexes, index]);
  };

  const FORTUNE_SITE = "https://fortunewallpaper.com";

  const studies = [
    { label: "Case Study 1", data: cs.study4, externalUrl: FORTUNE_SITE },
    { label: "Case Study 2", data: cs.study1 },
    { label: "Case Study 3", data: cs.study2 },
    { label: "Case Study 4", data: cs.study3 },
  ] as const;

  return (
    <section id="casestudies" className="pb-24 pt-20 bg-gradient-to-b from-gray-50/40 via-white to-white">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-4">
          <div>
            <h2 className="h-section text-gray-800">{cs.title}</h2>
            <p className="mt-4 max-w-xl text-sm text-gray-600">{cs.subtitle}</p>
          </div>
        </div>

        <div className="space-y-4">
          {studies.map((s, i) => (
            <motion.article
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="rounded-2xl border border-gray-200/70 bg-white/80 shadow-sm overflow-hidden"
            >
              <div className="flex items-center justify-between gap-4 px-6 md:px-8 py-5">
                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 md:gap-3">
                  <button
                    type="button"
                    className="text-left text-xl font-semibold text-gray-900 transition hover:text-gray-700"
                    onClick={() => toggleOpenIndex(i)}
                    aria-expanded={openIndexes.includes(i)}
                    aria-controls={`casestudies-panel-${i}`}
                  >
                    {s.label} – {s.data.title}
                  </button>
                  {"externalUrl" in s && s.externalUrl && (
                    <a
                      href={s.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1 rounded-md border border-amber-300/80 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800 transition hover:bg-amber-100"
                    >
                      {language === "th" ? "ไปที่เว็บ" : "Visit site"}
                      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path d="M11.3 3.3a1 1 0 00-1.4 1.4l3.3 3.3H6a1 1 0 000 2h7.2l-3.3 3.3a1 1 0 101.4 1.4l5-5a1 1 0 000-1.4l-5-5z" />
                      </svg>
                    </a>
                  )}
                </div>
                <button
                  type="button"
                  className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50"
                  onClick={() => toggleOpenIndex(i)}
                  aria-expanded={openIndexes.includes(i)}
                  aria-label={openIndexes.includes(i) ? "Collapse" : "Expand"}
                >
                  <span
                    className={`inline-flex transition-transform ${
                      openIndexes.includes(i) ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 8l4 4 4-4" />
                    </svg>
                  </span>
                </button>
              </div>

              {openIndexes.includes(i) && (
                <div id={`casestudies-panel-${i}`} className="px-6 md:px-8 pb-6">
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">{s.data.overview}</p>

                  <div className="space-y-5 text-sm">
                    {s.data.blocks.map((block, idx) => (
                      <div key={idx}>
                        <h4 className="font-semibold text-gray-800 mb-2">{block.title}</h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600">
                          {block.items.map((item: string, j: number) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
