<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { REPO_URL } from '../../site'
import { track } from '../../analytics'

const COMMAND =
  'curl -fsSL https://raw.githubusercontent.com/Dome-Works/DOME/main/docker-compose.yml -o docker-compose.yml && docker compose up -d'

const status = ref<'' | 'Copied' | 'Copy failed'>('')
let timer: ReturnType<typeof setTimeout> | undefined

async function copy() {
  try {
    await navigator.clipboard.writeText(COMMAND)
    status.value = 'Copied'
  } catch {
    status.value = 'Copy failed'
  }
  track('install_command_copied', { success: status.value === 'Copied' })
  clearTimeout(timer)
  timer = setTimeout(() => (status.value = ''), 1500)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <section id="install" class="install">
    <div class="glow" aria-hidden="true" />
    <div class="container inner">
      <header v-reveal class="head">
        <p class="eyebrow">// 07 · get started</p>
        <h2>Up in 60 seconds.</h2>
        <p class="lede">Self-hosted right in Docker, the place you know best. One main host &amp; one Socket per additional Docker environment, and never look back to the Docker CLI.</p>
        <div class="cmd">
          <div class="bar">
            <button type="button" class="copy" aria-label="Copy command" @click="copy">{{ status || 'Copy' }}</button>
            <span class="sr" aria-live="polite">{{ status }}</span>
          </div>
          <div class="scroll" tabindex="0" role="region" aria-label="Quick start command">
            <code>{{ COMMAND }}</code>
          </div>
        </div>
        <p class="hint">Then open <code>http://localhost:5200</code> and register the local Socket at <code>http://socket:8080</code>, or any additional sockets through <code>http://device-ip:5110</code>.</p>
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

.cmd {
  width: 100%;
  max-width: 720px;
  min-width: 0;
  margin-top: var(--space-3);
  text-align: left;
  background: var(--terminal);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.bar {
  display: flex;
  justify-content: flex-end;
  padding: var(--space-1) var(--space-2);
  border-bottom: 1px solid var(--border);
}

.copy {
  min-width: 40px;
  min-height: 40px;
  padding: 0 var(--space-3);
  background: none;
  color: var(--muted);
  border: 0;
  border-radius: var(--radius-sm);
  font: inherit;
  font-size: var(--fs-small);
  cursor: pointer;
  transition: color var(--dur-fast);
}

.copy:hover {
  color: var(--text);
}

.copy:focus-visible,
.scroll:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.scroll {
  overflow-x: auto;
  padding: var(--space-4);
}

.scroll code {
  display: block;
  width: max-content;
  font-family: var(--font-mono);
  font-size: var(--fs-small);
  color: var(--text);
  white-space: nowrap;
}

.scroll code::before {
  content: '$ ';
  color: var(--running);
  user-select: none;
}

.hint {
  margin: 0;
  font-size: var(--fs-small);
  color: var(--muted);
}

.hint code {
  font-family: var(--font-mono);
  color: var(--text);
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
  .btn,
  .copy {
    transition: none;
  }

  .btn:hover {
    transform: none;
  }
}
</style>
