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
  - title: Byte-exact save
    details: Blocks you did not touch are written back exactly as found, including line endings and whitespace. Open and save without editing and the file is identical to the byte.
  - title: Typora-like habits
    details: Edit the rendered document. Source markers appear while you are in a block and fold away when you leave. Cmd+/ opens whole-note source mode.
  - title: Vault rail
    details: Open a folder for the workspace tree, outline, quick open, and content search. Recent notes sit in a quiet strip rather than a classic tab bar.
  - title: Plugins
    details: Explicit capabilities, two runtimes, and a broker in the main process. Four plugins ship in the build; a template is available for trusted-renderer work.
  - title: Remote control
    details: An optional local HTTP API on loopback, token-gated, for scripts and agents on the same machine.
  - title: Mac, Windows, Linux
    details: Packaged builds for all three. The current line is 0.0.2-alpha; first-open Gatekeeper and SmartScreen warnings are expected until notarization.
---

<div class="screenshot-frame">

![Noto editing a document, with the file rail open (light theme)](/images/noto-light.png)

</div>

<details>
<summary>The same window in the dark theme</summary>

<div class="screenshot-frame">

![Noto in the dark theme](/images/noto-dark.png)

</div>

</details>

## Download

Current useful builds are on the **0.0.2-alpha** line. Prefer the newest tagged alpha:

**[Noto 0.0.2-alpha.30](https://github.com/roobli/Noto/releases/tag/v0.0.2-alpha.30)** · [all releases](https://github.com/roobli/Noto/releases)

| Platform | Download |
| --- | --- |
| macOS (Apple silicon) | [Noto-…-macos-arm64.zip](https://github.com/roobli/Noto/releases/download/v0.0.2-alpha.30/Noto-0.0.2-alpha.30-macos-arm64.zip) |
| Windows (x64) | [NotoSetup-….exe](https://github.com/roobli/Noto/releases/download/v0.0.2-alpha.30/NotoSetup-0.0.2-alpha.30.exe) |
| Linux (Debian / Ubuntu) | [noto_…_amd64.deb](https://github.com/roobli/Noto/releases/download/v0.0.2-alpha.30/noto_0.0.2.alpha.30_amd64-0.0.2-alpha.30.deb) |
| Linux (Fedora / openSUSE) | [noto-….rpm](https://github.com/roobli/Noto/releases/download/v0.0.2-alpha.30/noto-0.0.2.alpha.30-1.x86_64-0.0.2-alpha.30.rpm) |

<p class="note-quiet">Until Apple notarization and a Windows code-signing certificate ship, each OS warns once on a fresh download. That is expected — not a broken build. See <a href="./guide/install">Install</a>.</p>

macOS one-liner after unzip (from the folder that contains `Noto.app`):

```sh
xattr -cr Noto.app && open Noto.app
```

Or Right-click → Open the first time.

## Links

- [Install](/guide/install) · [Using Noto](/guide/using) · [Plugins](/guide/plugins) · [Theming](/guide/theming) · [Remote control](/guide/remote-control)
- [Source repository](https://github.com/roobli/Noto)
- [Plugin template](https://github.com/roobli/noto-plugin-template)
- [Releases](https://github.com/roobli/Noto/releases)

Noto is usable and under active development. It is exercised most on macOS; Windows and Linux are proven by packaged automated tests. License: AGPL-3.0-only.
