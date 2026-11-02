# DESIGN_SYSTEM.md: token contract

`src/styles/tokens.css` implements exactly this. Components use `var(--…)` only; no raw hex/rgb in components.

## Colors
| Token | Value | Use |
|---|---|---|
| `--bg` | `#0b0f14` | page background |
| `--bg-2` | `#0f1419` | alternate section background |
| `--panel` | `#161b22` | cards, frames |
| `--border` | `#2a3340` | hairlines |
| `--accent` | `#5a9fff` | links, CTAs, glow, "under one roof." |
| `--running` | `#3dd68c` | success / running / "after" |
| `--stopped` | `#f85149` | pain / stopped / "before" |
| `--text` | `#e6edf3` | body and headings |
| `--muted` | `#8b9bb0` | secondary text (must stay ≥ 4.5:1 on `--bg`) |
| `--accent-glow` | `#5a9fff` at .35 alpha (`rgb(90 159 255 / .35)`) | glows, beam |
| `--warning` | `#e3b341` | preview note only |
| `--terminal` | `#0f141b` | terminal card body |
| `--bg-glass` | `color-mix(in srgb, var(--bg) 72%, transparent)` | translucent surfaces: NavBar blur bg, overlays |

Any other translucency uses `color-mix()` on a token, never raw `rgba()`/`rgb()` in components.

## Type
- Sans: `--font-sans: 'Geist Variable', system-ui, sans-serif` (`@fontsource-variable/geist`).
- Mono: `--font-mono: 'Geist Mono Variable', ui-monospace, monospace` (`@fontsource-variable/geist-mono`).
- Display tracking: `-0.03em`.

| Token | Value |
|---|---|
| `--fs-display` | `clamp(2.5rem, 1.5rem + 5vw, 5rem)` (line-height 1.02) |
| `--fs-h2` | `clamp(1.875rem, 1.2rem + 2.8vw, 3rem)` |
| `--fs-h3` | `clamp(1.25rem, 1.05rem + 0.8vw, 1.625rem)` |
| `--fs-body` | `clamp(1rem, 0.96rem + 0.2vw, 1.125rem)` (line-height 1.6) |
| `--fs-small` | `0.875rem` |
| `--fs-eyebrow` | `0.8125rem` (mono, letter-spacing 0.08em) |

## Spacing (4px base)
`--space-1: 4px` · `-2: 8px` · `-3: 12px` · `-4: 16px` · `-5: 24px` · `-6: 32px` · `-7: 48px` · `-8: 64px` · `-9: 96px`

## Layout
- `--container: 1200px`; side gutter `--space-4` (16px) on mobile, `--space-5` (24px) from 640px.
- `--section-y: clamp(4rem, 3rem + 5vw, 8rem)` vertical section padding.
- Breakpoints: **640px** and **960px** (`@media (min-width: …)`, mobile first).

## Radii
`--radius-sm: 6px` · `--radius-md: 12px` · `--radius-lg: 20px` · `--radius-pill: 999px`

## Shadows and glows
- `--shadow-card: 0 1px 0 rgb(255 255 255 / .04) inset, 0 12px 32px rgb(0 0 0 / .45)`
- `--shadow-frame: 0 24px 64px rgb(0 0 0 / .6)`
- `--glow-accent: 0 0 0 1px var(--accent-glow), 0 0 48px var(--accent-glow)`
- `.glow` (base.css): `radial-gradient(60% 50% at 50% 40%, var(--accent-glow), transparent 70%)` behind media.
- Background: blueprint dot-grid on `--bg` (`radial-gradient(var(--border) 1px, transparent 1px)`, 24px grid, low opacity).

## Motion
| Token | Value |
|---|---|
| `--dur-fast` | `150ms` (hover, focus) |
| `--dur-base` | `300ms` (tabs, toast) |
| `--dur-reveal` | `700ms` |
| `--dur-beam` | `6s` linear infinite |
| `--dur-flow` | `1.6s` linear infinite |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |

- **Reveal:** directive `v-reveal` (`src/directives/reveal.ts`, one IntersectionObserver) adds `.is-visible` once the element enters view. CSS: revealed elements start `opacity: 0; transform: translateY(16px)`; `.is-visible` transitions to `opacity: 1; transform: none` over `--dur-reveal` `--ease-out`. Optional stagger via `--reveal-delay`.
- **Border beam:** conic-gradient (accent) rotating via animated `@property --beam-angle`, `--dur-beam`. `HeroSection` owns the hero video's beam CSS.
- **Edge flow:** architecture SVG edges use `stroke-dasharray` + animated `stroke-dashoffset`, `--dur-flow`.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables all animations and transitions (beam, flow, toast slide, hover transforms); `v-reveal` adds `.is-visible` immediately; hero video stays paused on its poster.

## Component inventory
### UI primitives (`src/components/ui/`)
| Component | Props | Slots / notes |
|---|---|---|
| `BrowserFrame.vue` | `title?: string` | default slot (the screenshot). Window chrome (three dots + title). For raw UI screenshots only, never the hero video. |
| `TerminalCard.vue` | `title: string`, `lines: { text: string; kind?: 'prompt' \| 'out' \| 'dim' }[]` | No slots. Mono, `--terminal` body; `prompt` lines get a `$`. Content is fictional but plausible `docker ps` output, using container names from the screenshots. |

### Shell and sections
| Component | File | Anchor id |
|---|---|---|
| NavBar | `src/components/NavBar.vue` | n/a |
| HeroSection | `src/components/sections/HeroSection.vue` | n/a |
| ContrastSection | `src/components/sections/ContrastSection.vue` | `#diagram` |
| ShowcaseSection | `src/components/sections/ShowcaseSection.vue` | n/a |
| FeatureGrid | `src/components/sections/FeatureGrid.vue` | `#features` |
| ArchitectureSection | `src/components/sections/ArchitectureSection.vue` | `#architecture` |
| InstallSection | `src/components/sections/InstallSection.vue` | `#install` |
| SiteFooter | `src/components/SiteFooter.vue` | n/a |

`App.vue` imports every section in order (T0.3); later tasks must not edit `App.vue` or `main.ts`.
