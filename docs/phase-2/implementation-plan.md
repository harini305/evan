# Implementation plan

## Foundation

- Next.js App Router with JavaScript and React; Server Components by default.
- Client Components only for navigation, media controls, React-state explorers, dialogs, and form behavior.
- Plain global CSS with centralized tokens; no Tailwind, TypeScript, UI kit, Framer Motion, Three.js, or extra animation library.
- GSAP + ScrollTrigger via `@gsap/react` `useGSAP`.
- `next.config.mjs` contains `images: { unoptimized: true }` and legacy-source redirects to homepage anchors.
- Self-host the audit's League Spartan WOFF2 through `next/font/local`; Helvetica/Arial remains the system UI stack.

## Build order

1. Convert the 45 audit images into appropriately sized WebP derivatives under `public/assets/` without altering originals.
2. Create content/data modules for services, milestones, videos, awards, clients, and contact details.
3. Implement shared layout, metadata, header, footer, and the 100svh hero.
4. Implement the About milestone explorer and two-level Solutions explorer with actual React state.
5. Implement lazy YouTube dialogs, interactive award selection, and the compact 18-logo grid.
6. Implement contact links and modular enquiry preparation with validation, local draft persistence, and a real mailto action.
7. Add custom not-found page, legacy redirects, sitemap, and robots handling.
8. Run production build, browser interaction tests, keyboard checks, and four-width visual QA.
9. Fix observed issues, document functionality and limitations, and provide localhost only. No push or deployment.

## Enquiry boundary

No backend or API route will be created. Valid form input is stored only in the visitor's browser as a draft and used to prepare a real `mailto:` URL. The interface explicitly says the website has not sent anything. A future owner-approved backend can replace the small preparation module without changing field validation or presentation.
