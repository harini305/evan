# Testing report

## Build and technical checks

- `npm run build`: **passed** on the final implementation with Next.js 16.4.6; static homepage, not-found, icon, robots and sitemap generated.
- Browser console: no application errors or hydration errors observed.
- Automated axe accessibility scans at 1440×900 and 390×844: **0 violations reported**. This does not replace manual screen-reader testing.
- Unknown route: HTTP 404 with `Page Not Found`.
- `/about-us`: HTTP 308 to `/#about`.
- All 45 image derivatives load from local WebP files; after scrolling, all seven video thumbnails and all 18 client logos reported loaded.

## Functional browser tests

| Test | Result |
|---|---|
| Vimeo initial playback | Playing, muted on supported desktop |
| Pause | Player status changed to paused; control changed to Play showreel |
| Resume | Player status returned to playing |
| Unmute/mute | Actual audio state and control/status changed correctly |
| Mobile initial media | Zero Vimeo iframes; original poster visible; explicit play loads the player |
| Reduced motion | Media query matched; zero Vimeo iframes; H1 opacity 1 |
| About 2011 | Heading changed to Sideways Training begins; founders image loaded; correct pressed state |
| Keyboard category selection | ArrowRight moved Comedy Solutions → Video Solutions and updated offering content |
| Engagement offering | Mega JIGSAW displayed 60 minutes and 150–500 people with the correct image |
| Training offering | Methods that engage displayed with verified phone/email links |
| Video dialog | Correct YouTube ID, title and player loaded; visible player UI inspected |
| Video close | Dialog closed, iframe count returned to zero, focus returned to Play Brands Advertisements |
| Mobile video dialog | Fit within 390px viewport (left 8/right 382); Escape closed it |
| Award selection | Promising HR Start-up Award and NHRD-Titan artwork displayed |
| Empty form | Three validation errors shown and Name received focus |
| Valid form | Real mailto generated to `mail@evam.in`; draft stored locally; explicit “Nothing has been sent” feedback shown |
| Mobile drawer | Opened with body scroll locked; Solutions selection closed it and navigated to `#solutions` |
| Desktop About anchor | Section top 84px, matching header; active state About |
| Desktop Solutions anchor | Section top approximately 84px; active state Solutions |
| Desktop Contact anchor | Section top approximately 0px; header hidden |

## Responsive and visual QA

Actual full-page and per-section screenshots were captured and inspected at all required widths. Contact sheets are in `docs/phase-2/screenshots/`.

| Viewport | Horizontal overflow | Hero height | Contact + footer | Media verification |
|---|---|---:|---:|---|
| 1440×900 | None; page width 1440 | 900px | Exactly 900px | 7 video thumbnails, 18 client logos loaded |
| 768×1024 | None; page width 768 | 1024px | Exactly 1024px | All loaded; each anchor section fits 952px below header |
| 390×844 | Fixed during QA; final page width 390 | 844px | Natural content flow, no clipping | All loaded; dialog fits viewport |
| 320×720 | Fixed during QA; final page width 320 | 720px | Natural content flow, no clipping | All loaded; compact grids remain usable |

The mobile overflow was traced to the award selector row and fixed with minimum-width constraints. Tablet stacking breakpoints were adjusted so About, Solutions, Work, Clients and Contact fit at 768px.

## Measured contact/footer fit

After short-laptop adjustments, script measurements showed **0px difference between contact + footer and viewport height** at:

- 1920×1080
- 1536×864
- 1440×900
- 1366×768
- 1280×720
- 1024×768
- 768×1024

Desktop footer is 96px high. Mobile uses natural section height rather than forcing overlapping or clipped content.

## Visual issues corrected

- Removed mobile horizontal overflow from the award showcase.
- Kept two-column/service layouts at 768px instead of stacking too early.
- Tightened contact spacing for screens below 800px tall.
- Removed duplicate scroll padding/margin that had created an extra 84px anchor offset.
- Confirmed final screenshots at all four widths and a separate 1366×768 contact/footer capture.

## Known limitations

- Automated tests used headless Chromium, not physical phones or assistive technology.
- One actual YouTube player was visually verified; all seven IDs/dialog behavior were implemented, but every full video was not watched end to end.
- Vimeo/YouTube behavior depends on remote providers and browser autoplay policy.
- Mailto requires a configured email application. No backend delivery exists.
- Phone, email and social destinations were preserved but not contacted.
- No real-device screen-reader or touch-gesture test was performed.
