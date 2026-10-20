import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Noto',
  description:
    'A Markdown editor that edits the rendered document and keeps the file byte for byte.',
  base: '/Noto.docs/',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', href: '/Noto.docs/favicon.svg', type: 'image/svg+xml' }],
    // System fonts only: no web-font request, no layout shift, native CJK.
    ['meta', { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#f7f8fa' }],
    ['meta', { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#111316' }],
  ],

  // The CD light-document mode owns tokens, type, geometry and motion.
  transformHtml: (html) => html.replace('<body>', '<body data-cd-mode="light-document">'),

  vite: {
    resolve: {
      alias: [
        {
          // Home page landmarks; see the component for why.
          find: /^.*\/VPHome\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/NotoHome.vue', import.meta.url)),
        },
      ],
    },
  },

  markdown: {
    // GitHub's current palettes: every token clears 4.5:1 on the code panel.
    theme: { light: 'github-light-default', dark: 'github-dark-default' },
    config(md) {
      // Wrap every table in a frame that scrolls sideways instead of
      // clipping.
      md.renderer.rules.table_open = (tokens, idx, options, _env, self) => {
        // Measure the text in each column so the column carrying the prose
        // gets the room, instead of whichever cell holds the longest path.
        const lengths: number[][] = []
        let column = -1
        let end = idx + 1
        for (; end < tokens.length && tokens[end].type !== 'table_close'; end++) {
          const token = tokens[end]
          if (token.type === 'tr_open') column = -1
          if (token.type === 'th_open' || token.type === 'td_open') column++
          if (token.type === 'inline' && column >= 0 && tokens[end - 1].type === 'td_open') {
            ;(lengths[column] ??= []).push(token.content.length)
          }
        }
        const columns = tokens
          .slice(idx, end)
          .filter((token) => token.type === 'th_open').length
        const weights = Array.from({ length: columns }, (_, i) => {
          const cells = lengths[i] ?? []
          const mean = cells.reduce((sum, n) => sum + n, 0) / Math.max(cells.length, 1)
          return Math.max(mean, 4) ** 0.7
        })
        const total = weights.reduce((sum, w) => sum + w, 0)
        const colgroup =
          columns > 1
            ? '<colgroup>' +
              weights.map((w) => `<col style="width:${((w / total) * 100).toFixed(1)}%">`).join('') +
              '</colgroup>'
            : ''
        // Only frames for tables of three or more columns, the ones that can
        // overflow, become keyboard-focusable scroll regions.
        const headers = tokens
          .slice(idx, end)
          .filter((token, i, all) => token.type === 'inline' && all[i - 1]?.type === 'th_open')
          .map((token) => token.content.replace(/[`*_"<>]/g, '').trim())
          .filter(Boolean)
        const label = `Table: ${headers.join(', ')}`
        const focus =
          columns >= 3 ? ` tabindex="0" role="region" aria-label="${md.utils.escapeHtml(label)}"` : ''
        return `<div class="table-scroll"${focus}>` + self.renderToken(tokens, idx, options) + colgroup
      }
      md.renderer.rules.table_close = (tokens, idx, options, _env, self) =>
        self.renderToken(tokens, idx, options) + '</div>'
    },
  },

  themeConfig: {
    siteTitle: 'Noto',
    logo: false,

    nav: [
      { text: 'Product', link: '/' },
      {
        text: 'Docs',
        link: '/guide/install',
        activeMatch: '/guide/',
      },
      {
        text: 'Direction',
        link: '/direction/',
        activeMatch: '/direction/',
      },
      {
        text: 'GitHub',
        link: 'https://github.com/roobli/Noto',
      },
      {
        text: 'Download',
        link: '/download',
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Install', link: '/guide/install' },
            { text: 'Using Noto', link: '/guide/using' },
            { text: 'Plugins', link: '/guide/plugins' },
            { text: 'Theming', link: '/guide/theming' },
            { text: 'Remote control', link: '/guide/remote-control' },
            { text: 'Engine preview', link: '/guide/engine-preview' },
          ],
        },
      ],
      '/direction/': [
        {
          text: 'Direction',
          items: [
            { text: 'Overview', link: '/direction/' },
            { text: 'Principles', link: '/direction/principles' },
            { text: 'Roadmap', link: '/direction/roadmap' },
            { text: 'Open source', link: '/direction/open-source' },
            { text: 'Decisions', link: '/direction/decisions' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/roobli/Noto' },
    ],

    footer: {
      message: 'Noto is AGPL-3.0-only. This site: CC BY 4.0 for prose, MIT for code.',
      copyright:
        'Public product site for <a href="https://github.com/roobli/Noto">roobli/Noto</a>.',
    },

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
    },

    editLink: {
      pattern: 'https://github.com/roobli/Noto.docs/edit/main/docs/:path',
      text: 'Edit this page',
    },
  },
})
