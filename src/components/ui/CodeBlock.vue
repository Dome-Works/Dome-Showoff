<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const props = defineProps<{ code: string; label?: string }>()

const status = ref<'idle' | 'copied' | 'failed'>('idle')
let timer: number | undefined

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code)
    status.value = 'copied'
  } catch {
    status.value = 'failed'
  }
  clearTimeout(timer)
  timer = window.setTimeout(() => (status.value = 'idle'), 1500)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="code">
    <div v-if="label" class="label">{{ label }}</div>
    <pre class="body"><code><span
      v-for="(line, i) in code.split('\n')"
      :key="i"
      class="line"
      :class="{ 'line--cmd': line.trim() }"
    >{{ line }}
</span></code></pre>
    <button class="copy" type="button" aria-label="Copy command" @click="copy">
      <svg
        v-if="status !== 'copied'"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      <svg
        v-else
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
      <span aria-live="polite">{{
        status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy'
      }}</span>
    </button>
  </div>
</template>

<style scoped>
.code {
  position: relative;
  background: var(--terminal);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  min-width: 0;
}

.label {
  padding: var(--space-3) var(--space-4) 0;
  font-size: var(--fs-eyebrow);
  color: var(--muted);
}

.body {
  margin: 0;
  padding: var(--space-4);
  /* leave room for the copy button */
  padding-right: calc(var(--space-4) + 120px);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: var(--fs-small);
  line-height: 1.7;
  color: var(--text);
}

.line {
  display: block;
}

.line--cmd::before {
  content: '$ ';
  color: var(--running);
  user-select: none;
}

.copy {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 40px;
  min-width: 40px;
  padding: 0 var(--space-3);
  font: inherit;
  font-size: var(--fs-small);
  color: var(--text);
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: border-color var(--dur-fast) var(--ease-out);
}

.copy:hover {
  border-color: var(--accent);
}

.copy:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
</style>
