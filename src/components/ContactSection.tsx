'use client';

export default function ContactSection() {
  return (
    <section id="contact" className="pt-12 pb-24">
      <div className="container">
        <h2 className="h-section text-gray-400">GET IN TOUCH</h2>
        <div className="grid md:grid-cols-4 gap-10 mt-24 text-sm">
          <div>
            <div className="italic font-semibold">Mailing Address</div>
            <div className="subtle mt-2">2359/187 Sukhumvit 77 Road, Bangna-Trad, Bangkok 10250</div>
          </div>
          <div>
            <div className="italic font-semibold">Email Address</div>
            <div className="subtle mt-2">praew.auma@gmail.com</div>
          </div>
          <div>
            <div className="italic font-semibold">Phone Number</div>
            <div className="subtle mt-2">+66 84 659 5073</div>
          </div>
          <div>
            <div className="italic font-semibold">LinkedIn</div>
            <div className="subtle mt-2">linkedin.com/in/aumaporn-tangmanosodsikul-1771431a4</div>
          </div>
        </div>
      </div>
    </section>
  );
}
