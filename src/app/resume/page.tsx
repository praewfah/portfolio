'use client';
import ScrollPager from "@/components/ScrollPager";
import { motion } from "framer-motion";
export default function ResumePage(){
  return (
    <section className="pt-12 pb-16">
      <ScrollPager prev="/contact" />
      <motion.h1 className="headline" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}>Resume</motion.h1>
      <motion.p className="mt-6 subtle" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.05}}>Download a PDF version below.</motion.p>
      <a className="btn btn-primary mt-6" href="/resume.pdf" download>Download Resume (PDF)</a>
      <p className="mt-6 subtle">Replace <code>/public/resume.pdf</code> with your actual resume.</p>
    </section>
  )
}
