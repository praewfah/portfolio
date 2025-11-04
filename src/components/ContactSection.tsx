'use client';
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../lib/translations";

export default function ContactSection() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <section id="contact" className="pt-12 pb-24">
      <div className="container">
        <h2 className="h-section text-gray-400">{t.contact.title}</h2>
        <div className="grid md:grid-cols-4 gap-10 mt-24 text-sm">
          <div>
            <div className="italic font-semibold">{t.contact.mailingAddress}</div>
            <div className="subtle mt-2">{t.contact.mailingAddressValue}</div>
          </div>
          <div>
            <div className="italic font-semibold">{t.contact.emailAddress}</div>
            <div className="subtle mt-2">{t.contact.emailAddressValue}</div>
          </div>
          <div>
            <div className="italic font-semibold">{t.contact.phoneNumber}</div>
            <div className="subtle mt-2">{t.contact.phoneNumberValue}</div>
          </div>
          <div>
            <div className="italic font-semibold">{t.contact.linkedin}</div>
            <div className="subtle mt-2">{t.contact.linkedinValue}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
