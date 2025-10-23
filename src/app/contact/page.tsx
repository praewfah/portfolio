'use client';
import ScrollPager from "@/components/ScrollPager";
import { motion } from "framer-motion";
export default function ContactPage(){
  return (
    <section className="pt-12 pb-16">
      <ScrollPager prev="/about" next="/resume" />
      <motion.h1 className="headline" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}>Contact</motion.h1>
      <motion.p className="mt-6 subtle" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.05}}>Let’s build something great together.</motion.p>
    </section>
  )
}
