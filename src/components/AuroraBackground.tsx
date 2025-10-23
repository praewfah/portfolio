'use client';
export function AuroraBackground(){
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -inset-1 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(124,58,237,0.35)_0%,rgba(11,17,32,0)_60%)]" />
      <div className="absolute -inset-0 bg-[linear-gradient(120deg,#00C6FF,#0072FF,#7C3AED,#00FFFF,#38BDF8)] bg-[length:200%_200%] opacity-30 animate-aurora" />
    </div>
  );
}
