# Engine preview

This page dogfoods Noto’s markdown core — [`@roobli/md`](https://github.com/roobli/md) — inside the public docs site. The goal is **自举**: the docs can show what the engine sees, in the browser, without shipping the full Electron editor shell.

Read-only for now. Parsing uses `parseBlocks` from `@roobli/md` (v0.1.8). Blocks are mapped to simple HTML here; ProseMirror editing stays in the desktop app.

## Live render

The paper below is produced by `RoobliMdView`: source → `@roobli/md` IR → HTML.

<script setup>
import demoSource from '../.vitepress/theme/fixtures/engine-preview-demo.md?raw'
</script>

<RoobliMdView :source="demoSource" />

## What this proves

| Layer | Status on this page |
| --- | --- |
| `parseBlocks` / block kinds | Live — kinds listed under the paper |
| Byte offsets + gaps | Used by the engine; not visualized here |
| Read-only HTML map | Live for common kinds (see below) |
| Inline richness | Pragmatic subset: bold, italic, strike, code, links |
| KaTeX / math typesetting | Stub — display math shown as monospace |
| Raw HTML blocks | Escaped on purpose (no injection of untrusted HTML) |
| ProseMirror / WYSIWYG editing | Not in this site — Electron Noto only |
| Full browser Noto shell | Out of scope for docs dogfood |

## Block kinds mapped

Rendered when the engine emits them:

- `heading`, `paragraph`
- `bullet-list`, `ordered-list`, `task-list`
- `quote`, `fenced-code`, `indented-code`
- `table`, `thematic-break`
- `frontmatter` (shown as a muted fence)
- `display-math` (source only — no KaTeX yet)
- `html`, `link-definition`, `footnote-definition` (escaped / muted)

Nested list structure, callout variants, wiki links, footnotes as footnotes, and CJK emphasis edge cases are **not** fully mirrored in this HTML mapper. The engine still parses them; this view is an honest, restrained dogfood — not a second editor.

## Why docs, not Electron-in-browser

The product home and guide stay VitePress. This page is the living demo of the shared core so contributors can see IR → view without opening a desktop build. The editor chrome, vault FS, and save path remain in Noto proper.
