# LYSH Living
Run: `npm install`, then `npm run dev` (develop) or `npm run build` (output in `dist/`, upload its contents to your host).
- Images: nothing is loaded from the internet at runtime. `npm run dev` / `npm run build` first run `scripts/fetch-images.mjs`, which saves every photo (4 sizes each) into `public/images/`. Needs internet only once; later runs skip files that exist. Run it by hand with `npm run images`. To use your own photos, save them with the same file names (e.g. `wharf-1600.jpg`) or edit `scripts/images.json`. Browsers pick the right size automatically (`srcset`), so phones download small files.
- Fonts (Cormorant Garamond, Jost) are bundled via `@fontsource`, not Google Fonts.
- Content: `src/data.js` (properties, links, approach items). Sample properties are marked `sample: true`.
- Motion: everything lives in `src/motion/animations.js` (GSAP + ScrollTrigger + SplitText, Lenis smooth scroll). Components only add data-attributes:
  `data-split` (chars | words | lines), `data-reveal` (up | left | right | fade), `data-stagger`, `data-line`, `data-mask`, `data-speed`, `data-drift`, `data-tilt`, `data-magnetic`.
- Desktop (1024px+): the hero pins and the next section slides over it; "Our Stays" pins and scrolls sideways. Below 1024px these become simple vertical reveals.
- Tilt and magnetic effects run only on mouse devices. Everything is off when the visitor prefers reduced motion.
- Replace the text wordmark in `Logo` (`src/components/ui.jsx`) with the real logo file; replace stock photos in `public/images/`; connect the TODO in `src/components/Contact.jsx`.
