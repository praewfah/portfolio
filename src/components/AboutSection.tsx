'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../lib/translations";

export default function AboutSection() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <section id="about" className="relative">
      <div className="relative w-full min-h-[520px] md:h-[800px]">
        <Image 
          src="/p1.png" 
          alt="Praew" 
          fill 
          priority 
          className="object-cover object-center" 
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, 100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
        <div className="relative z-10 container pt-20 pb-12 md:absolute md:inset-0 md:flex md:items-center md:pt-0 md:pb-0">
          <div className="max-w-2xl">
            <motion.h1 
              className="h1-hero animate-fadeup md:mt-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              AUMAPORN T.
            </motion.h1>
            <motion.p 
              className="text-white text-base sm:text-lg mt-3 animate-fadeup" 
              style={{ animationDelay: '.2s' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t.about.subtitle}
            </motion.p>
            <motion.p 
              className="text-white text-base sm:text-lg animate-fadeup" 
              style={{ animationDelay: '.2s' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t.about.subtitle2}
            </motion.p>
            <motion.p 
              className="text-white/80 italic text-xs sm:text-sm mt-4 sm:mt-6 leading-relaxed animate-fadeup" 
              style={{ animationDelay: '.2s' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t.about.description1}
              <br /><br />
              {t.about.description2}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
