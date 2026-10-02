# Radisson Blu — local homepage

Next.js App Router · React · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis.

## Windows: easiest start

1. Install Node.js 22 or newer.
2. Extract this ZIP completely (do not run inside the ZIP viewer).
3. Open `ERA-Residence-NextJS-Tailwind` and double-click `START-WINDOWS.cmd`.
4. Wait for `Ready`, then open http://localhost:3000.
5. Keep the terminal open. Press Ctrl+C to stop.

The first start downloads dependencies and requires internet. Images, fonts, SVGs and legal PDFs are bundled locally. No environment variables, database or API keys are required.

## Terminal / VS Code

Open a terminal in the folder containing `package.json`:

```sh
npm ci
npm run dev
```

Mac/Linux shortcut: `sh START-MAC-LINUX.sh`.

This is a Next.js application. VS Code's plain HTML Live Server and opening `page.tsx` directly will not run it.

## Production mode

```sh
npm run build
npm start
```

If port 3000 is occupied: `npm run dev -- --port 3001`, then open http://localhost:3001.

## Homepage implementation

1. Local fonts, responsive header, rotating logo, scroll indicator, cookie choice, animated menu and enquiry dialog.
2. Preloader, day/night hero and scroll-controlled image translation followed by zoom.
3. Curved reasons section and gallery; community quote and architectural image.
4. Pinned desktop concept → New Golden Mile → coastline sequence, with the map in the horizontal track. Mobile sections stack vertically.
5. Coastline reveal, cloud parallax and draggable location panorama.
6. Residences carousel: portrait image between specifications and description, plus range statement.
7. Amenities tabs with image masks, text transitions and scroll zoom.
8. Lifestyle section with plum image frame, original property imagery and interiors gallery.
9. Architecture: staggered rectangular openings align, expand and reveal the full architectural scene.
10. Project accordions, sea-view CTA and footer image contraction.

## Changes from the supplied archive

The existing section architecture and original assets were retained. This revision adds the original arch-mask silhouette and timed preloader reveal; corrects hero lettering, brightness and CTA placement; matches the measured desktop reasons/quote/location section heights; places the quote over its photograph; rebuilds the location grid; corrects lifestyle overlap and image proportions; adds staggered character reveals and visible-only carousel autoplay; and refines cookie card, architecture and footer spacing. Start scripts and the deterministic package-lock are included.

## Scope and fidelity

This is a homepage recreation based on the supplied 94-second recording and the reference homepage inspected on 1–2 October 2026. It is not the original Webflow source and is not certified pixel-identical at every screen size.

The original transparent flower WebM files returned HTTP 403. Their original AVIF poster assets are bundled and use scroll parallax; their internal video motion is therefore not reproduced. No stock or AI property images were substituted.

The enquiry dialog is frontend-only and explicitly does not send enquiries. No backend was requested. Apartment selection and Contact links retain their original external destinations, because those pages are outside the requested homepage scope. Local legal PDF links work without internet.

## Validation

See `VALIDATION.md` for this revision's checks and limitations. Run `npm run typecheck` and `npm run build` for local verification.

## Files

- `src/app/page.tsx`: short section composition
- `src/components/home`: independent homepage sections
- `src/components/layout`: header, overlays, preloader, scrolling
- `src/components/ui`: shared typography, logos and controls
- `src/data/home.ts`: content and original local asset paths
- `src/lib/animations.ts`: shared GSAP setup/easing
- `public/images`, `public/fonts`, `public/documents`: bundled assets

Original design and assets: https://www.era-residence.com/.
