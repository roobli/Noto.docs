<script setup lang="ts">
import { ref, computed } from 'vue'
import { withBase } from 'vitepress'

const mode = ref<'light' | 'dark'>('light')

const src = computed(() =>
  withBase(mode.value === 'light' ? '/images/noto-light.png' : '/images/noto-dark.png'),
)

const caption = computed(() =>
  mode.value === 'light'
    ? 'Editing a document with the file rail open — light theme'
    : 'The same window — dark theme',
)

const alt = computed(() =>
  mode.value === 'light'
    ? 'Noto editing a document, with the file rail open (light theme)'
    : 'Noto in the dark theme',
)
</script>

<template>
  <div class="shot-showcase">
    <div class="shot-tabs" role="tablist" aria-label="Screenshot theme">
      <button
        type="button"
        role="tab"
        class="shot-tab"
        :aria-selected="mode === 'light'"
        :class="{ active: mode === 'light' }"
        @click="mode = 'light'"
      >
        Light
      </button>
      <button
        type="button"
        role="tab"
        class="shot-tab"
        :aria-selected="mode === 'dark'"
        :class="{ active: mode === 'dark' }"
        @click="mode = 'dark'"
      >
        Dark
      </button>
    </div>
    <figure class="shot-frame">
      <img :src="src" :alt="alt" width="1440" height="900" loading="lazy" />
      <figcaption>{{ caption }}</figcaption>
    </figure>
  </div>
</template>
