# Asset usage

All visual assets originate in `docs/source-audit/original-assets/`. Originals remain untouched. WebP derivatives are generated locally under `public/assets/` with sensible maximum dimensions and compression; the site uses `images.unoptimized` but does not serve multi-megapixel originals unnecessarily.

## Global media

- `logo.webp` ← `Evam LOGO - PNG.png`: header, footer and favicon source.
- `home-vimeo-poster.webp` ← `home-vimeo-poster.jpg`: hero loading/failure fallback and social image.
- `LeagueSpartan.woff2`: copied unchanged for self-hosting through `next/font/local`.

## About

- `team-group.webp` ← `evam Group Photo.jpeg`: 2003 milestone/company story.
- `founders.webp` ← `KK & Shoo.jpg`: 2011 milestone/founders. Kept at native 384px width to avoid upscaling.

## Solutions

- Comedy: `corporate-shows.webp`, `tour-management.webp`, `workshop.webp`, `comedy-writing.webp`.
- Video: seven audit thumbnails are used across video service offerings and the Selected Work gallery; filenames retain the verified YouTube IDs.
- Engagement: `human-orchestra.webp` ← `Human Orchestra 2.jpg`; `danceathon.webp` ← `Human Orchestra.jpg`; `mega-jigsaw.webp`; `mobile-light-show.webp`.
- Behavioural Training: `training-sideways.webp` ← `Training Sideways Pic.jpg`.

## Selected Work

`video-e9CmlzwDEMA.webp`, `video-cDgLQN2bdtw.webp`, `video-6hRm7SkQr5U.webp`, `video-dvrHIV9NjlM.webp`, `video-e5ylOcxMJqE.webp`, `video-m4aLfhXAncM.webp`, and `video-uClmWK1DgZk.webp` are poster facades only. Actual playback uses the verified remote YouTube embed IDs. Alex in Wonderland uses the available 480×360 original thumbnail without artificial upscaling claims.

## Clients and awards

All 18 client marks are converted to `public/assets/clients/*.webp` and displayed with preserved aspect ratios and descriptive alt text.

Seven award images are converted to `public/assets/awards/*.webp`: Directors Fellowship, British Council YPAE, The 39 Steps META Awards, Tata NEN Top 30, Ali J Edinburgh Fringe, NHRD-Titan Sideways Training, and Prime Video specials. They are presented as historical credibility artwork, not upcoming events or newly verified claims.

## Delivery

- Logo and hero poster are high priority; below-fold images lazy-load.
- Video iframes mount only after user selection.
- Client/award images are constrained to their rendered use; source proportions are never distorted.
- No stock, generated, unrelated, or replacement imagery is used.
