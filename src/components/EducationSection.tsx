'use client';
import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../lib/translations";

export default function EducationSection() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <section id="education" className="pt-12 pb-16">
      <div className="container">
        <div className="relative h-[420px] w-full rounded">
          <Image src="/p2.png" alt="education" fill className="object-cover rounded" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent rounded"></div>
          <div className="absolute inset-20 top-8 text-white">
            <h3 className="h-section text-white">{t.education.title}</h3>
          </div>
          <div className="absolute inset-20 top-1/4 max-w-xs text-white/90">
            <div className="font-semibold">{t.education.degree}</div>
            <p className="text-sm leading-6">{t.education.description}</p>
            <p className="text-sm leading-6">{t.education.description2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
