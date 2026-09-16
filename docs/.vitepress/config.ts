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
    ['meta', { name: 'theme-color', content: '#fafaf8' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&display=swap',
      },
    ],
  ],

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
        text: 'GitHub',
        link: 'https://github.com/roobli/Noto',
      },
      {
        text: 'Download',
        link: 'https://github.com/roobli/Noto/releases/tag/v0.0.2-alpha.30',
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
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/roobli/Noto' },
    ],

    footer: {
      message: 'Noto is AGPL-3.0-only.',
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
