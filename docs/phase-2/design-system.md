# Design system

## Direction

**Stage and spotlight:** a theatrical, editorial interpretation of evam's performance-arts business. Deep plum frames, the verified purple, angular media panels, and restrained lime accents drawn from the illustrated logo create the signature. Each section has a different composition rather than repeating a card formula.

## Fonts

Exactly two families, as mandated by the brief:

1. League Spartan 400, self-hosted from the audit, for display headings and major brand statements.
2. Helvetica/Arial/system sans-serif for body and all interface elements.

The original raster logo is retained unchanged. Its exact lettering font could not be verified, so no false claim is made that League Spartan is the logo font.

## Palette

- `--purple: #871c97` — primary brand and interactive emphasis.
- `--purple-hover: #6c1479` — verified audit hover value (used instead of the prompt's shortened `#6c9`).
- `--purple-active: #540e5e` — active/deep brand state.
- `--plum: #211522` — deep stage background derived from the brand family.
- `--ink: #1b1b1b` — primary text.
- `--muted: #595959` — secondary text.
- `--paper: #ffffff` — primary surface.
- `--tint: #f6f0f7` — harmonious light section surface.
- `--drawer: #f6f6f6` — mobile navigation surface.
- `--border: #efefef` — borders and dividers.
- `--lime: #a4c639` — small accent only, estimated from the original logo.
- `--footer: #eeeeee` — source footer token retained in the token set; final footer uses deep purple with white text for contrast.

## Typography

- H1: `clamp(2.6rem, 6vw, 5.75rem)`, League Spartan, balanced lines.
- H2: `clamp(2rem, 3.7vw, 3.75rem)`, League Spartan.
- H3: `clamp(1.35rem, 2vw, 1.85rem)`, League Spartan.
- Body: 16–18px with 1.55–1.7 line height.
- Navigation: 15–17px.
- Supporting text: 14px minimum, never tiny decorative micro-copy.
- No italics and no third font.

## Layout tokens

- `--section-gap: 32px` between sections; the 100svh hero has no gap below it.
- `--header-h: 84px` desktop, 72px mobile.
- `--container: 1280px` with fluid gutters from 16px to 48px.
- Full-width section surfaces with internal content containers.
- Every anchor panel fits exactly `calc(100svh - var(--header-h))` on desktop, tablet and mobile; internal grids and media flex to use the available space without clipping.
- Contact + compact footer fit one viewport on every tested size. Desktop footer is 96px; compact mobile footers are 96–110px.
- Near-square corners on media; pills only for actions/facts. Angular clipping is used selectively, not as decoration on every block.

## Interaction states

- Visible 2px focus outline with offset on every interactive element.
- Touch targets at least 44px.
- Buttons use the primary purple, hover `#6c1479`, active `#540e5e`.
- Motion uses transform/opacity, one signature ease, and GSAP matchMedia for reduced motion.
- Breakpoints: 1100px, 900px, 768px, 520px, and a 320px small-mobile QA target.
