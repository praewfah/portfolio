'use client';
import ScrollPager from "@/components/ScrollPager";
import { motion } from "framer-motion";
import Link from "next/link";
const projects=[
  { slug:"pig-universe", title:"PIG-UNIVERSE", summary:"Real-time wallet for multi-gaming platforms.", tech:["FastAPI","Next.js","PostgreSQL","Redis"]},
  { slug:"seamless-wallet", title:"Seamless Wallet", summary:"Concurrency-safe transfers.", tech:["Python","SQLAlchemy","Alembic"]},
  { slug:"ui-kit", title:"Front-end UI Kit", summary:"Reusable components for gaming portal.", tech:["React","Tailwind","Storybook"]},
];
export default function ProjectsPage(){
  return (
    <section className="pt-12 pb-16">
      <ScrollPager prev="/" next="/about" />
      <motion.h1 className="headline mb-8" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}>Projects</motion.h1>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p,i)=>(
          <motion.div key={p.slug} initial={{opacity:0, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:i*0.05}}>
            <Link href={`/projects/${p.slug}`} className="card hover:shadow-[0_0_40px_rgba(0,255,255,0.12)] transition block">
              <div className="text-lg font-semibold">{p.title}</div>
              <p className="mt-2 subtle">{p.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">{p.tech.map(t=><span key={t} className="px-2 py-1 rounded-lg border border-white/10 text-sm text-white/80">{t}</span>)}</div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
