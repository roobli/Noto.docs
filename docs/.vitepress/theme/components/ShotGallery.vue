<script setup lang="ts">
import { withBase } from 'vitepress'

interface Shot {
  file: string
  alt: string
  caption: string
}

// Static captures from the packaged build. Kept in one place so the image
// path goes through withBase and survives a change of site base.
const shots: readonly Shot[] = [
  {
    file: 'tour-quick-open.png',
    alt: 'Quick open over the file rail with three cache notes in the results',
    caption: 'Quick open finds a note by name, folder or path, and remembers the query per scope.',
  },
  {
    file: 'tour-command-palette.png',
    alt: 'The command palette listing export formats over a cache sizing note',
    caption: 'The command palette carries the menu, including export to PDF, Word, HTML, EPUB and LaTeX.',
  },
  {
    file: 'tour-outline.png',
    alt: 'The outline in the rail beside a cache sizing note',
    caption: 'The rail can become the outline; the heading you are in stays marked.',
  },
  {
    file: 'tour-find.png',
    alt: 'The find bar over a cache sizing note, with Cache highlighted and 1 of 5 matches',
    caption: 'Find and replace walks the rendered note and counts matches as you type.',
  },
  {
    file: 'tour-source.png',
    alt: 'The cache sizing note shown as Markdown source beside the file rail',
    caption: 'Whole-note source mode shows the Markdown behind the page without opening a second view.',
  },
  {
    file: 'tour-settings.png',
    alt: 'The Appearance settings panel with theme, text size, page width and custom stylesheet',
    caption: 'Theme, text size, page width and a custom stylesheet apply as you change them.',
  },
]
</script>

<template>
  <div class="shot-gallery">
    <figure v-for="shot in shots" :key="shot.file">
      <a :href="withBase(`/images/${shot.file}`)" target="_blank" rel="noreferrer">
        <img
          :src="withBase(`/images/${shot.file}`)"
          :alt="shot.alt"
          width="1280"
          height="800"
          loading="lazy"
          decoding="async"
        >
      </a>
      <figcaption>{{ shot.caption }}</figcaption>
    </figure>
  </div>
</template>
