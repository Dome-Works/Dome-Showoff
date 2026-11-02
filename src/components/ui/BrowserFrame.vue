<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <figure class="frame">
    <div class="bar">
      <span class="dot" /><span class="dot" /><span class="dot" />
      <span v-if="title" class="title">{{ title }}</span>
    </div>
    <div class="body"><slot /></div>
  </figure>
</template>

<style scoped>
.frame {
  position: relative;
  margin: 0;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-frame), 0 0 0 1px color-mix(in srgb, var(--accent) 12%, transparent);
  overflow: hidden;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.body :slotted(img),
.body :slotted(picture),
.body :slotted(video) {
  display: block;
  width: 100%;
  height: auto;
}
</style>
