'use client';

import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../lib/translations";

export default function PortfolioSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const projects = t.portfolio.projects;

  return (
    <section id="portfolio" className="pb-24 pt-20 bg-gradient-to-b from-gray-50/40 via-white to-white">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <h2 className="h-section text-gray-800 tracking-[0.25em]">{t.portfolio.title}</h2>
            <p className="mt-4 max-w-xl text-sm text-gray-600">{t.portfolio.subtitle}</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-blue-300/60 hover:shadow-lg"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-50/60 via-white/40 to-cyan-50/50 pointer-events-none" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition hover:text-blue-700"
                  >
                    GitHub
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M11.3 3.3a1 1 0 00-1.4 1.4l3.3 3.3H6a1 1 0 000 2h7.2l-3.3 3.3a1 1 0 101.4 1.4l5-5a1 1 0 000-1.4l-5-5z" />
                    </svg>
                  </a>
                </div>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{project.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-blue-100 bg-blue-50/60 px-3 py-1 text-xs font-medium text-blue-700"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

