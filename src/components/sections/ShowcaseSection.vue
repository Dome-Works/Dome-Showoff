<script setup lang="ts">
import BrowserFrame from '../ui/BrowserFrame.vue'

const rows = [
  {
    eyebrow: '// 02 · multi-host',
    title: 'Every host. One registry.',
    body: 'Register one Socket agent per Docker host. Each host gets its own diagram tab, and Socket version mismatches are flagged.',
    frame: 'DOME: Sockets',
    src: '/media/sockets.jpg',
    alt: 'DOME Sockets page listing hosts homelab, nas and edge-pi, all reachable',
    w: 1032,
    h: 350,
    spots: [
      [2.5, 42.9],
      [2.5, 56.9],
      [2.5, 70.9],
    ],
  },
  {
    eyebrow: '// 03 · act on it',
    title: 'Spot it. Start it.',
    body: 'All containers, managed by DOME or not, show up in the diagram. Open a container\'s detail-pane to see its image, volumes, and Docker controls.',
    frame: 'DOME: Container details',
    src: '/media/exited-panel.jpg',
    alt: 'uptime-kuma container details panel showing state exited, image, volume kuma_data and start, stop, delete buttons',
    w: 1600,
    h: 848,
    spots: [[67.3, 31.6]],
    toast: 'Started uptime-kuma.',
  },
  {
    eyebrow: '// 04 · compose',
    title: 'Write Compose. Deploy.',
    body: 'Create a stack, edit its compose file in the built-in editor, then deploy. DOME runs <code>docker compose up</code> on that host. Stacks found on the host stay read-only.',
    frame: 'DOME: Stacks',
    src: '/media/compose-editor.jpg',
    alt: 'DOME Edit compose file dialog for the media stack, with the compose YAML for jellyfin, sonarr and radarr in a code editor',
    w: 1600,
    h: 893,
    spots: [[93.3, 90.6, 7.6]],
  },
]
</script>

<template>
  <section id="showcase" class="showcase">
    <div class="container">
      <article v-for="(r, i) in rows" :key="r.title" v-reveal class="row" :class="{ 'row--flip': i % 2 }">
        <div class="text">
          <p class="eyebrow">{{ r.eyebrow }}</p>
          <h3>{{ r.title }}</h3>
          <p class="body" v-html="r.body" />
        </div>
        <div class="media">
          <div class="glow" aria-hidden="true" />
          <BrowserFrame :title="r.frame">
            <div class="shot">
              <img :width="r.w" :height="r.h" loading="lazy" decoding="async" :src="r.src" :alt="r.alt" />
              <span
                v-for="[x, y, size] in r.spots"
                :key="`${x}-${y}`"
                class="spot"
                :style="{ left: `${x}%`, top: `${y}%`, ...(size && { width: `${size}%` }) }"
                aria-hidden="true"
              />
              <div v-if="r.toast" class="toast" aria-hidden="true">
                <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                  <circle cx="10" cy="10" r="10" fill="currentColor" />
                  <path d="M5.5 10.5l3 3 6-6.5" fill="none" stroke="var(--panel)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                {{ r.toast }}
              </div>
            </div>
          </BrowserFrame>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.showcase {
  overflow-x: clip;
  padding-block: 0 var(--section-y);
}

.row {
  display: grid;
  gap: var(--space-6);
  align-items: center;
  padding-block: var(--space-7);
}

.text,
.media {
  min-width: 0;
}

.text h3 {
  margin-block: var(--space-3);
}

.body {
  max-width: 46ch;
  color: var(--muted);
}

.body :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.9em;
  color: var(--text);
}

.media {
  position: relative;
  isolation: isolate;
}

.shot {
  position: relative;
}

.spot {
  position: absolute;
  width: clamp(8px, 2.8%, 28px);
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  border: 2px solid var(--accent);
  border-radius: var(--radius-pill);
  pointer-events: none;
}

.spot::after {
  content: '';
  position: absolute;
  inset: -2px;
  border: 2px solid var(--accent);
  border-radius: inherit;
  animation: ping 2s var(--ease-out) infinite;
}

@keyframes ping {
  from {
    opacity: 0.7;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(2.2);
  }
}

.toast {
  position: absolute;
  right: 3%;
  bottom: 4%;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-card);
  font-size: var(--fs-small);
  color: var(--text);
  opacity: 0;
  transform: translateX(24px);
  transition:
    opacity var(--dur-base) var(--ease-out) 600ms,
    transform var(--dur-base) var(--ease-out) 600ms;
}

.toast svg {
  color: var(--running);
}

.is-visible .toast {
  opacity: 1;
  transform: none;
}

@media (min-width: 960px) {
  .row {
    grid-template-columns: 5fr 7fr;
    gap: var(--space-8);
  }

  .row--flip {
    grid-template-columns: 7fr 5fr;
  }

  .row--flip .text {
    order: 2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .spot::after {
    animation: none;
    display: none;
  }
}
</style>
