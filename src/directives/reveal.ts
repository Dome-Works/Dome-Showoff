import type { Directive } from 'vue'

// One shared observer for every v-reveal element; created on first use.
let observer: IntersectionObserver | undefined

const reveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`

    if (matchMedia('(prefers-reduced-motion: reduce)').matches || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    observer ??= new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          obs.unobserve(entry.target)
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}

export default reveal
