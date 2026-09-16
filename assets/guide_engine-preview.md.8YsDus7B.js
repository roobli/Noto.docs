import{C as n,o as d,c as i,a2 as o,E as r,k as a}from"./chunks/framework.l66uSLlc.js";const s=`---
title: Engine preview
---

# Hello from @roobli/md

A short paragraph with **bold**, *italic*, \`inline code\`, and a [link](https://github.com/roobli/md).

## Lists

- bullet one
- bullet two

1. ordered first
2. ordered second

- [ ] open task
- [x] done task

> A block quote kept as one engine span.

\`\`\`ts
export function greet(name: string) {
  return \`hello, \${name}\`
}
\`\`\`

| Kind | Role |
| --- | --- |
| heading | ATX \`#\`…\`######\` |
| paragraph | runs of prose |
| table | GFM pipe tables |

$$
E = mc^2
$$

---

[md]: https://github.com/roobli/md
`,u=JSON.parse('{"title":"Engine preview","description":"","frontmatter":{},"headers":[],"relativePath":"guide/engine-preview.md","filePath":"guide/engine-preview.md","lastUpdated":1789542331000}'),l={name:"guide/engine-preview.md"},m=Object.assign(l,{setup(c){return(h,e)=>{const t=n("RoobliMdView");return d(),i("div",null,[e[0]||(e[0]=o('<h1 id="engine-preview" tabindex="-1">Engine preview <a class="header-anchor" href="#engine-preview" aria-label="Permalink to &quot;Engine preview&quot;">​</a></h1><p>This page dogfoods Noto’s markdown core — <a href="https://github.com/roobli/md" target="_blank" rel="noreferrer"><code>@roobli/md</code></a> — inside the public docs site. The goal is <strong>自举</strong>: the docs can show what the engine sees, in the browser, without shipping the full Electron editor shell.</p><p>Read-only for now. Parsing uses <code>parseBlocks</code> from <code>@roobli/md</code> (v0.1.8). Blocks are mapped to simple HTML here; ProseMirror editing stays in the desktop app.</p><h2 id="live-render" tabindex="-1">Live render <a class="header-anchor" href="#live-render" aria-label="Permalink to &quot;Live render&quot;">​</a></h2><p>The paper below is produced by <code>RoobliMdView</code>: source → <code>@roobli/md</code> IR → HTML.</p>',5)),r(t,{source:a(s)},null,8,["source"]),e[1]||(e[1]=o('<h2 id="what-this-proves" tabindex="-1">What this proves <a class="header-anchor" href="#what-this-proves" aria-label="Permalink to &quot;What this proves&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Layer</th><th>Status on this page</th></tr></thead><tbody><tr><td><code>parseBlocks</code> / block kinds</td><td>Live — kinds listed under the paper</td></tr><tr><td>Byte offsets + gaps</td><td>Used by the engine; not visualized here</td></tr><tr><td>Read-only HTML map</td><td>Live for common kinds (see below)</td></tr><tr><td>Inline richness</td><td>Pragmatic subset: bold, italic, strike, code, links</td></tr><tr><td>KaTeX / math typesetting</td><td>Stub — display math shown as monospace</td></tr><tr><td>Raw HTML blocks</td><td>Escaped on purpose (no injection of untrusted HTML)</td></tr><tr><td>ProseMirror / WYSIWYG editing</td><td>Not in this site — Electron Noto only</td></tr><tr><td>Full browser Noto shell</td><td>Out of scope for docs dogfood</td></tr></tbody></table><h2 id="block-kinds-mapped" tabindex="-1">Block kinds mapped <a class="header-anchor" href="#block-kinds-mapped" aria-label="Permalink to &quot;Block kinds mapped&quot;">​</a></h2><p>Rendered when the engine emits them:</p><ul><li><code>heading</code>, <code>paragraph</code></li><li><code>bullet-list</code>, <code>ordered-list</code>, <code>task-list</code></li><li><code>quote</code>, <code>fenced-code</code>, <code>indented-code</code></li><li><code>table</code>, <code>thematic-break</code></li><li><code>frontmatter</code> (shown as a muted fence)</li><li><code>display-math</code> (source only — no KaTeX yet)</li><li><code>html</code>, <code>link-definition</code>, <code>footnote-definition</code> (escaped / muted)</li></ul><p>Nested list structure, callout variants, wiki links, footnotes as footnotes, and CJK emphasis edge cases are <strong>not</strong> fully mirrored in this HTML mapper. The engine still parses them; this view is an honest, restrained dogfood — not a second editor.</p><h2 id="why-docs-not-electron-in-browser" tabindex="-1">Why docs, not Electron-in-browser <a class="header-anchor" href="#why-docs-not-electron-in-browser" aria-label="Permalink to &quot;Why docs, not Electron-in-browser&quot;">​</a></h2><p>The product home and guide stay VitePress. This page is the living demo of the shared core so contributors can see IR → view without opening a desktop build. The editor chrome, vault FS, and save path remain in Noto proper.</p>',8))])}}});export{u as __pageData,m as default};
