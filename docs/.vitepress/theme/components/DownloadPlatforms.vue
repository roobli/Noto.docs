<script setup lang="ts">
// The newest build's files grouped by operating system: one ruled row per OS,
// its variants inline. The row for the reader's own system is marked after
// hydration; nothing ever downloads on its own.
import { computed, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import type { ReleaseDownload } from '../releases.data'

const props = defineProps<{ downloads: readonly ReleaseDownload[] }>()

type Os = 'macOS' | 'Windows' | 'Linux'
const ORDER: readonly Os[] = ['macOS', 'Windows', 'Linux']

const rows = computed(() =>
  ORDER.map((os) => ({
    os,
    files: props.downloads
      .filter((download) => download.platform === os)
      .map((download) => {
        const [variant, kind] = download.meta.split(' · ')
        return { ...download, variant, kind }
      }),
  })).filter((row) => row.files.length),
)

const yours = ref<Os | null>(null)
onMounted(() => {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } }
  const hint = `${nav.userAgentData?.platform ?? ''} ${nav.platform ?? ''} ${nav.userAgent}`
  // Phones and tablets get no mark: none of these builds runs there.
  if (/Android|iPhone|iPad/i.test(hint)) return
  if (/Mac/i.test(hint)) yours.value = 'macOS'
  else if (/Win/i.test(hint)) yours.value = 'Windows'
  else if (/Linux|X11/i.test(hint)) yours.value = 'Linux'
})

const install = withBase('/guide/install')
</script>

<template>
  <ul class="dl-rows">
    <li
      v-for="row in rows"
      :key="row.os"
      class="dl-row"
      :class="{ 'is-yours': yours === row.os }"
    >
      <div class="dl-row__os">
        <span class="dl-row__name">{{ row.os }}</span>
        <span v-if="yours === row.os" class="dl-row__yours">Your system</span>
      </div>
      <div class="dl-row__body">
        <div class="dl-row__files">
          <a
            v-for="file in row.files"
            :key="file.file"
            class="dl-file"
            :href="file.url"
            :title="file.file"
            :aria-label="`Download ${row.os}, ${file.variant} ${file.kind ?? ''} (${file.file})`"
          >
            <span class="dl-file__variant">{{ file.variant }}</span>
            <span v-if="file.kind" class="dl-file__kind">{{ file.kind }}</span>
          </a>
        </div>
        <p v-if="row.os === 'macOS'" class="dl-row__note">
          Not signed yet. Open Noto once, then choose
          <b>System Settings → Privacy &amp; Security → Open Anyway</b>, or run
          <code>xattr -cr Noto.app</code>. <a :href="install">Install guide</a>
        </p>
        <p v-else-if="row.os === 'Windows'" class="dl-row__note">
          If SmartScreen appears, choose <b>More info → Run anyway</b>.
        </p>
      </div>
    </li>
  </ul>
</template>
