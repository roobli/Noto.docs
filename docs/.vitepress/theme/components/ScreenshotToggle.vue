<script setup lang="ts">
import { ref, computed } from 'vue'
import { withBase } from 'vitepress'

type Mode = 'light' | 'dark'
type Lang = 'en' | 'zh'

const mode = ref<Mode>('light')
const lang = ref<Lang>('en')

const src = computed(() =>
  withBase(`/images/noto-${mode.value}${lang.value === 'zh' ? '-zh' : ''}.png`),
)

const caption = computed(() => {
  const note = lang.value === 'zh' ? 'A Chinese note' : 'A note'
  const theme = mode.value === 'light' ? 'light theme' : 'dark theme'
  return `${note} with a callout, a table, inline math, a fenced block and a task list — ${theme}`
})

const alt = computed(
  () =>
    `Noto editing ${lang.value === 'zh' ? 'a Chinese' : 'an English'} note with the file rail open, ${mode.value} theme`,
)
</script>

<template>
  <div class="shot-showcase">
    <div class="shot-tabs" role="tablist" aria-label="Screenshot theme">
      <button
        v-for="option in (['light', 'dark'] as const)"
        :key="option"
        type="button"
        role="tab"
        class="shot-tab"
        :aria-selected="mode === option"
        :class="{ active: mode === option }"
        @click="mode = option"
      >
        {{ option === 'light' ? 'Light' : 'Dark' }}
      </button>
      <span class="shot-tabs__gap" aria-hidden="true" />
      <button
        v-for="option in (['en', 'zh'] as const)"
        :key="option"
        type="button"
        role="tab"
        class="shot-tab"
        :aria-selected="lang === option"
        :class="{ active: lang === option }"
        @click="lang = option"
      >
        {{ option === 'en' ? 'English' : '中文' }}
      </button>
    </div>
    <figure class="shot-frame">
      <img :src="src" :alt="alt" width="2560" height="1600" loading="lazy" />
      <figcaption>{{ caption }}</figcaption>
    </figure>
  </div>
</template>
