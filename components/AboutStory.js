'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { milestones } from '@/lib/content';

export default function AboutStory() {
  const [active, setActive] = useState(0);
  const mediaRef = useRef(null);
  const detailRef = useRef(null);
  const milestone = milestones[active];

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo([mediaRef.current, detailRef.current], { opacity: 0.35, y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
  }, { dependencies: [active] });

  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="section-heading split-heading" data-reveal>
          <h2 id="about-title">An arts entrepreneurship built around participation.</h2>
          <p>evam works across arts performance, arts management, arts education and arts-based behavioural learning.</p>
        </div>
        <div className="about-grid" data-reveal>
          <div className="about-copy">
            <div className="milestone-switch" aria-label="Company milestones">
              {milestones.map((item, index) => (
                <button key={item.year} type="button" className={active === index ? 'active' : ''} aria-pressed={active === index} onClick={() => setActive(index)}>{item.year}</button>
              ))}
            </div>
            <div ref={detailRef} className="milestone-detail">
              <h3>{milestone.title}</h3>
              <p>{milestone.description}</p>
            </div>
            <p className="about-note">The same founders connect evam’s performance-arts work with Sideways Training’s behavioural-learning programmes.</p>
          </div>
          <div className="about-visual">
            <div className={`about-image-frame ${milestone.year === '2011' ? 'is-founders' : ''}`}>
              <img ref={mediaRef} src={milestone.image} alt={milestone.alt} width="900" height="650" loading="lazy" />
            </div>
            <span className="about-year" aria-hidden="true">{milestone.year}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
