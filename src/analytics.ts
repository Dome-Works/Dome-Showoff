import { POSTHOG_KEY } from './site'

type Props = Record<string, unknown>
type PostHog = typeof import('posthog-js').default

let ph: PostHog | undefined
const queue: [string, Props?][] = []

// Events fired before posthog-js has loaded are queued and flushed on load.
export function track(event: string, props?: Props) {
  if (ph) ph.capture(event, props)
  else queue.push([event, props])
}

export function initAnalytics() {
  if (import.meta.env.DEV) return // keep local dev out of the data
  const load = async () => {
    ph = (await import('posthog-js')).default
    ph.init(POSTHOG_KEY, {
      api_host: 'https://eu.i.posthog.com',
      ui_host: 'https://eu.posthog.com',
      cookieless_mode: 'always', // no cookies/storage, anonymous server-side hash
      autocapture: false,
      capture_pageview: true,
      capture_pageleave: true,
      disable_session_recording: true,
      disable_surveys: true,
      respect_dnt: true,
    })
    queue.splice(0).forEach(([e, p]) => ph!.capture(e, p))
  }
  // after first paint, to keep LCP clean
  if (document.readyState === 'complete') load()
  else addEventListener('load', load, { once: true })

  observeViews()
  document.addEventListener('click', onClick)
  trackScrollDepth()
}

function observeViews() {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        const el = e.target as HTMLElement
        if (el.id) track('section_viewed', { section: el.id })
        else track('showcase_row_viewed', { row: el.dataset.row })
        io.unobserve(el)
      }
    },
    { threshold: 0.4 },
  )
  document.querySelectorAll<HTMLElement>('main section[id]').forEach((s) => io.observe(s))
  document.querySelectorAll<HTMLElement>('#showcase .row').forEach((r, i) => {
    r.dataset.row = ['multi-host', 'act', 'compose'][i]
    io.observe(r)
  })
}

function onClick(ev: MouseEvent) {
  const a = (ev.target as Element).closest<HTMLAnchorElement>('a[href]')
  if (!a) return
  const where = a.closest('header.nav') ? 'nav' : a.closest('section')?.id || 'page'
  const label = a.textContent?.trim().replace(/\s+/g, ' ')
  const url = new URL(a.href)
  if (url.origin === location.origin) {
    const target = url.hash.slice(1)
    if (target && where === 'nav') track('nav_clicked', { target })
    else if (target) track('cta_clicked', { cta: label, location: where, destination: target })
    return
  }
  const readme = url.hash === '#readme'
  track('cta_clicked', { cta: label, location: where, destination: readme ? 'readme' : 'repo' })
  track('outbound_clicked', { url_host: url.host, path: url.pathname })
}

function trackScrollDepth() {
  const hit = new Set<number>()
  addEventListener(
    'scroll',
    () => {
      const max = document.documentElement.scrollHeight - innerHeight
      if (max <= 0) return
      for (const p of [25, 50, 75, 100]) {
        if (scrollY / max >= p / 100 && !hit.has(p)) {
          hit.add(p)
          track('scroll_depth', { percent: p })
        }
      }
    },
    { passive: true },
  )
}
