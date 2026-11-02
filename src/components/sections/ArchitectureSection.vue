<script setup lang="ts">
type Node = { x: number; y: number; w: number; h: number; t: string; s?: string; hot?: boolean }

const label =
  'Architecture: the Browser opens the Client (React), which talks to the Server (.NET 10, SQLite). The Server connects to three Sockets, homelab, nas and edge-pi. Each Socket talks to its own Docker Engine.'

const names = ['homelab', 'nas', 'edge-pi']

// Desktop: left to right. Mobile: top to bottom. Edges are index pairs into `nodes`.
const wide = {
  vb: '0 0 960 360',
  vertical: false,
  nodes: [
    { x: 10, y: 148, w: 110, h: 64, t: 'Browser' },
    { x: 170, y: 148, w: 150, h: 64, t: 'Client', s: 'React' },
    { x: 360, y: 148, w: 170, h: 64, t: 'Server', s: '.NET 10 · SQLite', hot: true },
    ...names.map((n, i) => ({ x: 580, y: 28 + i * 120, w: 120, h: 64, t: 'Socket', s: n })),
    ...names.map((_, i) => ({ x: 780, y: 28 + i * 120, w: 150, h: 64, t: 'Docker Engine' })),
  ] as Node[],
}
const tall = {
  vb: '0 0 360 520',
  vertical: true,
  nodes: [
    { x: 100, y: 10, w: 160, h: 56, t: 'Browser' },
    { x: 100, y: 106, w: 160, h: 56, t: 'Client', s: 'React' },
    { x: 80, y: 202, w: 200, h: 56, t: 'Server', s: '.NET 10 · SQLite', hot: true },
    ...names.map((n, i) => ({ x: 10 + i * 120, y: 338, w: 100, h: 56, t: 'Socket', s: n })),
    ...names.map((_, i) => ({ x: 10 + i * 120, y: 454, w: 100, h: 56, t: 'Docker', s: 'Engine' })),
  ] as Node[],
}
const links: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 4],
  [2, 5],
  [3, 6],
  [4, 7],
  [5, 8],
]

function path(nodes: Node[], vertical: boolean, [a, b]: [number, number]) {
  const p = nodes[a]
  const q = nodes[b]
  if (vertical) {
    const x1 = p.x + p.w / 2
    const y1 = p.y + p.h
    const x2 = q.x + q.w / 2
    const mid = (y1 + q.y) / 2
    return `M${x1} ${y1} C${x1} ${mid} ${x2} ${mid} ${x2} ${q.y}`
  }
  const x1 = p.x + p.w
  const y1 = p.y + p.h / 2
  const y2 = q.y + q.h / 2
  const mid = (x1 + q.x) / 2
  return `M${x1} ${y1} C${mid} ${y1} ${mid} ${y2} ${q.x} ${y2}`
}

const layouts = [
  { cls: 'wide', ...wide },
  { cls: 'tall', ...tall },
].map((l) => ({ ...l, edges: links.map((e) => path(l.nodes, l.vertical, e)) }))
</script>

<template>
  <section id="architecture" class="arch">
    <div class="container">
      <header v-reveal class="head">
        <p class="eyebrow">// 06 — architecture</p>
        <h2>Small agents. One view.</h2>
      </header>

      <div v-reveal class="diagram">
        <svg
          v-for="l in layouts"
          :key="l.cls"
          :class="l.cls"
          :viewBox="l.vb"
          role="img"
          :aria-label="label"
        >
          <path v-for="(d, i) in l.edges" :key="i" :d="d" class="edge" />
          <g v-for="(n, i) in l.nodes" :key="i" :class="{ node: true, hot: n.hot }">
            <rect :x="n.x" :y="n.y" :width="n.w" :height="n.h" rx="12" />
            <text :x="n.x + n.w / 2" :y="n.y + (n.s ? n.h / 2 - 4 : n.h / 2 + 5)" class="t">{{ n.t }}</text>
            <text v-if="n.s" :x="n.x + n.w / 2" :y="n.y + n.h / 2 + 15" class="s">{{ n.s }}</text>
          </g>
        </svg>
      </div>

      <p v-reveal class="caption">
        The Server never talks to Docker directly. Each Socket only talks to its own host.
      </p>
    </div>
  </section>
</template>

<style scoped>
.arch {
  padding-block: var(--section-y);
}

.head {
  max-width: 22ch;
  margin-bottom: var(--space-7);
}

.head h2 {
  margin-top: var(--space-3);
}

.diagram {
  padding: var(--space-5);
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

svg {
  width: 100%;
  height: auto;
  margin-inline: auto;
}

/* vertical layout below 640px */
.wide {
  display: none;
}

.tall {
  max-width: 420px;
}

.node rect {
  fill: var(--panel);
  stroke: var(--border);
  stroke-width: 1.5;
}

.node.hot rect {
  stroke: var(--accent);
  stroke-width: 2;
  filter: drop-shadow(0 0 12px var(--accent-glow));
}

text {
  text-anchor: middle;
  font-family: var(--font-mono);
}

.t {
  font-size: 15px;
  font-weight: 600;
  fill: var(--text);
}

.s {
  font-size: 12px;
  fill: var(--muted);
}

.edge {
  fill: none;
  stroke: var(--accent);
  stroke-width: 1.75;
  stroke-linecap: round;
  stroke-dasharray: 6 8;
  animation: flow var(--dur-flow) linear infinite;
}

@keyframes flow {
  to {
    stroke-dashoffset: -28;
  }
}

.caption {
  margin-top: var(--space-5);
  max-width: 60ch;
  color: var(--muted);
}

@media (min-width: 640px) {
  .wide {
    display: block;
  }

  .tall {
    display: none;
  }

  .diagram {
    padding: var(--space-6);
  }
}

@media (prefers-reduced-motion: reduce) {
  .edge {
    animation: none;
  }
}
</style>
