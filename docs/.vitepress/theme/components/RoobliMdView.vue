<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { parseBlocks, type BlockKind } from '@roobli/md'
import { spansToHtml } from '../lib/blockHtml'

const props = withDefaults(
  defineProps<{
    /** Markdown source. Prefer this over the default slot for clarity. */
    source?: string
    /** Show a compact kind tally under the paper. */
    showMeta?: boolean
    /** Optional caption above the paper. */
    caption?: string
  }>(),
  {
    source: '',
    showMeta: true,
    caption: 'Rendered with @roobli/md',
  },
)

const slots = useSlots()

const markdown = computed(() => {
  if (props.source.trim()) return props.source
  const nodes = slots.default?.()
  if (!nodes?.length) return ''
  return nodes
    .map((n) => {
      if (typeof n.children === 'string') return n.children
      return ''
    })
    .join('')
})

const split = computed(() => parseBlocks(markdown.value))

const html = computed(() => spansToHtml(split.value.spans))

const kindCounts = computed(() => {
  const counts = new Map<BlockKind, number>()
  for (const span of split.value.spans) {
    counts.set(span.kind, (counts.get(span.kind) ?? 0) + 1)
  }
  return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]))
})
</script>

<template>
  <div class="rmd-view">
    <div v-if="caption" class="rmd-caption">{{ caption }}</div>
    <article class="rmd-paper" v-html="html" />
    <footer v-if="showMeta" class="rmd-meta">
      <span class="rmd-meta-label">{{ split.spans.length }} blocks</span>
      <span
        v-for="[kind, n] in kindCounts"
        :key="kind"
        class="rmd-chip"
      >{{ kind }}{{ n > 1 ? ` ×${n}` : '' }}</span>
    </footer>
  </div>
</template>
