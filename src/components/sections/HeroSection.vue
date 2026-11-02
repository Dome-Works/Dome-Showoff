<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { REPO_URL, VERSION } from '../../site'

const video = ref<HTMLVideoElement>()
const muted = ref(true)
const playing = ref(true)

onMounted(() => {
  const v = video.value
  if (!v) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    playing.value = false
    v.removeAttribute('autoplay')
    v.pause()
    return
  }
  // autoplay can be blocked (e.g. data saver): fall back to the Play button
  v.play().catch(() => (playing.value = false))
})

function toggleMute() {
  if (!video.value) return
  muted.value = !muted.value
  video.value.muted = muted.value
}

function play() {
  video.value?.play().catch(() => {})
}
</script>

<template>
  <section id="top" class="hero">
    <div class="grid" aria-hidden="true" />
    <div class="dome" aria-hidden="true" />
    <div class="container inner">
      <p class="pill">
        <span class="pulse" aria-hidden="true" />
        v{{ VERSION }} preview
      </p>
      <h1>Your entire Docker infrastructure,<br /><span class="accent">under one roof.</span></h1>
      <p class="sub">
        Stop SSH-ing to every device separately. Stop cluttering your desktop with multiple terminals to manage your Docker infrastructure. DOME shows every container on every host in
        one place, as a diagram per host grouped by Compose stack, and you can start, stop, edit and
        deploy right from there.
      </p>
      <div class="ctas">
        <a class="btn btn--primary" href="#install">Get started</a>
        <a class="btn btn--ghost" :href="REPO_URL" target="_blank" rel="noopener">Star on GitHub</a>
      </div>

      <div class="media" v-reveal>
        <div class="stage">
          <video
            ref="video"
            src="/media/brag.mp4"
            poster="/media/hero-poster.jpg"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
            @play="playing = true"
          />
          <button
            v-if="!playing"
            class="ctl ctl--play"
            type="button"
            @click="play"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play video
          </button>
          <button
            class="ctl ctl--mute"
            type="button"
            :aria-pressed="!muted"
            :aria-label="muted ? 'Unmute video' : 'Mute video'"
            @click="toggleMute"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M11 5 6 9H2v6h4l5 4z" fill="currentColor" />
              <template v-if="muted">
                <path d="m22 9-6 6M16 9l6 6" />
              </template>
              <template v-else>
                <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
              </template>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@property --beam-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding-block: var(--space-8) var(--section-y);
  text-align: center;
}

.grid {
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image: radial-gradient(
    color-mix(in srgb, var(--accent) 45%, var(--border)) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
  opacity: 0.5;
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 35%, var(--bg) 20%, transparent 75%);
  mask-image: radial-gradient(ellipse 70% 60% at 50% 35%, var(--bg) 20%, transparent 75%);
}

.dome {
  position: absolute;
  left: 50%;
  top: 0;
  z-index: -1;
  width: min(1400px, 140%);
  height: 720px;
  transform: translateX(-50%);
  background: radial-gradient(50% 60% at 50% 0%, var(--accent-glow), transparent 70%);
  pointer-events: none;
}

.inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-5);
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-4);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--panel) 70%, transparent);
  font-family: var(--font-mono);
  font-size: var(--fs-eyebrow);
  letter-spacing: 0.04em;
  color: var(--muted);
}

.pulse {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-pill);
  background: var(--running);
  animation: pulse 2s ease-out infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--running) 60%, transparent);
  }
  100% {
    box-shadow: 0 0 0 8px transparent;
  }
}

h1 {
  max-width: 18ch;
  text-wrap: balance;
}

.accent {
  color: var(--accent);
}

.sub {
  max-width: 60ch;
  color: var(--muted);
}

.ctas {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: var(--space-3) var(--space-5);
  border: 1px solid var(--accent);
  border-radius: var(--radius-pill);
  font-weight: 600;
  text-decoration: none;
  transition:
    transform var(--dur-fast),
    box-shadow var(--dur-base),
    background var(--dur-fast);
}

.btn:hover {
  transform: translateY(-2px);
}

.btn--primary {
  background: var(--accent);
  color: var(--bg);
}

.btn--primary:hover {
  box-shadow: var(--glow-accent);
}

.btn--ghost {
  color: var(--text);
  border-color: var(--border);
}

.btn--ghost:hover {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}

.media {
  position: relative;
  width: 100%;
  max-width: 1100px;
  margin-top: var(--space-6);
}

.stage {
  position: relative;
  aspect-ratio: 16 / 9;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--panel);
  box-shadow: var(--shadow-frame), var(--glow-accent);
  overflow: hidden;
}

.stage video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* border beam: ring-only conic gradient */
.stage::after {
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

.ctl {
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border: 1px solid var(--border);
  background: var(--bg-glass);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  color: var(--text);
  cursor: pointer;
  transition:
    border-color var(--dur-fast),
    background var(--dur-fast);
}

.ctl:hover {
  border-color: var(--accent);
}

.ctl--mute {
  right: var(--space-4);
  bottom: var(--space-4);
  width: 44px;
  height: 44px;
  border-radius: var(--radius-pill);
}

.ctl--play {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-pill);
  font-weight: 600;
}

@media (prefers-reduced-motion: reduce) {
  .pulse {
    animation: none;
  }

  .stage::after {
    animation: none;
    display: none;
  }
}
</style>
