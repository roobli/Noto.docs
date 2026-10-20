<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useData, withBase } from 'vitepress'

type Mode = 'light' | 'dark'
type Lang = 'en' | 'zh'

const mode = ref<Mode>('light')
const lang = ref<Lang>('en')

// Show the screenshot in the reader's own appearance until they pick one.
// SSR renders light; the client corrects it after hydration.
const { isDark } = useData()
let chosen = false
onMounted(() => {
  mode.value = isDark.value ? 'dark' : 'light'
})
watch(isDark, (dark) => {
  if (!chosen) mode.value = dark ? 'dark' : 'light'
})
function pickMode(option: Mode) {
  chosen = true
  mode.value = option
}

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
    <!-- Two independent choices, so two groups of toggle buttons (aria-pressed),
         not tabs: nothing here owns a tab panel. -->
    <div class="shot-controls">
      <div class="shot-seg" role="group" aria-label="Screenshot theme">
        <button
          v-for="option in (['light', 'dark'] as const)"
          :key="option"
          type="button"
          class="shot-seg__btn"
          :aria-pressed="mode === option"
          @click="pickMode(option)"
        >
          {{ option === 'light' ? 'Light' : 'Dark' }}
        </button>
      </div>
      <div class="shot-seg" role="group" aria-label="Screenshot language">
        <button
          v-for="option in (['en', 'zh'] as const)"
          :key="option"
          type="button"
          class="shot-seg__btn"
          :aria-pressed="lang === option"
          :lang="option === 'zh' ? 'zh-Hans' : undefined"
          @click="lang = option"
        >
          {{ option === 'en' ? 'English' : '中文' }}
        </button>
      </div>
    </div>
    <figure class="shot-frame">
      <img :src="src" :alt="alt" width="2560" height="1600" loading="lazy" decoding="async" />
      <figcaption>{{ caption }}</figcaption>
    </figure>
  </div>
</template>
