'use client';
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../lib/translations";

export default function ContactSection() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <section id="contact" className="pt-12 pb-24">
      <div className="container mb-40">
        <h2 className="h-section text-gray-400">{t.contact.title}</h2>
        <div className="grid gap-10 mt-24 text-sm">
          <div>
            <div className="italic font-semibold">{t.contact.stayingAt}</div>
            <div className="subtle mt-2">Bangkok, Thailand</div>
          </div>
          {/* <div>
            <div className="italic font-semibold">{t.contact.mailingAddress}</div>
            <div className="subtle mt-2">{t.contact.mailingAddressValue}</div>
          </div> */}
          <div>
            <div className="italic font-semibold">{t.contact.emailAddress}</div>
            <div className="subtle mt-2">{t.contact.emailAddressValue}</div>
          </div>
          {/* <div>
            <div className="italic font-semibold">{t.contact.phoneNumber}</div>
            <div className="subtle mt-2">{t.contact.phoneNumberValue}</div>
          </div> */}
          <div>
            <div className="italic font-semibold">{t.contact.linkedin}</div>
            <div className="subtle mt-2">{t.contact.linkedinValue}</div>
          </div>
          <div>
            <div className="italic font-semibold">{t.contact.github}</div>
            <a
              href={`https://${t.contact.githubValue}`}
              target="_blank"
              rel="noopener noreferrer"
              className="subtle mt-2 block text-blue-500 hover:text-blue-600 hover:underline"
            >
              {t.contact.githubValue}
            </a>
          </div>
        </div>
      </div>
      <div className="mb-40" />  
      {/* <div className="text-center text-sm text-gray-500 mb-40">
        <p>
          Copyright © 2026 Aumaporn Tangmanosodsikul. All rights reserved.
        </p>
      </div> */}
    </section>
  );
}
