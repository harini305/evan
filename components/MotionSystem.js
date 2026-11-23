'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function MotionSystem({ children }) {
  const root = useRef(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    const timers = [];
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const heroItems = gsap.utils.toArray('[data-hero-item]', root.current);
      if (heroItems.length) {
        gsap.fromTo(heroItems, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: 'power3.out', delay: 0.15 });
      }
      const revealGroups = gsap.utils.toArray('[data-reveal]', root.current).filter((element) => element.getBoundingClientRect().top >= window.innerHeight);
      revealGroups.forEach((element) => {
        gsap.fromTo(element, { y: 24, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });
      if (revealGroups.length) {
        timers.push(window.setTimeout(() => {
          gsap.set(revealGroups, { clearProps: 'opacity,transform' });
        }, 2500));
      }
      const refresh = gsap.delayedCall(0.15, () => ScrollTrigger.refresh()).pause();
      const observer = new ResizeObserver(() => refresh.restart(true));
      observer.observe(document.body);
      document.fonts.ready.then(() => ScrollTrigger.refresh());
      return () => observer.disconnect();
    });
    return () => {
      timers.forEach(window.clearTimeout);
      media.revert();
    };
  }, { scope: root });

  return <div ref={root}>{children}</div>;
}
