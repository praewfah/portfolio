'use client';
import AnimatedHeading from "@/components/AnimatedHeading";
import { AnimatedButton } from "@/components/AnimatedButton";
import ScrollPager from "@/components/ScrollPager";
import { motion } from "framer-motion";

export default function HomePage(){
  return (
    <div className="pt-14">
      <ScrollPager next="/projects" />
      <section className="h-vh grid md:grid-cols-2 gap-10 items-center">
        <div>
          <AnimatedHeading>Engineering AI-ready Experiences</AnimatedHeading>
          <p className="mt-4 subtle max-w-prose">
            Full-stack developer focusing on real-time systems, clean APIs, and modern UX.
          </p>
          <div className="mt-8 flex gap-3">
            <AnimatedButton href="/projects">View Projects</AnimatedButton>
            <AnimatedButton href="/resume" variant="ghost">Download Resume</AnimatedButton>
          </div>
          <div className="mt-4 font-mono text-sm text-white/60">
            Stack: Next.js · FastAPI · PostgreSQL · Docker · Redis
          </div>
        </div>
        <motion.div className="card" initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{delay:.1, duration:.45}}>
          <div className="text-sm text-white/70 mb-2">Now playing</div>
          <div className="font-mono text-cyan-200">&gt; training embeddings… ✓</div>
          <div className="font-mono text-cyan-200 mt-1">&gt; deploying api v3… ✓</div>
          <div className="font-mono text-cyan-200 mt-1">&gt; running e2e tests… ✓</div>
        </motion.div>
      </section>
    </div>
  );
}
