'use client';
import Image from "next/image";

export default function EducationSection() {
  return (
    <section id="education" className="pt-12 pb-16">
      <div className="container">
        <div className="relative h-[420px] w-full rounded">
          <Image src="/p2.png" alt="education" fill className="object-cover rounded" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent rounded"></div>
          <div className="absolute left-6 top-6 text-white">
            <h3 className="h-section text-white">EDUCATION</h3>
          </div>
          <div className="absolute right-6 top-1/3 max-w-xs text-white/90">
            <div className="font-semibold">Bachelor of Science in Computer Science</div>
            <p className="text-sm leading-6">Specialized in software development, algorithms, and system design</p>
          </div>
        </div>
      </div>
    </section>
  );
}
