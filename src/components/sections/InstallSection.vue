<script setup lang="ts">
import { REPO_URL } from '../../site'
</script>

<template>
  <section id="install" class="install">
    <div class="glow" aria-hidden="true" />
    <div class="container inner">
      <header v-reveal class="head">
        <p class="eyebrow">// 07 · get started</p>
        <h2>Up in 60 seconds.</h2>
        <p class="lede">Self-hosted right in Docker, the place you know best. One main host &amp; one Socket per additional Docker environment, and never look back to the Docker CLI.</p>
        <a class="btn" :href="`${REPO_URL}#readme`" target="_blank" rel="noopener">
          Get started on GitHub
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </header>

      <p v-reveal class="warn" role="note">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3 2 21h20zM12 10v5M12 18h.01" />
        </svg>
        <span>Preview: no authentication yet. Run DOME on a trusted private network.</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.install {
  position: relative;
  isolation: isolate;
  overflow-x: clip;
  padding-block: var(--section-y);
  text-align: center;
}

.inner {
  display: grid;
  justify-items: center;
  gap: var(--space-7);
}

.head {
  display: grid;
  justify-items: center;
  gap: var(--space-4);
}

.lede {
  max-width: 50ch;
  margin: 0;
  color: var(--muted);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-3);
  padding: var(--space-3) var(--space-5);
  background: var(--accent);
  color: var(--bg);
  border: 1px solid var(--accent);
  border-radius: var(--radius-pill);
  font-weight: 600;
  text-decoration: none;
  transition:
    transform var(--dur-fast),
    box-shadow var(--dur-base);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--glow-accent);
}

.warn {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  max-width: 560px;
  margin: 0;
  padding: var(--space-4) var(--space-5);
  text-align: left;
  color: var(--text);
  background: color-mix(in srgb, var(--warning) 8%, var(--panel));
  border: 1px solid var(--warning);
  border-radius: var(--radius-md);
}

.warn svg {
  flex: none;
  color: var(--warning);
}

@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }

  .btn:hover {
    transform: none;
  }
}
</style>
