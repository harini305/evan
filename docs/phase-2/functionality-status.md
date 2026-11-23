# Functionality status

| Component | Status | Actual behavior |
|---|---|---|
| Single-page navigation | Working | About, Solutions, Work, Clients, Contact, logo and footer links scroll to real homepage anchors; active section updates |
| Desktop anchor offsets | Working | About/Solutions land at the 84px header offset; Contact lands at the top with the header hidden |
| Mobile navigation | Working | Native modal drawer opens, locks body scroll, closes after selection and supports Escape |
| Header transition | Working | Compact shadow after scrolling; hides at Contact/footer without a border line |
| Vimeo showreel | Working | Actual Vimeo player autoplays muted on supported desktop preferences; poster-first on mobile |
| Hero play/pause | Working | Vimeo Player API changes real playback and updates the accessible status |
| Hero mute/unmute | Working | Vimeo Player API changes actual audio state |
| Video loading/failure | Working | Poster remains beneath the player; failed playback offers a reload action rather than a fake control |
| About milestones | Working | 2003/2011 buttons update verified copy and original imagery using React state |
| Solutions categories | Working | Four real tab states update displayed offerings; arrow keys, Home and End supported |
| Offering selection | Working | Each button updates its description, image, activity facts and training contact links |
| Activity specifications | Working | Human Orchestra 45 min/100–5000; DANCE-athon 45 min/150–1000; Mega JIGSAW 60 min/150–500; MOBILE Light Show duration not specified/100–500 |
| Selected Work | Working | Seven thumbnail buttons open actual YouTube embeds in a native dialog; only the selected iframe mounts |
| Gallery close | Working | Close button, backdrop and Escape close the dialog, unmount the player and return focus to the thumbnail |
| Awards | Working | Seven real award artworks switch through React state with descriptive alt text |
| Clients | Working | All 18 original logos appear in a compact responsive grid; no long mobile single-column list |
| Contact links | Working destinations | Verified tel, mailto, social and full-address Google directions URLs are present; account reachability was not independently tested |
| WhatsApp | Pending | No action is shown because the correct number is unresolved |
| Google Maps embed | Intentionally omitted | The broken source integration is not reproduced; the verified directions link is used |
| Enquiry validation | Working | Required name, valid email and minimum-length question produce field errors, focus management and live feedback |
| Enquiry preparation | Working frontend-only | Valid input creates a real mailto draft to `mail@evam.in` and stores the draft in localStorage |
| Enquiry delivery | No backend | The site never claims to send information. Open email app requires the visitor's configured mail client |
| Reduced motion | Working | Reduced-motion users see immediate content and no automatic Vimeo iframe load |
| Custom 404 | Working | Unknown routes return HTTP 404 with a home link |
| Legacy routes | Working | Original page URLs issue permanent redirects to homepage anchors; `/about-us` verified as HTTP 308 to `/#about` |

## Third-party boundaries

Vimeo and YouTube availability, provider cookies, playback restrictions and future video removal are outside the application's control. Social profiles, telephone numbers and mailboxes were preserved from the audit but not independently contacted.
