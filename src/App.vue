<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import HeroSection from './components/sections/HeroSection.vue'
import ContrastSection from './components/sections/ContrastSection.vue'
import ShowcaseSection from './components/sections/ShowcaseSection.vue'
import FeatureGrid from './components/sections/FeatureGrid.vue'
import ArchitectureSection from './components/sections/ArchitectureSection.vue'
import InstallSection from './components/sections/InstallSection.vue'
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <ContrastSection />
    <ShowcaseSection />
    <FeatureGrid />
    <ArchitectureSection />
    <InstallSection />
  </main>
  <footer class="footer">
    <div class="container badges">
      <a href="https://app.aikido.dev/audit-report/external/z9VMCttsWK8LgnbefX4g0b9B/request" target="_blank" rel="noopener">
        <img src="https://app.aikido.dev/assets/badges/label-only-dark-theme.svg" alt="Aikido Security Audit Report" height="40" />
      </a>
      <a href="https://sonarcloud.io/summary/new_code?id=HomelabDocs_HomelabDocs" target="_blank" rel="noopener">
        <img src="https://sonarcloud.io/images/project_badges/sonarcloud-dark.svg" alt="SonarQube Cloud" height="40" />
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-block: var(--space-6);
  border-top: 1px solid var(--border);
}

.badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: var(--space-4);
}
</style>
