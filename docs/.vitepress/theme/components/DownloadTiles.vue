<script setup lang="ts">
import { data } from '../releases.data'
</script>

<template>
  <div class="download-block">
    <template v-if="data.ok && data.newest">
      <p class="download-intro">
        Newest build:
        <a :href="data.newest.url"><strong>Noto {{ data.newest.version }}</strong></a>
        <span v-if="data.newest.published">, {{ data.newest.published }}</span>.
        <span v-if="data.newest.prerelease">
          It is an alpha, a test build. The first release outside alpha will be 0.1.0.
        </span>
        <a :href="data.releasesUrl">All releases</a>.
      </p>
      <div v-if="data.newest.downloads.length" class="download-grid">
        <a
          v-for="download in data.newest.downloads"
          :key="download.file"
          class="download-tile"
          :href="download.url"
        >
          <span class="download-tile__platform">{{ download.platform }}</span>
          <span class="download-tile__meta">{{ download.meta }}</span>
          <span class="download-tile__file">{{ download.file }}</span>
        </a>
      </div>
    </template>
    <p v-else class="download-intro">
      Builds for macOS, Windows and Linux are on the
      <a :href="data.releasesUrl">releases page</a>.
    </p>
  </div>
</template>
