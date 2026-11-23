# Interaction plan

The site uses a small number of meaningful interactions rather than motion on every element. All controls work with touch and keyboard, and important content remains available without animation.

| Component | User action | UI response | Desktop | Mobile | Keyboard | Motion |
|---|---|---|---|---|---|---|
| Header anchors | Select About, Solutions, Work, Clients, Contact or logo | Native smooth scroll to the section; scroll-spy updates active link | Fixed compact header, visible desktop links | Links inside modal drawer; drawer closes after selection | Standard links and visible focus | Header gains a subtle solid shadow after scroll; hides at contact/footer |
| Mobile drawer | Menu, close, Escape or link selection | Opens/closes a native modal navigation drawer | Not shown | Right-side sheet with backdrop and body scroll lock | Native dialog focus handling and Escape | Short slide/fade, disabled for reduced motion |
| Vimeo hero | Autoplay where supported; Play/Pause; Mute/Unmute; explicit load on mobile | Real Vimeo Player API controls change playback and audio | Loads muted looping showreel when motion/data preferences allow | Poster first; explicit play loads the player | Named native buttons | Poster/video settle and hero copy enters once |
| About milestones | Select 2003 or 2011 | Actual React state updates milestone copy and active original image | Split story and large visual | Stacked controls, copy and visual | Native buttons with `aria-pressed` | Short crossfade/rise on change |
| Solutions categories | Select a category or use arrow keys | React state resets and displays that category's offerings | Vertical category rail and two-level offering explorer | Horizontal scrollable category tabs and stacked content | Roving tab index, arrows, Home/End | Content transition with no hidden initial state |
| Offering selection | Select an offering | Updates description, image, activity facts and relevant contacts | Offering list beside shared media frame | Compact offering buttons above content | Native buttons with `aria-pressed` | Image/text fade and small rise |
| Video gallery | Select a thumbnail | Opens a modal with only the selected YouTube iframe and starts playback | Centered 16:9 dialog | Viewport-width dialog | Native dialog, Escape, close button, return focus | Dialog scale/fade; iframe unmounts on close |
| Awards | Select an award thumbnail | React state changes the large award artwork and caption | Selected artwork beside client grid | Artwork above horizontally scrollable selectors | Native buttons with `aria-pressed` | Opacity transition |
| Client logos | Hover or inspect grid | Logos gain full color and slight lift | Six-column grid with awards beside it | Three-column grid with a Clients/Awards switch | Alt text supplies names; no fake links | Subtle CSS only |
| Mobile credibility switch | Select Clients or Awards | React state switches between all 18 logos and the seven-image award explorer | Both remain visible side by side | One view fills the section at a time | Native buttons with `aria-pressed` | Award image crossfade |
| Contact disclosures | Select Address, General enquiries or Training & social | Expands verified contact details without increasing section height | Details open by default beside the form | Compact rows beside the form and original team image; content overlays the form | Native `details`/`summary` controls | Content remains inside the section |
| Contact links | Select email, phone, directions or social | Opens the verified external destination or mail/tel handler | Compact links | Large touch targets | Standard links | Focus/hover only |
| Enquiry form | Blur, edit, submit valid/invalid fields | Field validation; valid input creates a mailto draft and stores it locally | Form beside contact details | Stacked full-width fields | Labels, error text, status live region | Validation/status transition |
| Prepared enquiry | Select Open email app after valid submission | Opens prefilled email to `mail@evam.in`; nothing is sent by the website | Same | Same | Standard link | No fake success message |

## Motion conventions

- GSAP and ScrollTrigger through `@gsap/react` are used for hero entry and one-shot section-group reveals.
- State changes use short transform/opacity transitions; there is no scroll hijacking, custom cursor, marquee, tilt, magnetic control, or continuous decorative animation.
- Reduced-motion users receive immediate visible content and native instant scrolling.
- Below-fold content is server-rendered visible; a timed GSAP failsafe clears any pending reveal styles.
