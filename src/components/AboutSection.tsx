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
      <div className="relative h-[600px] md:h-[700px] w-full">
        <Image 
          src="/p1.png" 
          alt="hero" 
          fill 
          priority 
          className="object-cover object-center" 
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, 100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
        <div className="container absolute inset-0 flex items-center">
          <div>
            <motion.h1 
              className="h1-hero animate-fadeup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              AUMAPORN T.
            </motion.h1>
            <motion.p 
              className="text-white/90 text-lg mt-3 animate-fadeup" 
              style={{ animationDelay: '.2s' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t.about.subtitle}
            </motion.p>
            <motion.p 
              className="text-gray-300 italic text-sm mt-6 animate-fadeup" 
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
