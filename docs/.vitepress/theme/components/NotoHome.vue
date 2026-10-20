<script setup lang="ts">
// Replaces VitePress's VPHome (aliased in config.ts). index.md frontmatter
// still drives the hero and the feature list; this component only decides
// the order and the structure:
//   eyebrow (release facts) → hero → product preview → features → content
// with real landmarks and one heading outline (features are h3 under a
// visually hidden h2, not h2 siblings of Download).
import { computed } from 'vue'
import VPHomeHero from 'vitepress/dist/client/theme-default/components/VPHomeHero.vue'
import VPHomeContent from 'vitepress/dist/client/theme-default/components/VPHomeContent.vue'
import { useData } from 'vitepress'
import ScreenshotToggle from './ScreenshotToggle.vue'
import { data as releases } from '../releases.data'

interface Feature {
  title: string
  details?: string
}

const { frontmatter, theme } = useData()

const features = computed<Feature[]>(() => frontmatter.value.features ?? [])

// Release facts come from GitHub Releases at build time; the license is the
// one fact that does not, so it is the only literal here.
const LICENSE = 'AGPL-3.0'
const eyebrow = computed(() => {
  const parts: string[] = []
  const newest = releases.newest
  if (newest) parts.push(`v${newest.version}`)
  const platforms = newest
    ? [...new Set(newest.downloads.map((d) => (d.platform === 'macOS' ? 'Mac' : d.platform)))]
    : []
  parts.push((platforms.length ? platforms : ['Mac', 'Windows', 'Linux']).join(' / '))
  parts.push(LICENSE)
  return parts
})
</script>

<template>
  <main
    class="VPHome"
    :class="{ 'external-link-icon-enabled': theme.externalLinkIcon }"
  >
    <slot name="home-hero-before" />
    <VPHomeHero>
      <template #home-hero-info-before>
        <p class="hero-eyebrow">
          <template v-for="(part, i) in eyebrow" :key="part">
            <span v-if="i" class="hero-eyebrow__sep" aria-hidden="true">·</span>
            <span>{{ part }}</span>
          </template>
        </p>
        <slot name="home-hero-info-before" />
      </template>
      <template #home-hero-info><slot name="home-hero-info" /></template>
      <template #home-hero-info-after><slot name="home-hero-info-after" /></template>
      <template #home-hero-actions-after><slot name="home-hero-actions-after" /></template>
      <template #home-hero-image><slot name="home-hero-image" /></template>
    </VPHomeHero>
    <slot name="home-hero-after" />

    <section v-if="frontmatter.preview !== false" class="home-preview" aria-label="Product preview">
      <ScreenshotToggle />
    </section>

    <slot name="home-features-before" />
    <section v-if="features.length" class="home-features" aria-labelledby="what-noto-does">
      <h2 id="what-noto-does" class="visually-hidden">What Noto does</h2>
      <ul class="home-features__list">
        <li v-for="feature in features" :key="feature.title" class="home-feature">
          <h3 class="home-feature__title" v-html="feature.title" />
          <p v-if="feature.details" class="home-feature__details" v-html="feature.details" />
        </li>
      </ul>
    </section>
    <slot name="home-features-after" />

    <VPHomeContent v-if="frontmatter.markdownStyles !== false">
      <Content />
    </VPHomeContent>
    <Content v-else />
  </main>
</template>
