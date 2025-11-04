'use client';
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../lib/translations";

export default function ExperienceSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const experiences = [
    t.experience.bluepi,
    t.experience.unixdev,
    t.experience.common,
    t.experience.diversition,
    t.experience.positionfp,
  ];
  return (
    <section id="experience" className="pb-24 pt-20">
      <div className="container">
        <h2 className="h-section mb-16 tracking-[0.25em] text-gray-800">
          {t.experience.title}
        </h2>

        <div className="relative border-l-2 border-gray-200 ml-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="relative pl-8 pb-16"
            >
              <span className="absolute -left-[10px] top-2 w-4 h-4 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full shadow-md" />

              <h3 className="text-xl font-semibold text-gray-900">{exp.company}</h3>
              <p className="text-gray-700 font-medium mt-1">{exp.role}</p>
              <p className="text-sm italic text-gray-500 mt-1">{exp.date}</p>

              <ul className="list-disc mt-4 pl-4 space-y-2 text-sm text-gray-600 leading-relaxed">
                {exp.bullets.map((b: string, idx: number) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
