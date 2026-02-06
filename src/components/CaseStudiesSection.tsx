'use client';

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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

  const studies = [
    { label: "Case Study 1", data: cs.study1 },
    { label: "Case Study 2", data: cs.study2 },
    { label: "Case Study 3", data: cs.study3 },
  ] as const;

  return (
    <section id="casestudies" className="pb-24 pt-20 bg-gradient-to-b from-gray-50/40 via-white to-white">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-4">
          <div>
            <h2 className="h-section text-gray-800 tracking-[0.25em]">{cs.title}</h2>
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
              <button
                type="button"
                className="w-full px-6 md:px-8 py-5 flex items-center justify-between gap-4 text-left hover:bg-white/70 transition"
                onClick={() => toggleOpenIndex(i)}
                aria-expanded={openIndexes.includes(i)}
                aria-controls={`casestudies-panel-${i}`}
              >
                <span className="text-xl font-semibold text-gray-900">
                  {s.label} – {s.data.title}
                </span>
                <span
                  className={`shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-transform ${
                    openIndexes.includes(i) ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 8l4 4 4-4" />
                  </svg>
                </span>
              </button>

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
