# Rohullah Rezai Portfolio

An editorial, dark portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Three.js / React Three Fiber, GSAP ScrollTrigger, Framer Motion, and Lucide.

## Run locally

```bash
npm install
npm run dev
```

Use Node.js 20.9 or newer. `npm run lint`, `npm run typecheck`, and `npm run build` are the project checks.

## Before deployment

1. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the deployed HTTPS origin. This enables the canonical URL, sitemap, robots host, and absolute Open Graph URL.
2. In `src/data/portfolio.ts`, add the real project URLs, LinkedIn and X profiles, WhatsApp destination, and Telegram bot URLs where their `null` values are stored. The prompt did not include those destinations, so no guessed links are published.
3. Add project preview images under `public/projects/` and map their paths in `projectAssets` in `src/data/portfolio.ts`. Until then, the project panels are abstract placeholders and explicitly identify the missing previews.

The portrait from the supplied JPEG is also available as `public/images/rohullah-portrait.webp` for the hero. The original certificate is preserved byte-for-byte at `public/images/neurofive-certificate.jpg` and displayed directly in the certificate preview and lightbox.

The hero and technology Three.js scenes load on capable desktop devices only. They stop rendering while offscreen or while the browser tab is hidden. Reduced-motion and small-screen users get the CSS / HTML composition without a WebGL scene.
