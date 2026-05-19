# pabreetzio.com

Personal portfolio and creative hub for Patrick Graham — software developer, maker, and gamer based in Charlotte, NC. Built with a cyberpunk/sci-fi aesthetic: dark mode, glowing accents, and a starship bridge vibe throughout.

**Live site:** [pabreetzio.com](https://pabreetzio.com)

## Tech Stack

| | |
|---|---|
| Framework | [Astro](https://astro.build) 6.x |
| Language | TypeScript (strict) |
| Deployment | Netlify |
| Fonts | Orbitron, Rajdhani, Inter (Google Fonts) |
| Notable deps | [skinview3d](https://github.com/bs-community/skinview3d) — 3D Minecraft skin renderer |

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, featured projects, currently-into feed |
| `/about` | Bio and background |
| `/projects` | Full project showcase (Super Melee, Metasquares, The Wizard's Spell, and more) |
| `/gaming` | Gaming interests and stats |
| `/community` | Local groups, meetups, and community involvement |

## Local Development

```bash
# Requires Node.js >= 22.12.0
npm install
npm run dev      # dev server at http://localhost:4321
npm run build    # production build → dist/
npm run preview  # preview the built site locally
```

## Deployment

Deployed to [Netlify](https://netlify.com) via `git push`. Build config in [`netlify.toml`](netlify.toml):

- **Build command:** `npm run build`
- **Publish dir:** `dist/`

Sitemap auto-generated at `/sitemap-index.xml` via `@astrojs/sitemap`.
