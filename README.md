# Noto.docs

This repository **is** the public product and documentation site for
[Noto](https://github.com/roobli/Noto).

**Live:** https://roobli.github.io/Noto.docs/

It is a [VitePress](https://vitepress.dev/) site with:

- a product home at `/` (pitch, screenshots, download links)
- user-facing docs under `/guide/` (install, using, plugins, theming, remote control)

No private vault or RooB content belongs here. Long-form engineering notes may
still live under `roobli/Noto/docs`; this site is the public hub.

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

GitHub Actions builds on every push to `main` and deploys with
`actions/deploy-pages`. Pages is configured for **GitHub Actions** (not the
legacy `/docs` folder on `main`).
