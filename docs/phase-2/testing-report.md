# Testing report

## Final build and accessibility

- `npm run build`: **passed** on the final corrected implementation with Next.js 16.4.6.
- Browser console: no application or hydration errors observed.
- Final axe accessibility scans at 1440×900 and 390×844: **0 violations reported**.
- Unknown route returns HTTP 404; `/about-us` returns HTTP 308 to `/#about`.
- All 45 local WebP derivatives, seven video thumbnails and 18 client logos load successfully.

## Final viewport-fit verification

Every section was measured after its reveal animations settled. The table shows the actual section height, not just its CSS declaration. Every content container's `scrollHeight` is equal to its available height within the final measurements.

| Viewport | Page width | Hero | About | Solutions | Work | Clients | Contact + footer |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1440×900 | 1440 | 900px | 816px | 816px | 816px | 816px | Exactly 900px |
| 1366×768 | 1366 | 768px | 684px | 684px | 684px | 684px | Exactly 768px |
| 768×1024 | 768 | 1024px | 952px | 952px | 952px | 952px | Exactly 1024px |
| 390×844 | 390 | 844px | 772px | 772px | 772px | 772px | Exactly 844px |
| 320×720 | 320 | 720px | 648px | 648px | 648px | 648px | Exactly 720px |

- No horizontal overflow at any tested width.
- About, Solutions, Work and Clients each fill one screen below the fixed header.
- Contact and footer fill the final screen together; the header hides there.
- Section margins remain 32px, except the intentional hero and contact/footer joins.
- Final full-page and per-section screenshots were inspected at all five sizes. Files use the `final-` prefix in `docs/phase-2/screenshots/`.

## Corrections made

- Replaced stacked mobile layouts with compact side-by-side About, Solutions and Contact compositions.
- Added a three-column mobile video grid with flexible row heights.
- Added a mobile Clients/Awards switch so both collections fit one screen without shrinking logos into a long list.
- Added expandable Address, General enquiries and Training & social disclosures with an original team image filling the remaining column space.
- Corrected the contact container's grid/display conflict, disclosure positioning and overlay stacking.
- Replaced decorative image shadow overflow with an in-flow border and adjusted the milestone-year position.
- Tightened short-laptop contact rows so social links never slip behind the footer.
- Adjusted small-mobile offering columns and heading wrapping to avoid broken words.

## Functional verification

| Test | Result |
|---|---|
| Vimeo playback and audio | Actual play, pause, resume, mute and unmute states verified |
| Mobile/reduced-motion media | Poster visible; zero automatic Vimeo iframes; explicit play available |
| About milestones | 2003/2011 update verified copy and original imagery |
| Solutions keyboard tabs | Arrow keys update category and offering content |
| Engagement facts | Durations and participant ranges display in a compact two-column layout |
| Video dialog | Actual YouTube player opens; close/Escape unmounts it and restores focus |
| Mobile video dialog | Fits within 390px viewport and closes correctly |
| Mobile credibility switch | Clients and Awards views swap correctly without changing section height |
| Contact disclosure | Opens verified address above the form without increasing section height or being covered |
| Empty form | Name, email and minimum-length errors display with submit button visible at 320px |
| Valid form | Real mailto generated; local draft saved; Open email app remains visible at 320px |
| Mobile drawer | Opens with scroll lock and closes after anchor selection |
| Anchor offsets | About/Solutions land at 84px header offset; Contact lands at top with header hidden |

## Known limitations

- Tests used headless Chromium, not physical devices or assistive technology.
- One YouTube player was visually verified; all seven IDs/dialog behavior were implemented, but every full video was not watched.
- Vimeo/YouTube depend on remote provider availability and browser autoplay policy.
- Enquiry preparation requires a configured email client; there is no backend delivery.
- Phone, email and social destinations were preserved but not contacted.
- WhatsApp remains intentionally unavailable until the correct number is confirmed.
