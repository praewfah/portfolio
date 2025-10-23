'use client';
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
const detail={
  "pig-universe":{title:"PIG-UNIVERSE",body:"Real-time wallet system with concurrency-safe ledgers and isolation."},
  "seamless-wallet":{title:"Seamless Wallet",body:"Transfer service with strict idempotency, distributed locks, reversals."},
  "ui-kit":{title:"Front-end UI Kit",body:"Reusable component library and layout system for gaming portal."}
} as const;
export default function ProjectDetail({ params }:{ params:{ slug: keyof typeof detail }}){
  const item=detail[params.slug]; if(!item) return notFound();
  return (
    <section className="pt-12 pb-16">
      <motion.h1 className="headline" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}>{item.title}</motion.h1>
      <motion.p className="mt-6 subtle max-w-prose" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.05}}>{item.body}</motion.p>
    </section>
  )
}
