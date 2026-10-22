<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useData, withBase } from 'vitepress'

type Mode = 'light' | 'dark'
type Lang = 'en' | 'zh'

// null = follow the site's appearance. Both appearances are in the markup and
// CSS shows the one matching `.dark`, so the right image is there from the
// first paint, with no swap after hydration.
const mode = ref<Mode | null>(null)
const lang = ref<Lang>('en')

const fileFor = (m: Mode, width?: 768 | 1280) =>
  withBase(`/images/noto-${m}${lang.value === 'zh' ? '-zh' : ''}${width ? `-${width}` : ''}.png`)
const srcFor = (m: Mode) => fileFor(m)
const srcsetFor = (m: Mode) =>
  `${fileFor(m, 768)} 768w, ${fileFor(m, 1280)} 1280w, ${fileFor(m)} 2560w`
const altFor = (m: Mode) =>
  `Noto editing ${lang.value === 'zh' ? 'a Chinese' : 'an English'} note with the file rail open, ${m} theme`

const caption = computed(() => {
  const note = lang.value === 'zh' ? 'A Chinese note' : 'A note'
  return `${note} with a callout, a table, inline math, a fenced block and a task list`
})

// aria-pressed is set only after hydration, when the site appearance is known.
const { isDark } = useData()
const mounted = ref(false)
onMounted(() => (mounted.value = true))
const shownMode = computed<Mode>(() => mode.value ?? (isDark.value ? 'dark' : 'light'))
function pressed(option: Mode) {
  if (!mounted.value) return undefined
  const shown = mode.value ?? (isDark.value ? 'dark' : 'light')
  return shown === option ? 'true' : 'false'
}
</script>

<template>
  <figure class="shot-frame" :data-mode="mode ?? 'auto'">
    <!-- Switches only the demo image, so it is labelled and sits inside the frame. -->
    <div class="shot-bar">
      <span class="shot-bar__label" aria-hidden="true">Preview</span>
      <div class="shot-seg" role="group" aria-label="Preview theme">
        <button
          v-for="option in (['light', 'dark'] as const)"
          :key="option"
          type="button"
          class="shot-seg__btn"
          :class="`shot-seg__btn--${option}`"
          :aria-pressed="pressed(option)"
          @click="mode = option"
        >
          {{ option === 'light' ? 'Light' : 'Dark' }}
        </button>
      </div>
      <div class="shot-seg" role="group" aria-label="Preview language">
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
    <div class="shot-media">
      <img
        v-for="m in (['light', 'dark'] as const)"
        :key="m"
        class="shot-img"
        :class="`shot-img--${m}`"
        :src="srcFor(m)"
        :srcset="srcsetFor(m)"
        sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1200px) 80vw, 900px"
        :alt="altFor(m)"
        width="2560"
        height="1600"
        :loading="m === shownMode ? 'eager' : 'lazy'"
        :fetchpriority="m === shownMode ? 'high' : 'auto'"
        decoding="async"
      />
    </div>
    <figcaption>{{ caption }}</figcaption>
  </figure>
</template>
