'use client';
import { motion } from "framer-motion";
import Link from "next/link";
export function AnimatedButton({ href, children, variant='primary' }:{ href:string; children:React.ReactNode; variant?:'primary'|'ghost'}){
  const cls = variant==='primary' ? 'btn btn-primary' : 'btn';
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      <Link href={href} className={cls}>{children}</Link>
    </motion.div>
  );
}
