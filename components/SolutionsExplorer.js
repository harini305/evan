'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { solutionCategories } from '@/lib/content';

export default function SolutionsExplorer() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [offeringIndex, setOfferingIndex] = useState(0);
  const tabRefs = useRef([]);
  const contentRef = useRef(null);
  const category = solutionCategories[categoryIndex];
  const offering = category.offerings[offeringIndex];

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(contentRef.current, { opacity: 0.25, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
  }, { dependencies: [categoryIndex, offeringIndex] });

  const selectCategory = (index) => {
    setCategoryIndex(index);
    setOfferingIndex(0);
  };

  const onTabKeyDown = (event, index) => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % solutionCategories.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + solutionCategories.length) % solutionCategories.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = solutionCategories.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectCategory(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="section solutions-section" id="solutions" aria-labelledby="solutions-title">
      <div className="container">
        <div className="section-heading solutions-heading" data-reveal>
          <h2 id="solutions-title">Choose your kind of engagement.</h2>
          <p>Explore comedy, video, live participation and behavioural learning through one interactive service finder.</p>
        </div>
        <div className="solutions-explorer" data-reveal>
          <div className="category-tabs" role="tablist" aria-label="Solution categories">
            {solutionCategories.map((item, index) => (
              <button
                key={item.id}
                ref={(element) => { tabRefs.current[index] = element; }}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={categoryIndex === index}
                aria-controls="solutions-panel"
                tabIndex={categoryIndex === index ? 0 : -1}
                className={categoryIndex === index ? 'active' : ''}
                onClick={() => selectCategory(index)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >{item.label}</button>
            ))}
          </div>
          <div className="solutions-panel" id="solutions-panel" role="tabpanel" aria-labelledby={`tab-${category.id}`}>
            <div className="offering-list" aria-label={`${category.label} offerings`}>
              {category.offerings.map((item, index) => (
                <button key={item.title} type="button" className={offeringIndex === index ? 'active' : ''} aria-pressed={offeringIndex === index} onClick={() => setOfferingIndex(index)}>{item.title}</button>
              ))}
            </div>
            <div className="offering-content" ref={contentRef}>
              <div className="offering-image">
                <img src={offering.image} alt={offering.alt} width="900" height="620" loading="lazy" />
              </div>
              <div className="offering-copy">
                <h3>{offering.title}</h3>
                <p>{offering.description}</p>
                {(offering.duration || offering.participants) && (
                  <dl className="offering-facts">
                    {offering.duration && <div><dt>Duration</dt><dd>{offering.duration}</dd></div>}
                    {offering.participants && <div><dt>Participants</dt><dd>{offering.participants}</dd></div>}
                  </dl>
                )}
                {category.id === 'training' && (
                  <div className="training-links">
                    <a href="tel:9500028880">9500028880</a>
                    <a href="mailto:mail@trainingsideways.in">mail@trainingsideways.in</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
