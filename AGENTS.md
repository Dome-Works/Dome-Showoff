# AGENTS.md

## What this repo is
Single-page Vue 3 + TypeScript marketing site for **DOME** (github.com/Dome-Works/DOME), a self-hosted Docker manager. Live at https://dome-works.nl via GitHub Pages. No router, no state library, no CSS framework.

Read `DESIGN.md` (concept, copy, Content facts, Asset map) and `DESIGN_SYSTEM.md` (tokens, components) before any work.

## Commands
```
npm install
npm run dev
npm run build
npm run preview
```

## File structure
- `src/styles/tokens.css`: all design tokens. `src/styles/base.css`: reset, typography, `.container` / `.eyebrow` / `.glow`.
- `src/site.ts`: `VERSION`, `REPO_URL`.
- `src/directives/reveal.ts`: `v-reveal`.
- `src/components/ui/{BrowserFrame,TerminalCard}.vue`
- `src/components/NavBar.vue`, `src/components/sections/*.vue`
- `src/App.vue`, `src/main.ts`, `src/env.d.ts`
- `public/CNAME`, `public/robots.txt`, `public/sitemap.xml` and `public/media/*` (all images, video, logo, favicons, og image). Nothing else in `public/`.
- `index.html` (title, OG/Twitter tags, favicon, theme-color `#0b0f14`), `vite.config.ts` (`base: '/'`)
- `.github/workflows/deploy.yml`
- Docs: `DESIGN.md`, `DESIGN_SYSTEM.md`, `AGENTS.md`, `CLAUDE.md`, `README.md`

## Hard rules (permanent)
1. **Tokens only.** Components use `var(--…)` from `src/styles/tokens.css`; no raw hex/rgb.
2. **Real screenshots only.** Product images are real DOME captures; no mockups.
3. **Content facts only.** Copy comes from "Content facts" in `DESIGN.md`; never invent features or contradict Limits.
4. **Reduced motion required.** Every animation is off under `prefers-reduced-motion: reduce`.
5. **Assets live in `public/media/`**, referenced as `/media/…`.
6. No new dependencies beyond: vue, vite, @vitejs/plugin-vue, typescript, vue-tsc, @vue/tsconfig, @fontsource-variable/geist, @fontsource-variable/geist-mono. Keep code lean.
   Any new npm dependency (incl. transitive) must have an OSI-approved license compatible with GPL-3.0 (MIT, ISC, BSD, Apache-2.0, OFL for fonts, …). Check with the `npm query '*' --json | node -e "…"` one-liner in README ("Licenses") before adding.
7. **Small commits per task**: message `T<id>: <summary>` (T<id> is the plan task id), ending with the trailer `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Stage explicit paths only (never `git add -A` / `git add .`). Run `git add <paths>` and `git commit` as separate calls.
8. **Never push**, open PRs, or touch the remote.
9. **On a permission denial, stop.** Don't retry or work around it; report the blocked command.
10. Don't modify or delete pre-existing root files outside your task's ownership.

## Bump the DOME version
Edit `VERSION` in `src/site.ts` (the one place). Rebuild.

## Deploy
- Push to `main` triggers `.github/workflows/deploy.yml`: checkout → setup-node 22 + npm cache → `npm ci` → `npm run build` → configure-pages → upload-pages-artifact (`dist`) → deploy-pages.
