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
`,u=JSON.parse('{"title":"Engine preview","description":"","frontmatter":{},"headers":[],"relativePath":"guide/engine-preview.md","filePath":"guide/engine-preview.md","lastUpdated":1789542331000}'),l={name:"guide/engine-preview.md"},m=Object.assign(l,{setup(c){return(h,e)=>{const t=n("RoobliMdView");return d(),i("div",null,[e[0]||(e[0]=o("",5)),r(t,{source:a(s)},null,8,["source"]),e[1]||(e[1]=o("",8))])}}});export{u as __pageData,m as default};
