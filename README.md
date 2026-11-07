# SYSWEAR

> **A cyberpunk terminal that sells analog, imperfect clothes.**
> Raw-edge wool, darned knits, sashiko-mended denim, served through a glitchy Y2K / neo-brutalist storefront.

**🔗 Live demo:** [syswear.vercel.app](https://syswear.vercel.app)

> [!WARNING]
> **This is a portfolio project, not a real shop.** No real products are sold on this site, and nothing you see is real.
> SYSWEAR does **not** sell **any** products. No real transactions will ever happen here.

---

## ✦ Concept

High-tech interface, low-tech garments. The UI behaves like a terminal: clocks tick in milliseconds, transmissions type themselves out, and callouts lock onto stitches. Everything it "catalogues" is handmade and intentionally flawed: unravelled hems, visible darning, mismatched panels.

The style mixes **Neo-Brutalism · Swiss · Editorial · Y2K · Glassmorphism · Cyberpunk**.

## ✦ Features

| Section | What it does |
|---|---|
| **Hero** | 3-look carousel with hover **hotspot callouts** (2× crop thumbnails + elbow lines), a 2.5× **magnifier lens**, click-to-zoom panning, and a rotating typed **Night City quote** transmission |
| **[01] Index** | 18 products in a tilted "broken grid", filter/sort window, cart window, and **colour variants** that swap the photo, name and description (e.g. *Peat ↔ Oat Darned Sweater*) |
| **[02] Anatomy** | Exploded view of a two-layer garment, controlled with a slider |
| **[03] Styling** | *Ying & Yang*: full-bleed dark vs. light looks, with a split ampersand. *"Light is not always light, and dark is not always dark."* |
| **[04] Manifesto** | Highlight sweep that inverts letters as it passes, plus count-up stats |
| **Footer** | Torn-paper card with a **replay-all-animations** button |

Other details:
- The **SYSWear** logo uses `mix-blend-mode: difference`, a rainbow glow and a purple corner dot that turns part of the *W* neon green.
- Windows are draggable Y2K glass panels, the cursor is pixelated, and the scanlines are optional SFX.
- No frameworks, no build step, no dependencies.

## ✦ Tech

- **Vanilla HTML / CSS / JavaScript**, in three files: `index.html`, `styles.css`, `app.js`
- CSS `@property` animations, `clip-path` reveals, `IntersectionObserver` triggers, Web Audio blips
- Hosted on **Vercel** as a static site

## ✦ Run locally

```bash
git clone https://github.com/Tomii816/syswear.git
cd syswear
npx http-server -p 8080 -c-1   # or any static server
# open http://localhost:8080
```

## ✦ Structure

```
syswear/
├── index.html      # markup for all sections
├── styles.css      # all styling + animations
├── app.js          # products, carousel, hotspots, cart, variants, animations
└── assets/
    ├── hero.png, look2.jpg, look3.jpg   # lookbook photos
    ├── p1…p18 (+ v2/v3 variants)        # product photos
    └── fonts/                           # Pixelta, Windraw Aesthetic, Digitag, Seratonin
```

## ✦ Credits & licences

- **Fonts:** Pixelta, Windraw Aesthetic, Digitag (CC BY-SA) and Seratonin (personal-use licence; see `assets/fonts/*`). Fonts belong to their respective authors.
- **Imagery:** product and lookbook photos are AI-generated for this demo. No real garments or models are depicted.
- **Quotes:** the hero quotes come from *Cyberpunk 2077* / *Cyberpunk: Edgerunners* (© CD PROJEKT RED) and are used as a non-commercial fan reference.

---

<p align="center"><sub>syswear© 2026 · portfolio piece · made in Buenos Aires, Argentina</sub></p>
