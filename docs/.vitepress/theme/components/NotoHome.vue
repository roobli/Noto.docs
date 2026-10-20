<script setup lang="ts">
// Replaces VitePress's VPHome (aliased in config.ts) only to give the home
// page real landmarks: <main> for the page, a labelled <section> for the
// feature index. Hero, features and content are VitePress's own components,
// so index.md frontmatter keeps driving the page unchanged.
import VPHomeHero from 'vitepress/dist/client/theme-default/components/VPHomeHero.vue'
import VPHomeFeatures from 'vitepress/dist/client/theme-default/components/VPHomeFeatures.vue'
import VPHomeContent from 'vitepress/dist/client/theme-default/components/VPHomeContent.vue'
import { useData } from 'vitepress'

const { frontmatter, theme } = useData()
</script>

<template>
  <main
    class="VPHome"
    :class="{ 'external-link-icon-enabled': theme.externalLinkIcon }"
  >
    <slot name="home-hero-before" />
    <VPHomeHero>
      <template #home-hero-info-before><slot name="home-hero-info-before" /></template>
      <template #home-hero-info><slot name="home-hero-info" /></template>
      <template #home-hero-info-after><slot name="home-hero-info-after" /></template>
      <template #home-hero-actions-after><slot name="home-hero-actions-after" /></template>
      <template #home-hero-image><slot name="home-hero-image" /></template>
    </VPHomeHero>
    <slot name="home-hero-after" />

    <slot name="home-features-before" />
    <section v-if="frontmatter.features" class="NotoHomeFeatures" aria-label="What Noto does">
      <VPHomeFeatures />
    </section>
    <slot name="home-features-after" />

    <section class="NotoHomeContent" aria-label="Screenshots and downloads">
      <VPHomeContent v-if="frontmatter.markdownStyles !== false">
        <Content />
      </VPHomeContent>
      <Content v-else />
    </section>
  </main>
</template>
