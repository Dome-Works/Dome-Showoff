# DESIGN.md: dome-works.nl

Single-page Vue marketing site for **DOME** (github.com/Dome-Works/DOME, v0.6.1 preview, GPL-3.0), a self-hosted Docker manager. Audience: technical Docker and homelab users. Token and component contract lives in `DESIGN_SYSTEM.md`.

## Concept: "Control room under glass"
The logo is a glass dome over three servers wired to one point. The site borrows that: dark ink background, blueprint dot-grid, and a blue glow that "domes" over each key visual. It should feel like looking at infrastructure, not at a SaaS landing page.

## Design direction (8 points)
| # | Decision | Rationale |
|---|---|---|
| 1 | **Palette = the app's own tokens** (`#0b0f14` bg, `#0f1419` bg-2, `#161b22` panel, `#2a3340` border, `#5a9fff` accent, `#3dd68c` running, `#f85149` stopped, `#e6edf3` text, `#8b9bb0` muted) | Screenshots blend into the page. Green = works, red = pain. No new brand colors. |
| 2 | **Type:** Geist (display + body, tight tracking on headlines); Geist Mono for anything Docker-ish (commands, container names, eyebrows like `// 02 · how it works`). Self-hosted via `@fontsource-variable/geist` and `@fontsource-variable/geist-mono` | Matches the app's sans. Mono eyebrows are the techy signal Docker users spot. No Google Fonts call, so GDPR-clean. |
| 3 | **Flash, but cheap:** radial blue glow behind media, animated border beam on the hero video, flowing `stroke-dashoffset` edges in the architecture SVG, scroll-reveal rise | All CSS plus one IntersectionObserver directive. No GSAP or three.js. All off under `prefers-reduced-motion`. |
| 4 | **The flex is a contrast, not a claim.** Before: three terminal cards (`ssh homelab` / `ssh nas` / `ssh edge-pi` with walls of `docker ps`; fictional but plausible output, using container names from the screenshots). After: the diagram screenshot. Headline: *"Other managers give you a table. DOME gives you a map."* | Show the pain, then the map. |
| 5 | **Real UI only.** Every product image is a real DOME capture with fictional homelab data. Only embellishment: an HTML toast "Started uptime-kuma." that reproduces the app's real toast text over the exited-state screenshot. | Honesty; no mockups. |
| 6 | **Copy voice:** short, imperative, concrete nouns (`docker ps`, Compose, volumes, GHCR). No "revolutionary" or "seamless". Preview label stays honest. | Technical readers distrust hype. |
| 7 | **Layout:** single column, max ~1200px, generous vertical rhythm, one idea per section. Mobile: media full-bleed, terminal trio stacks, nav collapses to logo + GitHub. | Simple and scannable. |
| 8 | **Hero framing:** the video is already a composed piece with its own stage. It gets a plain glowing rounded frame, not fake browser chrome. `BrowserFrame` is reserved for raw UI screenshots. Poster is a mid-video still, not `brag.jpg` (which repeats the H1 tagline). | Avoid double chrome and repeated copy. |

## Page structure (one component per section)
| # | Component (`src/components/…`) | Anchor | Content |
|---|---|---|---|
| 1 | `NavBar.vue` | n/a | Sticky blur; logo + "DOME"; anchors Diagram · Features · Architecture · Install; GitHub button. |
| 2 | `sections/HeroSection.vue` | n/a | `v{VERSION} preview` pill (from `src/site.ts`, not hard-coded). H1 is the tagline, with "under one roof." in accent. Sub is the share-copy hook. CTAs: "Get started" (→ `#install`) and "Star on GitHub". Media `media/brag.mp4` (autoplay muted loop playsinline) with poster, in a glow frame with border beam, plus mute/unmute button. The video has a soundtrack. |
| 3 | `sections/ContrastSection.vue` | `#diagram` | 3 `TerminalCard`s vs `media/diagram-overview.jpg` in `BrowserFrame`. Three rows: "Rows of containers and visual clutter → Visual diagram with grouped nodes" · "Multiple SSH sessions for multiple hosts → All hosts in 1 app, divided by tabs" · "Manage through docker-commands → Easy-to-use buttons & live feedback". |
| 4 | `sections/ShowcaseSection.vue` | n/a | Three alternating rows (below). |
| 5 | `sections/FeatureGrid.vue` | `#features` | Bento of 8 cards from the Content facts. Inline SVG icons, no icon library. |
| 6 | `sections/ArchitectureSection.vue` | `#architecture` | Inline SVG: Browser → Client → Server → Socket ×3 → Docker Engine, with animated edges. Caption: "DOME never exposes your Docker daemon directly. The Server talks to your connected hosts through Sockets, so only the operations DOME needs are exposed through the DOME API, not the raw Docker API." |
| 7 | `sections/InstallSection.vue` | `#install` | Deliberately simple (detailed steps live in the repo README). Centered: eyebrow "// 07 · get started", H2 "Up in 60 seconds.", one muted line ("Self-hosted right in Docker, the place you know best. One main host & one Socket per additional Docker environment, and never look back to the Docker CLI."), one primary button "Get started on GitHub" → `{REPO_URL}#readme`, then the amber preview note: "Preview: no authentication yet. Run DOME on a trusted private network." |

### Showcase rows (section 4)
- "Every host. One registry." → `media/sockets.jpg`, hotspot ring on the three green status dots.
- "Spot it. Start it." → `media/exited-panel.jpg`, hotspot ring on ▶ at **left 74.9%, top 44.7%**. When the row enters view, an HTML toast "Started uptime-kuma." slides in at bottom-right with a green check.
- "Write Compose. Deploy." → `media/compose-editor.jpg`, hotspot ring on the Save button at **left 85.5%, top 83.0%**.

## Copy voice
**Do**
- Short, imperative sentences. Concrete nouns: `docker ps`, Compose, volumes, GHCR, Socket.
- Mono for commands, container names, eyebrows.
- No em dashes in site copy.
- Keep the "v{VERSION} preview" pill and the trusted-network note.
- Contrast the *experience* (list vs map).

**Don't**
- No "revolutionary", "seamless", "powerful", "next-gen", "effortless".
- No competitor names.
- No invented features, metrics, testimonials, or star counts.
- No claims that contradict Limits (see Content facts).
- No fake browser chrome around the hero video.

## Content facts (from DOME README. Agents must not invent beyond these.)
- Tagline: "Your entire Docker infrastructure, under one roof." Name: "Docker Orchestration & Management Engine".
- Hook: "Stop SSH-ing to every device separately. Stop cluttering your desktop with multiple terminals to manage your Docker infrastructure. DOME shows every container on every host in one browser-app, grouped and manageable right from there."
- Features: multi-host (one Socket agent per Docker host); diagram tab per host; containers grouped by Compose stack; container state, image and mounted-volume size; volume name, mount path, size and RO/RW; update badge when a newer Docker Hub or public GHCR tag exists; start/stop/delete from the details panel; create, edit and deploy Compose stacks (Monaco editor) and managed vs read-only stacks; Socket version mismatch warnings; SQLite with auto migrations; `linux/amd64` + `linux/arm64` images; opt-in anonymous telemetry.
- Install commands are reference facts, README only, not shown on the site. Install (published), verbatim: `docker compose pull` then `docker compose up -d`. Then open `http://localhost:5200/sockets` and register a Socket named `Local` at `http://socket:8080`.
- From source (README only), verbatim: `git clone https://github.com/Dome-Works/DOME.git` / `cd DOME` / `docker compose -f dev.docker-compose.yml up --build -d`.
- Stack: .NET 10 + FastEndpoints + EF Core/SQLite server, React 19 + React Flow client, Socket agent on the Docker Unix socket.
- Limits (never contradict them): no auth; no TLS between server and socket; no network or dependency edges yet; update checks cover Docker Hub + public GHCR only.

## Asset map
**All used assets live in `public/media/`** (served at `/media/…`; includes favicons and og image). After outputs are verified, root originals and everything unused are deleted: `brag-output.zip`, `brag.jpg`, `ChatGPT Image Sep 3, 2026, 10_55_47 AM(2).png` (and `brag.mp4`, which is moved). The repo root then holds only code, docs and LICENSE.

Zip is extracted to `$Z = <scratchpad>/zip/brag-output`.

| Output (`public/…`) | Source | Processing |
|---|---|---|
| `media/brag.mp4` | repo root `brag.mp4` | Move (it's untracked, so a plain `mv`) |
| `media/hero-poster.jpg` | `$Z/work/stills/t6.0.jpg` (verify that it shows the diagram; otherwise pick another still from t5–t9) | jpg q80 |
| `media/diagram-overview.jpg` | `$Z/work/shots/diag-homelab.png` (3840×2160, clean homelab diagram) | crop to the node strip (2700×760 at +950+864), resize to 1600×450, jpg q85 |
| `media/sockets.jpg` | `$Z/work/explore-sockets.png` (1600×900; 3 hosts, green dots at x≈294px, y≈214/263/312 → **left 18.4%, top 23.8/29.2/34.7%**) | jpg q85 |
| `media/exited-panel.jpg` | `$Z/work/probe-a.png` (3840×2160; uptime-kuma exited + details panel; ▶ hotspot at **left 74.9%, top 44.7%**) | resize to 1600×900, jpg q82 |
| `media/compose-editor.jpg` | `shots/compose.png` (3840×2160, Edit compose file modal) | resize to 1600×900, jpg q82 |
| `media/favicon.png` (64, also the nav logo), `media/apple-touch-icon.png` (180) | root `ChatGPT Image Sep 3, 2026, 10_55_47 AM(2).png` (1254², logo on a black square) | Circle mask so corners are transparent; resize |
| `media/og.jpg` | root `brag.jpg` | Crop/resize to 1200×630 |

Tools: `sips` for resize, crop, convert (macOS). `sips` can't circle-mask: use a ~10-line Node script with no new dependency, or ImageMagick if `magick` exists. Keep scripts outside the zip dir; run Python with `-I`.

## Out of scope (skipped on purpose)
A live Vue Flow demo, a competitor-named table, i18n, extra pages, analytics, and a live GitHub star count.
