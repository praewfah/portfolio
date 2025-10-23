'use client';
import ScrollPager from "@/components/ScrollPager";
import AnimatedHeading from "@/components/AnimatedHeading";
import { motion } from "framer-motion";
export default function AboutPage(){
  return (
    <section className="pt-12 pb-16">
      <ScrollPager prev="/projects" next="/contact" />
      <AnimatedHeading>About Me</AnimatedHeading>
      <motion.p className="mt-6 max-w-prose subtle" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.05}}>
        I design systems for reliability and scale, focusing on real-time transactions, clean API design, and developer experience.
      </motion.p>
    </section>
  )
}
