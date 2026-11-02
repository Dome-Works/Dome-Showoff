# DOME website

Marketing page for [DOME](https://github.com/Dome-Works/DOME), the self-hosted Docker manager, live at https://dome-works.nl.

Stack: Vite + Vue 3 + TypeScript. Single page, no router, no CSS framework.

## Commands

```
npm install
npm run dev
npm run build
npm run preview
```

## Structure

See `AGENTS.md` (file layout and hard rules), `DESIGN.md` (concept, copy, content facts, assets) and `DESIGN_SYSTEM.md` (tokens, components).

## Deploy

Pushing to main deploys via GitHub Actions.

## Licenses

- Site code: GPL-3.0 (see `LICENSE`).
- Dependencies: MIT / Apache-2.0 / ISC / BSD, plus MPL-2.0 (build-time tooling only, GPL-3.0 compatible).
- Geist fonts: SIL OFL 1.1, bundled via `@fontsource-variable`.

Every dependency, including transitive ones, must be GPL-3.0 compatible. List all licenses in use:

```
npm query '*' --json | node -e "const p=JSON.parse(require('fs').readFileSync(0));const c={};for(const x of p){c[x.license||'UNKNOWN']=(c[x.license||'UNKNOWN']||0)+1}console.log(c)"
```
