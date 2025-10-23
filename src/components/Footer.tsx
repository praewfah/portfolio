export function Footer(){
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="container-px mx-auto py-10 text-sm text-white/60 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div>© {new Date().getFullYear()} Praew. All rights reserved.</div>
        <div className="font-mono">Next.js • Tailwind • Framer Motion</div>
      </div>
    </footer>
  )
}
