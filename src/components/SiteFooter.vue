<script setup lang="ts">
import { CHANGELOG_URL, LICENSE_URL, REPO_URL } from '../site'
</script>

<template>
  <footer class="footer">
    <div class="container inner">
      <div class="brand">
        <img src="/media/favicon.png" alt="" width="32" height="32" />
        <span>DOME</span>
      </div>
      <p class="tagline">Your entire Docker infrastructure, under one roof.</p>
      <nav class="links" aria-label="Footer">
        <a :href="REPO_URL" target="_blank" rel="noopener">GitHub</a>
        <a :href="CHANGELOG_URL" target="_blank" rel="noopener">Changelog</a>
        <a :href="LICENSE_URL" target="_blank" rel="noopener">License (GPL-3.0)</a>
      </nav>
      <p class="fine">Docker Orchestration &amp; Management Engine · Open source under GPL-3.0</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding-block: var(--space-8);
}

.inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-4);
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-weight: 600;
  letter-spacing: 0.04em;
}

.brand img {
  border-radius: var(--radius-pill);
}

.tagline {
  color: var(--text);
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5);
  font-size: var(--fs-small);
}

.links a {
  color: var(--muted);
  text-decoration: none;
  transition: color var(--dur-fast);
}

.links a:hover {
  color: var(--accent);
}

.fine {
  font-family: var(--font-mono);
  font-size: var(--fs-small);
  color: var(--muted);
}
</style>
