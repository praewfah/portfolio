'use client';
import { motion } from 'framer-motion';

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

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="font-semibold text-gray-800 mb-2">{title}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
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
  return (
    <section id="skills" className="pt-12 pb-20">
      <div className="container">
        <div className="divider mb-10" />

        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT: Technical Skills */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-2xl bg-white/60 shadow-sm ring-1 ring-gray-200 p-6"
          >
            <CardTitle>TECHNICAL SKILLS</CardTitle>

            <Group title="Frontend Development">
              {[
                "React", "Next.js", "Vue.js", "TypeScript", "JavaScript (ES6+)",
                "HTML5", "CSS3", "SCSS", "Tailwind", "Bootstrap", "AJAX"
              ].map((t) => <Tag key={t} label={t} />)}
            </Group>

            <Group title="Backend Development">
              {[
                "PHP 8+", "Laravel", "Symfony Components", "Node.js", "Python (FastAPI)",
                "MySQL", "PostgreSQL", "Redis"
              ].map((t) => <Tag key={t} label={t} />)}
            </Group>

            <Group title="API & Integration">
              {[
                "RESTful APIs", "SOAP", "XML/XSD", "JSON", "OAuth2/JWT"
              ].map((t) => <Tag key={t} label={t} />)}
            </Group>

            <Group title="DevOps & Tools">
              {[
                "Docker", "Git", "GitHub Actions", "Jenkins", "Linux (Ubuntu/CentOS)",
                "Apache", "Nginx", "Composer", "Yarn/NPM"
              ].map((t) => <Tag key={t} label={t} />)}
            </Group>
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
            <CardTitle>SPECIALIZATIONS</CardTitle>

            <Group title="Other Skills">
              {[
                "Agile Scrum", "Unit Testing (PHPUnit, Jest)", "Code Review",
                "Documentation", "Cross-Team Collaboration"
              ].map((t) => <Tag key={t} label={t} />)}
            </Group>

            <Group title="Languages">
              {["Thai (Native)", "English (Fluent)"].map((t) => <Tag key={t} label={t} />)}
            </Group>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
