<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { REPO_URL } from '../site'

const scrolled = ref(false)
const onScroll = () => {
  scrolled.value = window.scrollY > 8
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const links = [
  { href: '#diagram', label: 'Diagram' },
  { href: '#features', label: 'Features' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#install', label: 'Install' },
]
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }">
    <a class="skip" href="#top">Skip to content</a>
    <div class="container bar">
      <a class="brand" href="#top">
        <img src="/media/logo.png" alt="" width="32" height="32" />
        <span>DOME</span>
      </a>
      <nav class="links" aria-label="Primary">
        <a v-for="l in links" :key="l.href" :href="l.href">{{ l.label }}</a>
      </nav>
      <a class="gh" :href="REPO_URL" target="_blank" rel="noopener">
        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
          />
        </svg>
        GitHub
      </a>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--bg) 70%, transparent);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  backdrop-filter: blur(14px) saturate(140%);
  border-bottom: 1px solid transparent;
  transition: border-color var(--dur-base) var(--ease-out);
}

.nav--scrolled {
  border-bottom-color: var(--border);
}

.skip {
  position: absolute;
  left: var(--space-4);
  top: 0;
  padding: var(--space-2) var(--space-3);
  background: var(--panel);
  border-radius: 0 0 var(--radius-sm) var(--radius-sm);
  color: var(--text);
  transform: translateY(-100%);
}

.skip:focus {
  transform: none;
  outline: 2px solid var(--accent);
  outline-offset: -2px;
}

.bar {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  height: 64px;
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-right: auto;
  color: var(--text);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-decoration: none;
}

.brand img {
  border-radius: var(--radius-pill);
}

.links {
  display: none;
  gap: var(--space-5);
}

.links a {
  color: var(--muted);
  font-size: var(--fs-small);
  text-decoration: none;
  transition: color var(--dur-fast);
}

.links a:hover {
  color: var(--text);
}

.gh {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  color: var(--text);
  font-size: var(--fs-small);
  font-weight: 500;
  text-decoration: none;
  transition:
    border-color var(--dur-fast),
    background var(--dur-fast);
}

.gh:hover {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}

@media (min-width: 640px) {
  .links {
    display: flex;
  }
}
</style>
