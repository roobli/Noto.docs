# Noto.docs

This repository **is** the public product and documentation site for
[Noto](https://github.com/roobli/Noto).

**Live:** https://roobli.github.io/Noto.docs/

It is a [VitePress](https://vitepress.dev/) site with:

- a product home at `/` (pitch, screenshots, download links)
- user-facing docs under `/guide/` (install, using, plugins, theming, remote control)
- an **engine preview** at `/guide/engine-preview` that dogfoods
  [`@roobli/md`](https://github.com/roobli/md) in the browser

No private vault or RooB content belongs here. Long-form engineering notes may
still live under `roobli/Noto/docs`; this site is the public hub.

## Dogfood path (`@roobli/md`)

Noto’s markdown core is MIT-licensed as `@roobli/md`. This site depends on it
(`github:roobli/md#v0.1.8`) and renders guide demos with a small Vue helper
(`RoobliMdView`): `parseBlocks` → read-only HTML.

That is the **自举** path toward browser-compatible notes/docs using the same
engine Noto ships. It is **not** the full Electron app in the browser — no
ProseMirror shell, vault FS, or save path here. Those stay in desktop Noto.

See [Engine preview](https://roobli.github.io/Noto.docs/guide/engine-preview)
for what is live vs stubbed.

## Develop locally

Requires Node 22+ and pnpm 11+.

```sh
pnpm install
pnpm docs:dev
```

Build the static site (output in `docs/.vitepress/dist`):

```sh
pnpm docs:build
```

Preview the production build:

```sh
pnpm docs:preview
```

`base` is set to `/Noto.docs/` for GitHub project Pages.

## Deploy

GitHub Actions builds on every push to `main` and publishes the VitePress
`dist` to the `gh-pages` branch (`peaceiris/actions-gh-pages`).

Pages settings: **Deploy from a branch** → `gh-pages` / `/` (not the old
`main` `/docs` folder).
