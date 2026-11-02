<script setup lang="ts">
defineProps<{
  title: string
  lines: { text: string; kind?: 'prompt' | 'out' | 'dim' }[]
}>()
</script>

<template>
  <div class="term" role="group" :aria-label="`Terminal: ${title}`">
    <div class="bar">
      <span class="dot" /><span class="dot" /><span class="dot" />
      <span class="title">{{ title }}</span>
    </div>
    <pre class="body" tabindex="0"><code><span
      v-for="(line, i) in lines"
      :key="i"
      class="line"
      :class="`line--${line.kind ?? 'out'}`"
    >{{ line.text }}
</span></code></pre>
  </div>
</template>

<style scoped>
.term {
  background: var(--terminal);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  min-width: 0;
}

.bar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--border);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--muted) 45%, transparent);
}

.title {
  margin-left: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--fs-small);
  color: var(--muted);
}

.body {
  margin: 0;
  padding: var(--space-4);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: var(--fs-small);
  line-height: 1.7;
  color: var(--text);
}

.body:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
}

.line {
  display: block;
}

.line--dim {
  color: var(--muted);
}

.line--prompt::before {
  content: '$ ';
  color: var(--running);
}
</style>
