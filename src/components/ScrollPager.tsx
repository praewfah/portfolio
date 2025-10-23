'use client';
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
type Props = { prev?: string | null; next?: string | null; cooldownMs?: number; threshold?: number };
export default function ScrollPager({ prev=null, next=null, cooldownMs=900, threshold=30 }: Props){
  const router = useRouter();
  const lockedUntil = useRef(0);
  const touchStartY = useRef<number | null>(null);
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now < lockedUntil.current) return;
      if (e.deltaY > threshold && next) { lockedUntil.current = now + cooldownMs; router.push(next); }
      else if (e.deltaY < -threshold && prev) { lockedUntil.current = now + cooldownMs; router.push(prev); }
    };
    const onTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const dy = touchStartY.current - (e.changedTouches[0]?.clientY ?? touchStartY.current);
      touchStartY.current = null;
      const now = Date.now();
      if (now < lockedUntil.current) return;
      if (dy > 40 && next) { lockedUntil.current = now + cooldownMs; router.push(next); }
      if (dy < -40 && prev) { lockedUntil.current = now + cooldownMs; router.push(prev); }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [prev, next, cooldownMs, threshold, router]);
  return null;
}
