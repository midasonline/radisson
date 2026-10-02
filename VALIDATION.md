# Validation — 2 October 2026

## Completed

- `npm run typecheck`: passed.
- `npm run build`: passed, Next.js 15.5.26, static homepage generated.
- Compiled production homepage rendered in Chrome at 1363 × 936.
- A 390 × 844 iframe viewport was used to inspect the mobile hero and open the mobile menu. The temporary QA harness is not in this archive.
- Preloader completes and releases scroll locking.
- Day/night state change, reasons autoplay, cookie dismissal, horizontal location scrolling, amenities tab selection and project accordion expansion verified in browser.
- Production HTTP 200 for the homepage; all checked local assets and initial build resources returned HTTP 200 with nonempty bodies.
- Original property photographs, fonts, floral poster images, SVGs and legal PDFs are bundled locally.
- Source ZIP integrity and required entry files checked after packaging.

## Reference comparison

The supplied 94-second screen recording, live homepage, and publicly served layout and animation definitions informed this revision. At 1363 × 936, the desktop hero, reasons, quote and horizontal-location sequence now have the same measured section boundaries as the reference (quote starts at 5361.5 px; concept at 6372.5 px; panorama at 10645.5 px). This is a measurement of those sections, not a claim that every pixel or animation frame matches.

## Remaining limits

The original transparent flower WebM files returned HTTP 403. Their original AVIF posters are used with scroll parallax, so the flowers do not reproduce the original internal video movement. Mobile received a focused layout/menu check, not an exhaustive device matrix. Fine animation timing, responsive details and some text transitions may still differ from the live Webflow site.

The enquiry dialog is frontend-only and does not submit data. Apartment and Contact pages remain external links to the original site; the deliverable implements the requested homepage only. First-time `npm ci` needs internet. Bundled imagery/fonts do not require third-party network access.

The development preview encountered a script-loading error through the remote preview layer; source chunks parsed successfully and compiled production browser QA passed. The packaged development command is the standard Next.js development server with a small argument wrapper.
