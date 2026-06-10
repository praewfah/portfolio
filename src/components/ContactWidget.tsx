'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../lib/translations';

export default function ContactWidget() {
  const { language } = useLanguage();
  const t = translations[language];
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const linkedinUrl = t.contact.linkedinValue.startsWith('http')
    ? t.contact.linkedinValue
    : `https://${t.contact.linkedinValue}`;

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label={language === 'th' ? 'ปิด' : 'Close'}
          className="fixed inset-0 z-[65] bg-black/20 backdrop-blur-[1px] transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3">
        {open && (
          <div
            ref={panelRef}
            id="contact-widget-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-widget-title"
            className="w-[min(calc(100vw-2.5rem),22rem)] origin-bottom-right animate-[contact-pop_0.28s_ease-out] overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 text-white">
              <div className="min-w-0">
                <p id="contact-widget-title" className="truncate text-sm font-semibold">
                  {t.contact.title}
                </p>
                <p className="truncate text-xs text-white/85">{t.contact.greeting}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
                aria-label={language === 'th' ? 'ปิด' : 'Close'}
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5l10 10M15 5L5 15" />
                </svg>
              </button>
            </div>

            <div className="max-h-[min(60vh,24rem)] space-y-4 overflow-y-auto px-4 py-4 text-sm">
              <ContactRow label={t.contact.stayingAt} value="Bangkok, Thailand" />
              <ContactRow
                label={t.contact.emailAddress}
                value={t.contact.emailAddressValue}
                href={`mailto:${t.contact.emailAddressValue}`}
              />
              <ContactRow
                label={t.contact.linkedin}
                value={t.contact.linkedinValue}
                href={linkedinUrl}
                external
              />
              <ContactRow
                label={t.contact.github}
                value={t.contact.githubValue}
                href={`https://${t.contact.githubValue}`}
                external
              />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="contact-widget-panel"
          className={[
            'inline-flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition',
            open
              ? 'bg-gray-800 text-white hover:bg-gray-900'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600',
          ].join(' ')}
          aria-label={t.nav.contact}
        >
          {open ? (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}

function ContactRow({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = href ? (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="mt-1 block break-all text-blue-600 transition hover:text-blue-700 hover:underline"
    >
      {value}
    </a>
  ) : (
    <p className="mt-1 text-gray-600">{value}</p>
  );

  return (
    <div className="rounded-xl bg-gray-50 px-3 py-2.5">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
      {content}
    </div>
  );
}
