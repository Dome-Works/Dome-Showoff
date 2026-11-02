<script setup lang="ts">
import BrowserFrame from '../ui/BrowserFrame.vue'
import TerminalCard from '../ui/TerminalCard.vue'

const head = 'CONTAINER ID   IMAGE                              STATUS                    NAMES'
const hosts = [
  {
    title: 'homelab',
    rows: [
      'a3f9c21b7d04   jellyfin/jellyfin:10.9             Up 6 days                 jellyfin',
      '5be10c8e92a7   linuxserver/sonarr:latest          Up 6 days                 sonarr',
      '0c77d4a1f3e8   linuxserver/radarr:latest          Up 6 days                 radarr',
      '9d2e6b05c1aa   grafana/grafana:11.1.0             Up 3 days                 grafana',
      'e41a88f07b32   prom/prometheus:v2.53.0            Up 3 days                 prometheus',
      '7c0b5d3e19f6   traefik:v3.1                       Up 6 days                 traefik',
      '2f8a1e60d9c4   louislam/uptime-kuma:1             Exited (1) 2 hours ago    uptime-kuma',
    ],
  },
  {
    title: 'nas',
    rows: [
      'b71c04e9a2d5   nextcloud:29                       Up 12 days                nextcloud',
      '38d5f2a6c0b1   postgres:16                        Up 12 days                nextcloud-db',
      'c9e07a14b8f3   syncthing/syncthing:1.27           Up 12 days                syncthing',
      '64a2d9b1e7c0   restic/rest-server:latest          Up 12 days                restic',
    ],
  },
  {
    title: 'edge-pi',
    rows: [
      'd05b3e8a71c9   pihole/pihole:2024.07              Up 20 days                pihole',
      '1a6c92f4e0d8   homeassistant/home-assistant:2024  Up 20 days                homeassistant',
      'f83e5b0c2a76   eclipse-mosquitto:2                Up 20 days                mosquitto',
      '4e91d7a3c5b2   koenkk/zigbee2mqtt:1.39.0          Up 20 days                zigbee2mqtt',
    ],
  },
].map((h) => ({
  title: h.title,
  lines: [
    { text: `ssh ${h.title}`, kind: 'prompt' as const },
    { text: 'docker ps', kind: 'prompt' as const },
    { text: head, kind: 'dim' as const },
    ...h.rows.map((text) => ({ text })),
  ],
}))

const rows = [
  ['Rows of containers and visual clutter', 'Visual diagram with grouped nodes'],
  ['Multiple SSH sessions for multiple hosts', 'All hosts in 1 app, divided by tabs'],
  ['Manage through docker-commands', 'Easy-to-use buttons & live feedback'],
]
</script>

<template>
  <section id="diagram" class="contrast">
    <div class="container">
      <header v-reveal class="head">
        <p class="eyebrow">// 01 · the difference</p>
        <h2>Other managers give you a table. DOME gives you a map.</h2>
      </header>

      <div class="cols">
        <div v-reveal class="col">
          <p class="label label--before">Before</p>
          <div class="stack">
            <TerminalCard v-for="h in hosts" :key="h.title" :title="h.title" :lines="h.lines" />
          </div>
        </div>
        <div v-reveal="120" class="col after">
          <p class="label label--after">After</p>
          <div class="media">
            <div class="glow" aria-hidden="true" />
            <BrowserFrame title="DOME: Diagrams">
              <img
                width="1120"
                height="580"
                loading="lazy"
                decoding="async"
                src="/media/diagram-overview.jpg"
                alt="DOME diagram for host homelab: the media stack with jellyfin, sonarr and radarr nodes showing state and size"
              />
            </BrowserFrame>
          </div>
        </div>
      </div>

      <ul v-reveal class="compare">
        <li v-for="[before, after] in rows" :key="before">
          <span class="bad"><span class="mark" aria-hidden="true">✕</span>{{ before }}</span>
          <span class="good"><span class="mark" aria-hidden="true">✓</span>{{ after }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.contrast {
  overflow-x: clip;
  padding-block: var(--section-y);
}

.head {
  max-width: 48rem;
  margin-bottom: var(--space-7);
}

.head h2 {
  margin-top: var(--space-3);
}

.cols {
  display: grid;
  gap: var(--space-7);
  align-items: start;
}

.col {
  min-width: 0;
}

.label {
  display: inline-block;
  margin-bottom: var(--space-4);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-pill);
  font-family: var(--font-mono);
  font-size: var(--fs-eyebrow);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.label--before {
  color: var(--stopped);
  background: color-mix(in srgb, var(--stopped) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--stopped) 40%, transparent);
}

.label--after {
  color: var(--running);
  background: color-mix(in srgb, var(--running) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--running) 40%, transparent);
}

.stack {
  display: grid;
  gap: var(--space-4);
}

/* staggered offsets so the trio reads as a pile of sessions */
.stack > :nth-child(2) {
  margin-left: var(--space-5);
}

.stack > :nth-child(3) {
  margin-left: var(--space-6);
}

.media {
  position: relative;
  isolation: isolate;
}

.compare {
  display: grid;
  gap: var(--space-3);
  margin: var(--space-8) 0 0;
  padding: 0;
  list-style: none;
}

.compare li {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-5);
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

.bad {
  font-family: var(--font-mono);
  font-size: var(--fs-small);
  color: var(--muted);
}

.good {
  font-weight: 600;
  color: var(--text);
}

.mark {
  display: inline-block;
  width: 1.5em;
  font-weight: 700;
}

.bad .mark {
  color: var(--stopped);
}

.good .mark {
  color: var(--running);
}

@media (min-width: 640px) {
  .compare li {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: var(--space-5);
  }
}

@media (min-width: 960px) {
  .cols {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);
  }

  .after {
    position: sticky;
    top: var(--space-9);
  }
}
</style>
