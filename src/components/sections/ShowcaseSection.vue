<script setup lang="ts">
import BrowserFrame from '../ui/BrowserFrame.vue'

const rows = [
  {
    eyebrow: '// 02 — multi-host',
    title: 'Every host. One registry.',
    body: 'Register one Socket agent per Docker host. Each host gets its own diagram tab, and Socket version mismatches are flagged.',
    frame: 'DOME — Sockets',
    src: '/media/sockets.jpg',
    alt: 'DOME Sockets page listing hosts homelab, nas and edge-pi, all reachable',
    w: 1600,
    h: 900,
    spots: [
      [18.4, 23.8],
      [18.4, 29.2],
      [18.4, 34.7],
    ],
  },
  {
    eyebrow: '// 03 — act on it',
    title: 'Spot it. Start it.',
    body: 'An exited container shows up red on the diagram. Open it to see its image and volumes (name, mount path, size, RO/RW), then start, stop or delete it.',
    frame: 'DOME — Container details',
    src: '/media/exited-panel.jpg',
    alt: 'uptime-kuma container details panel showing state exited, image, volume kuma_data and start, stop, delete buttons',
    w: 2560,
    h: 1440,
    spots: [[74.9, 44.7]],
    toast: 'Started uptime-kuma.',
  },
  {
    eyebrow: '// 04 — compose',
    title: 'Write Compose. Deploy.',
    body: 'Create a stack, edit its compose file in the built-in editor, then deploy. DOME runs docker compose up on that host. Stacks found on the host stay read-only.',
    frame: 'DOME — Stacks',
    src: '/media/stack-deployed.jpg',
    alt: 'media stack panel after deploy, with toast Deployed media.',
    w: 960,
    h: 540,
    spots: [],
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
          <p class="body">{{ r.body }}</p>
        </div>
        <div class="media">
          <div class="glow" aria-hidden="true" />
          <BrowserFrame :title="r.frame">
            <div class="shot">
              <img :src="r.src" :alt="r.alt" :width="r.w" :height="r.h" loading="lazy" decoding="async" />
              <span
                v-for="[x, y] in r.spots"
                :key="`${x}-${y}`"
                class="spot"
                :style="{ left: `${x}%`, top: `${y}%` }"
                aria-hidden="true"
              />
              <div v-if="r.toast" class="toast" role="status">
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

.media {
  position: relative;
  isolation: isolate;
}

.shot {
  position: relative;
}

.spot {
  position: absolute;
  width: 28px;
  height: 28px;
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
