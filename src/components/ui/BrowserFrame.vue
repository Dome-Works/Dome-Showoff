<script setup lang="ts">
defineProps<{ title?: string; beam?: boolean }>()
</script>

<template>
  <figure class="frame" :class="{ 'frame--beam': beam }">
    <div class="bar">
      <span class="dot" /><span class="dot" /><span class="dot" />
      <span v-if="title" class="title">{{ title }}</span>
    </div>
    <div class="body"><slot /></div>
  </figure>
</template>

<style scoped>
@property --beam-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

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

.frame--beam::after {
  content: '';
  position: absolute;
  inset: 0;
  padding: 2px;
  border-radius: inherit;
  background: conic-gradient(
    from var(--beam-angle),
    transparent 0 70%,
    var(--accent) 90%,
    transparent 100%
  );
  /* ring-only mask: show the gradient in the padding box, hide the content box */
  -webkit-mask: linear-gradient(var(--bg) 0 0) content-box, linear-gradient(var(--bg) 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(var(--bg) 0 0) content-box exclude, linear-gradient(var(--bg) 0 0);
  pointer-events: none;
  animation: beam var(--dur-beam) linear infinite;
}

@keyframes beam {
  to {
    --beam-angle: 360deg;
  }
}

@media (prefers-reduced-motion: reduce) {
  .frame--beam::after {
    animation: none;
    display: none;
  }
}
</style>
