'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../lib/translations';

const FORTUNE_HOME = 'https://fortunewallpaper.com';

export default function FortuneSection() {
  const { language } = useLanguage();
  const t = translations[language].fortune;

  const services = [
    {
      title: t.cardDaily,
      site: 'https://fortunewallpaper.com/daily',
      icon: '/icon-crystal-ball.svg',
    },
    {
      title: t.cardPersonal,
      site: 'https://fortunewallpaper.com/personal',
      icon: '/icon-birthday.svg',
    },
    {
      title: t.cardTarot,
      site: 'https://fortunewallpaper.com/tarot',
      icon: '/icon-tarot.svg',
    },
  ];

  return (
    <section id="fortune" className="pb-24 pt-20">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.35 }}
      >
        <div className="fortune-frame relative mx-auto overflow-hidden rounded-[2rem] shadow-2xl shadow-violet-900/20 ring-1 ring-white/10">
          <div className="relative">
            <Image
              src="/mobile-bg.webp"
              alt=""
              fill
              priority
              aria-hidden
              className="object-cover object-top"
              sizes="(max-width: 448px) 100vw, 448px"
            />

            <div className="relative z-10 flex flex-col items-center gap-4 px-5 py-8 text-center sm:gap-5 sm:px-6 sm:py-10">
              <div className="hero-section w-full space-y-2">
                <a
                  href={FORTUNE_HOME}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center transition hover:opacity-90"
                >
                  <Image
                    src="/logo.svg"
                    alt="Fortune Wallpaper"
                    width={160}
                    height={48}
                    className="fortune-logo h-auto"
                    priority
                  />
                </a>

                <h1 className="fortune-hero-title bg-gradient-to-b from-[#471919] to-[#ff0000] bg-clip-text text-transparent">
                  {t.heroLine1}
                  <br />
                  {t.heroLine2}
                </h1>
                <p className="fortune-subtitle mx-auto max-w-[16rem] text-[#471919] sm:max-w-xs">
                  {t.subtitle1}
                  <br />
                  {t.subtitle2}
                </p>

                <a
                  href={FORTUNE_HOME}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fortune-cta fortune-cta-glow mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8b6914] via-[#c9a227] to-[#8b6914] px-5 py-2.5 text-sm font-semibold text-white sm:mt-4 sm:px-6 sm:py-3"
                >
                  <span aria-hidden className="text-base">
                    ✨
                  </span>
                  {t.ctaButton}
                  <span aria-hidden className="text-base">
                    ✨
                  </span>
                </a>
              </div>

              <h3 className="fortune-services-title text-[#8b6914]">
                {t.servicesTitle}
              </h3>

              <div className="grid w-full max-w-[17.5rem] grid-cols-3 gap-2 sm:max-w-[19rem] sm:gap-3">
                {services.map((service, index) => (
                  <a
                    key={service.title}
                    href={service.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-w-0 flex-col items-center gap-1 transition hover:opacity-90 sm:gap-1.5"
                  >
                    <div
                      className="fortune-service-card-animate relative aspect-[10/14] w-full"
                      style={{ animationDelay: `${index * 0.45}s` }}
                    >
                      <Image
                        src="/frame-form-vertical.svg"
                        alt=""
                        fill
                        aria-hidden
                        className="object-contain"
                        sizes="(max-width: 448px) 22vw, 96px"
                      />
                      <div className="absolute inset-[10%_12%_20%_12%] flex items-center justify-center">
                        <Image
                          src={service.icon}
                          alt=""
                          fill
                          aria-hidden
                          className="object-contain"
                          sizes="(max-width: 448px) 14vw, 56px"
                        />
                      </div>
                    </div>
                    <span className="fortune-card-label line-clamp-2 w-full font-medium leading-tight text-[#471919]">
                      {service.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
