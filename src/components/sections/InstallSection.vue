<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '../ui/CodeBlock.vue'
import { REPO_URL } from '../../site'

const tabs = [
  { id: 'published', label: 'Published images' },
  { id: 'source', label: 'From source' },
]
const active = ref(0)
const tabEls = ref<HTMLButtonElement[]>([])

function onKey(e: KeyboardEvent) {
  const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
  const target = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : step === undefined ? -1 : (active.value + step + tabs.length) % tabs.length
  if (target < 0) return
  e.preventDefault()
  active.value = target
  tabEls.value[target]?.focus()
}
</script>

<template>
  <section id="install" class="install">
    <div class="container">
      <header v-reveal class="head">
        <p class="eyebrow">// 07 — install</p>
        <h2>Up in 60 seconds.</h2>
      </header>

      <div v-reveal class="panel">
        <div class="tabs" role="tablist" aria-label="Install method" @keydown="onKey">
          <button
            v-for="(t, i) in tabs"
            :id="`tab-${t.id}`"
            :key="t.id"
            :ref="(el) => (tabEls[i] = el as HTMLButtonElement)"
            class="tab"
            type="button"
            role="tab"
            :aria-selected="active === i"
            :aria-controls="`panel-${t.id}`"
            :tabindex="active === i ? 0 : -1"
            @click="active = i"
          >
            {{ t.label }}
          </button>
        </div>

        <div
          v-show="active === 0"
          id="panel-published"
          class="tabpanel"
          role="tabpanel"
          aria-labelledby="tab-published"
        >
          <CodeBlock code="docker compose pull&#10;docker compose up -d" />
          <p>
            Then open <code>http://localhost:5200/sockets</code> and register a Socket named
            <code>Local</code> at <code>http://socket:8080</code>.
          </p>
          <p class="note">
            Images are <code>ghcr.io/dome-works/{server,socket,client}</code>. Pin an exact release
            instead of <code>latest</code> for repeatable installs.
          </p>
          <a :href="REPO_URL" class="link">Get docker-compose.yml</a>
        </div>

        <div
          v-show="active === 1"
          id="panel-source"
          class="tabpanel"
          role="tabpanel"
          aria-labelledby="tab-source"
        >
          <CodeBlock
            code="git clone https://github.com/Dome-Works/DOME.git&#10;cd DOME&#10;docker compose -f dev.docker-compose.yml up --build -d"
          />
          <p>
            Client runs at <code>http://localhost:5200</code>. Register the Socket at
            <code>http://socket:8080</code>.
          </p>
        </div>
      </div>

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
  padding-block: var(--section-y);
}

.head {
  max-width: 48rem;
  margin-bottom: var(--space-7);
}

.head h2 {
  margin-top: var(--space-3);
}

.panel {
  max-width: 760px;
}

.tabs {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
  overflow-x: auto;
}

.tab {
  min-height: 44px;
  padding: 0 var(--space-4);
  font-size: var(--fs-small);
  white-space: nowrap;
  color: var(--muted);
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition:
    color var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out),
    background-color var(--dur-base) var(--ease-out);
}

.tab:hover {
  color: var(--text);
}

.tab[aria-selected='true'] {
  color: var(--text);
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 14%, transparent);
}

.tabpanel {
  display: grid;
  gap: var(--space-4);
  min-width: 0;
}

.tabpanel p {
  margin: 0;
}

code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  color: var(--text);
  overflow-wrap: anywhere;
}

.note {
  font-size: var(--fs-small);
  color: var(--muted);
}

.link {
  justify-self: start;
}

.warn {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  max-width: 760px;
  margin-top: var(--space-7);
  padding: var(--space-4) var(--space-5);
  color: var(--text);
  background: color-mix(in srgb, var(--warning) 8%, var(--panel));
  border: 1px solid var(--warning);
  border-radius: var(--radius-md);
}

.warn svg {
  flex: none;
  color: var(--warning);
}
</style>
