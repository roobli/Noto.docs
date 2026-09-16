---
layout: home
title: Noto
titleTemplate: Markdown, edited as rendered
hero:
  name: Noto
  text: Markdown, edited as rendered
  tagline: A Markdown editor that edits the rendered document and keeps the file byte for byte. No preview pane. You type into headings, tables, task lists, math and fenced code directly.
  actions:
    - theme: brand
      text: Download 0.0.2-alpha.30
      link: https://github.com/roobli/Noto/releases/tag/v0.0.2-alpha.30
    - theme: alt
      text: Docs
      link: /guide/install
    - theme: alt
      text: GitHub
      link: https://github.com/roobli/Noto
features:
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/></svg>'
    title: Byte-exact save
    details: Blocks you did not touch are written back exactly as found, including line endings and whitespace. Open and save without editing and the file is identical to the byte.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>'
    title: Typora-like habits
    details: Edit the rendered document. Source markers appear while you are in a block and fold away when you leave. Cmd+/ opens whole-note source mode.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M8 12h8"/><path d="M8 16h5"/></svg>'
    title: Vault rail
    details: Open a folder for the workspace tree, outline, quick open, and content search. Recent notes sit in a quiet strip rather than a classic tab bar.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="m16.24 16.24 2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="m16.24 7.76 2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>'
    title: Plugins
    details: Explicit capabilities, two runtimes, and a broker in the main process. Four plugins ship in the build; a template is available for trusted-renderer work.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>'
    title: Remote control
    details: An optional local HTTP API on loopback, token-gated, for scripts and agents on the same machine.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 18v3"/></svg>'
    title: Mac, Windows, Linux
    details: Packaged builds for all three. The current line is 0.0.2-alpha; first-open Gatekeeper and SmartScreen warnings are expected until notarization.
---

<ScreenshotToggle />

## Download

<p class="download-intro">Current useful builds are on the <strong>0.0.2-alpha</strong> line. Prefer the newest tagged alpha:&nbsp;<a href="https://github.com/roobli/Noto/releases/tag/v0.0.2-alpha.30">Noto 0.0.2-alpha.30</a> · <a href="https://github.com/roobli/Noto/releases">all releases</a>.</p>

<div class="download-grid">
  <a class="download-tile" href="https://github.com/roobli/Noto/releases/download/v0.0.2-alpha.30/Noto-0.0.2-alpha.30-macos-arm64.zip">
    <span class="download-tile__platform">macOS</span>
    <span class="download-tile__meta">Apple silicon · .zip</span>
    <span class="download-tile__file">Noto-…-macos-arm64.zip</span>
  </a>
  <a class="download-tile" href="https://github.com/roobli/Noto/releases/download/v0.0.2-alpha.30/NotoSetup-0.0.2-alpha.30.exe">
    <span class="download-tile__platform">Windows</span>
    <span class="download-tile__meta">x64 · installer</span>
    <span class="download-tile__file">NotoSetup-….exe</span>
  </a>
  <a class="download-tile" href="https://github.com/roobli/Noto/releases/download/v0.0.2-alpha.30/noto_0.0.2.alpha.30_amd64-0.0.2-alpha.30.deb">
    <span class="download-tile__platform">Linux</span>
    <span class="download-tile__meta">Debian / Ubuntu · .deb</span>
    <span class="download-tile__file">noto_…_amd64.deb</span>
  </a>
  <a class="download-tile" href="https://github.com/roobli/Noto/releases/download/v0.0.2-alpha.30/noto-0.0.2.alpha.30-1.x86_64-0.0.2-alpha.30.rpm">
    <span class="download-tile__platform">Linux</span>
    <span class="download-tile__meta">Fedora / openSUSE · .rpm</span>
    <span class="download-tile__file">noto-….rpm</span>
  </a>
</div>

<p class="note-quiet">Until Apple notarization and a Windows code-signing certificate ship, each OS warns once on a fresh download. That is expected — not a broken build. See <a href="./guide/install">Install</a>.</p>

macOS one-liner after unzip (from the folder that contains `Noto.app`):

```sh
xattr -cr Noto.app && open Noto.app
```

Or Right-click → Open the first time.

## Links

<ul class="links-quiet">
  <li><a href="./guide/install">Install</a> · <a href="./guide/using">Using Noto</a> · <a href="./guide/plugins">Plugins</a> · <a href="./guide/theming">Theming</a> · <a href="./guide/remote-control">Remote control</a></li>
  <li><a href="https://github.com/roobli/Noto">Source repository</a></li>
  <li><a href="https://github.com/roobli/noto-plugin-template">Plugin template</a></li>
  <li><a href="https://github.com/roobli/Noto/releases">Releases</a></li>
</ul>

<p class="home-closing">Noto is usable and under active development. It is exercised most on macOS; Windows and Linux are proven by packaged automated tests. License: AGPL-3.0-only.</p>
