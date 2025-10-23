'use client';
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
export default function ScrollPager({ prev, next, cooldownMs=900, threshold=30 }:{ prev?: string, next?: string, cooldownMs?: number, threshold?: number }){
  const router = useRouter();
  const lock = useRef(0);
  const tStart = useRef<number | null>(null);
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const now = Date.now(); if (now < lock.current) return;
      if (e.deltaY > threshold && next) { lock.current = now + cooldownMs; router.push(next); }
      else if (e.deltaY < -threshold && prev) { lock.current = now + cooldownMs; router.push(prev); }
    };
    const onTouchStart = (e: TouchEvent) => { tStart.current = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (tStart.current===null) return;
      const dy = tStart.current - (e.changedTouches[0]?.clientY ?? tStart.current);
      tStart.current = null;
      const now = Date.now(); if (now < lock.current) return;
      if (dy > 40 && next) { lock.current = now + cooldownMs; router.push(next); }
      if (dy < -40 && prev) { lock.current = now + cooldownMs; router.push(prev); }
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [prev, next, cooldownMs, threshold, router]);
  return null;
}
