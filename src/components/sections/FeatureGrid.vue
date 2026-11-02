<script setup lang="ts">
// icon = inline SVG path data (24px stroke icons, currentColor)
const features = [
  {
    title: 'Multi-host',
    text: 'One Socket agent per Docker host, a diagram tab for each.',
    large: true,
    icon: 'M3 4h18v6H3zM3 14h18v6H3zM7 7h.01M7 17h.01',
  },
  {
    title: 'Compose-aware',
    text: 'Containers grouped by stack. Managed vs read-only stacks.',
    large: true,
    icon: 'M12 2 2 7l10 5 10-5zM2 12l10 5 10-5M2 17l10 5 10-5',
  },
  {
    title: 'Volume insight',
    text: 'Name, mount path, size, read-only or read-write.',
    icon: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  },
  {
    title: 'Update badges',
    text: 'Flags a newer tag on Docker Hub or public GHCR.',
    icon: 'M12 19V5M5 12l7-7 7 7',
  },
  {
    title: 'Container actions',
    text: 'Start, stop or delete from the details panel.',
    icon: 'M6 4l14 8-14 8z',
  },
  {
    title: 'Compose editor',
    text: 'Create, edit and deploy stacks in the browser.',
    icon: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
  },
  {
    title: 'amd64 + arm64',
    text: 'Published images for both. Runs on ARM boards.',
    icon: 'M6 6h12v12H6zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4',
  },
  {
    title: 'SQLite, zero setup',
    text: 'Data in one volume, migrations run on startup.',
    icon: 'M5 3h11l3 3v15H5zM8 3v6h7V3M8 21v-7h8v7',
  },
]
</script>

<template>
  <section id="features" class="features">
    <div class="container">
      <header v-reveal class="head">
        <p class="eyebrow">// 05 — features</p>
        <h2>Everything you'd SSH in for.</h2>
      </header>

      <ul v-reveal class="grid">
        <li
          v-for="f in features"
          :key="f.title"
          class="card"
          :class="{ large: f.large }"
        >
          <svg
            class="icon"
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
            <path :d="f.icon" />
          </svg>
          <h3>{{ f.title }}</h3>
          <p>{{ f.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.features {
  padding-block: var(--section-y);
}

.head {
  max-width: 22ch;
  margin-bottom: var(--space-7);
}

.head h2 {
  margin-top: var(--space-3);
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}

.card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-5);
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition:
    transform var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out),
    box-shadow var(--dur-fast) var(--ease-out);
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: var(--glow-accent);
}

.icon {
  color: var(--accent);
}

.card h3 {
  font-size: 1.125rem;
}

.card p {
  color: var(--muted);
  font-size: var(--fs-small);
}

.large {
  padding: var(--space-6) var(--space-5);
}

.large h3 {
  font-size: var(--fs-h3);
}

.large p {
  font-size: var(--fs-body);
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 961px) {
  .grid {
    grid-template-columns: repeat(6, 1fr);
  }

  .card {
    grid-column: span 2;
  }

  .large {
    grid-column: span 3;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card:hover {
    transform: none;
  }
}
</style>
