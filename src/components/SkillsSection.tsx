'use client';
import { motion } from 'framer-motion';
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../lib/translations";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: .35, ease: 'easeOut', delay: i * 0.03 }
  })
};

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-xs md:text-sm tracking-[.35em] text-gray-400">{children}</h3>
      <div className="mt-2 h-0.5 w-20 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
    </div>
  );
}

function Group({ title, items }: { title: string; items: readonly string[] | string[] }) {
  return (
    <div className="mb-6">
      <div className="font-semibold text-gray-800 mb-2">{title}</div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Tag key={item} label={item} />
        ))}
      </div>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span
      className="
        inline-flex items-center rounded-full px-3 py-1 text-xs md:text-sm
        bg-gray-100 text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50
        transition
      "
    >
      {label}
    </span>
  );
}

export default function SkillsSection() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="skills" className="pt-12 pb-20">
      <div className="container">
        <div className="mb-10" />

        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT: Technical Skills */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-2xl bg-white/60 shadow-sm ring-1 ring-gray-200 p-6"
          >
            <CardTitle>{t.skills.title}</CardTitle>

            <Group title={t.skills.frontend} items={t.skills.skills.frontend} />

            <Group title={t.skills.backend} items={t.skills.skills.backend} />

            <Group title={t.skills.api} items={t.skills.skills.api} />

            <Group title={t.skills.devops} items={t.skills.skills.devops} />
          </motion.div>

          {/* RIGHT: Specializations */}
          <motion.div
            variants={fade}
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-2xl bg-white/60 shadow-sm ring-1 ring-gray-200 p-6"
          >
            <CardTitle>{t.skills.specialization}</CardTitle>

            <Group title={t.skills.other} items={t.skills.skills.other} />

            <div className="mb-6">
              <div className="font-semibold text-gray-800 mb-2">{t.skills.languages}</div>
              <div className="flex flex-wrap gap-2">
                <Tag label={t.skills.languagesValue} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
