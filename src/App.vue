<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
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
  <SiteFooter />
</template>
