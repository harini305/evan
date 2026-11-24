'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { awards, clients } from '@/lib/content';

export default function Credibility() {
  const [active, setActive] = useState(0);
  const [view, setView] = useState('clients');
  const awardRef = useRef(null);
  const award = awards[active];

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(awardRef.current, { opacity: 0.25 }, { opacity: 1, duration: 0.35, ease: 'power1.out' });
  }, { dependencies: [active] });

  return (
    <section className="section clients-section" id="clients" aria-labelledby="clients-title">
      <div className="container">
        <div className="section-heading split-heading" data-reveal>
          <h2 id="clients-title">Credibility on stage and on screen.</h2>
          <p>Original awards, festival productions and client relationships from across evam’s work.</p>
        </div>
        <div className="credibility-switch" aria-label="Choose credibility content">
          <button type="button" className={view === 'clients' ? 'active' : ''} aria-pressed={view === 'clients'} onClick={() => setView('clients')}>Clients</button>
          <button type="button" className={view === 'awards' ? 'active' : ''} aria-pressed={view === 'awards'} onClick={() => setView('awards')}>Awards</button>
        </div>
        <div className={`credibility-layout show-${view}`} data-reveal>
          <div className="awards-spotlight">
            <div className="award-main">
              <img ref={awardRef} src={award.image} alt={award.alt} width="960" height="540" loading="lazy" />
            </div>
            <div className="award-info">
              <h3>{award.title}</h3>
              <div className="award-selectors" aria-label="Select award artwork">
                {awards.map((item, index) => (
                  <button key={item.image} type="button" className={active === index ? 'active' : ''} aria-pressed={active === index} aria-label={`Show ${item.title}`} onClick={() => setActive(index)}>
                    <img src={item.image} alt="" width="160" height="90" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="client-grid-new" aria-label="evam clients">
            {clients.map((client) => (
              <div className="client-grid-item" key={client.name}>
                <img src={client.image} alt={client.name} width="180" height="72" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
