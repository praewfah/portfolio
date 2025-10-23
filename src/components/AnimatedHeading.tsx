'use client';
import { motion } from "framer-motion";
export default function AnimatedHeading({ children }:{ children: React.ReactNode }){
  return (
    <motion.h1 className="headline bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent animate-hue"
      initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{duration:.45}}>
      {children}
    </motion.h1>
  );
}
