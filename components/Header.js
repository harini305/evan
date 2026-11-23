'use client';

import { useEffect, useRef, useState } from 'react';

const links = [
  ['about', 'About'],
  ['solutions', 'Solutions'],
  ['work', 'Work'],
  ['clients', 'Clients'],
  ['contact', 'Contact'],
];

export default function Header() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [atContact, setAtContact] = useState(false);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const sections = ['home', ...links.map(([id]) => id)].map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    const contact = document.getElementById('contact');
    const contactObserver = new IntersectionObserver(([entry]) => setAtContact(entry.isIntersecting), { threshold: 0.12 });
    if (contact) contactObserver.observe(contact);
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (!window.location.hash) window.scrollTo(0, 0);
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${atContact && !open ? 'is-hidden' : ''}`}>
        <div className="header-inner">
          <a className="header-logo" href="#home" aria-label="evam home" onClick={() => setActive('home')}>
            <img src="/assets/logo.webp" alt="evam" width="116" height="58" />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} aria-current={active === id ? 'location' : undefined} onClick={() => setActive(id)}>{label}</a>
            ))}
          </nav>
          <a className="button button-primary header-enquire" href="#contact">Enquire</a>
          <button className="menu-button" type="button" aria-label="Open navigation menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
          </button>
        </div>
      </header>
      <dialog ref={dialogRef} className="mobile-dialog" aria-label="Navigation menu" onClose={() => setOpen(false)} onClick={(event) => { if (event.target === dialogRef.current) setOpen(false); }}>
        <div className="mobile-drawer">
          <div className="drawer-top">
            <img src="/assets/logo.webp" alt="evam" width="116" height="58" />
            <button className="close-button" type="button" aria-label="Close navigation menu" onClick={() => setOpen(false)}>×</button>
          </div>
          <nav aria-label="Mobile navigation">
            {links.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} aria-current={active === id ? 'location' : undefined} onClick={() => { setActive(id); setOpen(false); }}>{label}</a>
            ))}
          </nav>
          <a className="button button-primary" href="#contact" onClick={() => setOpen(false)}>Start an enquiry</a>
        </div>
      </dialog>
    </>
  );
}
