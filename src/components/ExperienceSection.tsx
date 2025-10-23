'use client';
import { motion } from "framer-motion";

const experiences = [
  {
    company: "BluePi Co., Ltd.",
    role: "Senior Back-end Engineer",
    date: "April 2021 - Present",
    bullets: [
      "Developed and maintained multi-app gaming ecosystem using Next.js (React) and FastAPI/PHP backends.",
      "Integrated payment gateways, external APIs, and seamless wallet logic for cross-platform gaming systems.",
      "Optimized SQL queries and schema structures for high-traffic applications.",
      "Built reusable UI libraries and shared service modules in Nx Monorepo architecture.",
      "Improved CI/CD pipelines using Docker multi-stage builds and automated testing."
    ]
  },
  {
    company: "UnixDev Co., Ltd.",
    role: "Senior PHP Developer",
    date: "July 2020 - April 2021",
    bullets: [
      "Implemented a digital education platform using PHP Laravel, Vue.js, and MySQL.",
      "Developed scalable backend services and admin dashboards.",
      "Optimized database queries and schemas for performance.",
      "Collaborated with teams to ensure reliable system deployment and quality.",
      "Maintained CI/CD pipelines using Docker and Git workflow."
    ]
  },
  {
    company: "Common-Services Co., Ltd.",
    role: "Senior Developer",
    date: "December 2013 - February 2020",
    bullets: [
      "Backend development for large-scale e-commerce data systems.",
      "Implemented SOAP/REST services using PHP, XML, and JSON.",
      "Designed & optimized MySQL databases including indexing and query tuning.",
      "Marketplace integrations: Amazon, Cdiscount, Mirakl, Shopify, etc.",
      "Enhanced legacy systems and CodeIgniter-based applications.",
      "Supported frontend using React.js and Node.js."
    ]
  },
  {
    company: "Diversition Co., Ltd.",
    role: "PHP Developer",
    date: "2011 - November 2013",
    bullets: [
      "Developed internal business systems using OOP PHP.",
      "Created workflows: Order, Material Receive, Invoicing.",
      "Designed Drupal-based UI and CMS user permission systems.",
      "Maintained and improved Drupal websites and usability."
    ]
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="pb-24 pt-20">
      <div className="container">
        <h2 className="h-section mb-16 tracking-[0.25em] text-gray-800">
          EXPERIENCE
        </h2>

        <div className="relative border-l-2 border-gray-200 ml-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="relative pl-8 pb-16"
            >
              <span className="absolute -left-[10px] top-2 w-4 h-4 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full shadow-md" />

              <h3 className="text-xl font-semibold text-gray-900">{exp.company}</h3>
              <p className="text-gray-700 font-medium mt-1">{exp.role}</p>
              <p className="text-sm italic text-gray-500 mt-1">{exp.date}</p>

              <ul className="list-disc mt-4 pl-4 space-y-2 text-sm text-gray-600 leading-relaxed">
                {exp.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
