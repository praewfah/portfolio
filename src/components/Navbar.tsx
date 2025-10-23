'use client';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
const links=[{href:"/",label:"Home"},{href:"/projects",label:"Projects"},{href:"/about",label:"About"},{href:"/contact",label:"Contact"},{href:"/resume",label:"Resume"}];
export function Navbar(){
  const pathname=usePathname();
  return (
    <header className="sticky top-0 z-10 border-b border-white/10 backdrop-blur-xl">
      <div className="container-px mx-auto flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" width={120} height={36} alt="logo" className="opacity-90" />
        </Link>
        <nav className="flex gap-1">
          {links.map(l=>(
            <Link key={l.href} href={l.href} className={`px-3 py-2 rounded-xl transition hover:bg-white/10 ${pathname===l.href?'bg-white/10':''}`}>{l.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
