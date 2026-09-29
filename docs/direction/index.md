---
title: Direction
description: What Noto is for, who it serves, and how the projects around it relate.
---

# Direction

::: info Proposal, under discussion
Drafted 2026-09-29 from a review of every public roobli repository. Nothing on
these pages is decided until it appears under **Decided** in the
[decision log](./decisions). Facts are as of Noto `v0.0.2-alpha.113` and
`@roobli/md` `v0.1.19`.
:::

This section is where the project writes down what it is trying to be, so that
each change can be checked against something other than momentum.

- **Direction** (this page): the problem, the positioning, the audience, and
  the product line.
- [Principles](./principles): the rules a change is judged by, and a pass over
  the current interface against them.
- [Roadmap](./roadmap): three horizons, the gate between each, how releases
  work, and what Noto will not build.
- [Open source](./open-source): the standard for documents, templates and
  contribution across every roobli repository, and where each one stands.
- [Decisions](./decisions): questions that need an owner's answer, and the
  answers once given.

## The problem

Markdown won. It is the format of READMEs, documentation sites, personal
knowledge bases, static blogs, and, increasingly, the instructions people and
software agents hand each other. The same file is opened by a person in an
editor, by `git diff`, by a site generator, and by a program editing it on
someone's behalf.

Every rich Markdown editor makes the same choice. Either it shows the rendered
page and writes the file back through its own serializer, so opening and saving
a note changes list markers, emphasis style, table padding and whitespace you
never touched. Or it keeps the file exact by showing you the source, decorated.
The first is pleasant to write in and noisy to live with. The second is honest
and makes you edit syntax.

## What Noto is

**Edit the page. Keep the file.**

Noto is a desktop editor for Markdown files you intend to keep. You type into
the rendered document: headings, tables, task lists, math, fenced code. When you
save, every block you did not touch is written back byte for byte and only the
blocks you changed are serialized. A note opened and saved without edits is
identical to the byte; an edit shows up in `git diff` as exactly that edit.

That property is not a feature added to an editor. It is the architecture.
`@roobli/md` splits a file into blocks with exact byte spans and the gaps
between them; Noto keeps each block's original source beside its rendered
form; the save path writes back recorded bytes for everything still pristine.
It is also the one thing about Noto that is hard to copy, which is why it sits
at the center of the positioning and why everything else is measured against
it.

### Where that places it

| | Rendered editing | Untouched bytes survive a save | Very large files |
| --- | --- | --- | --- |
| Round-trip editors (Typora and most rich Markdown editors) | Yes | No: the whole file passes through a serializer | Typora did not load Noto's 2 MB corpus file in three minutes |
| Decorated-source editors (live-preview modes, iA Writer, code editors) | Partly: you still edit the syntax | Yes, by construction | Not measured here |
| **Noto** | **Yes** | **Yes, per block** | **Opens 2 MB and 8 MB files; mid-size open time still behind** |

That table is the pitch. Noto should win the first two columns outright and
stay honest about the third. It does not need to win anything else.

## Who it is for

Noto was built for one person: a vault of about seven thousand notes, mostly
Chinese with English identifiers, six folders deep, in daily use. That origin
is a strength. Every decision in
[the chrome record](https://github.com/roobli/Noto/blob/main/docs/design/chrome.md)
was tested against real hours rather than imagined ones. A public product has
to generalize that origin without diluting it. Three people, in order:

1. **The long-lived vault keeper.** Thousands of notes, years old, often in
   git, often mixed-script. Wants a writing surface that will never quietly
   rewrite the archive and stays fast as the archive grows.
2. **The docs-in-repo writer.** An engineer or technical writer editing READMEs
   and documentation inside repositories. Wants rendered editing without a
   review full of whitespace noise.
3. **The Typora émigré.** Likes how Typora writes; wants the same feel in
   something open source that also opens the big files.

Not for, at least not now: teams editing one note in real time, mobile
capture, databases and block workspaces, publishing platforms. Each is a good
product. None of them is this one.

## The product line

Seven public repositories exist. They are not seven products. The useful model
is the one Apple uses for Safari and WebKit: one product people use, one
platform that makes it possible, and everything else either serves those two
or waits its turn.

| Repository | Role | License | Maturity | Proposed stance |
| --- | --- | --- | --- | --- |
| [Noto](https://github.com/roobli/Noto) | The product | AGPL-3.0-only | `0.0.2-alpha` | All roadmap focus. |
| [@roobli/md](https://github.com/roobli/md) | The platform: Noto's engine | MIT | `0.1.x`, consumed by git tag | A library with a contract: changelog, API reference, semver, npm once the contract settles. |
| [Noto.docs](https://github.com/roobli/Noto.docs) | The front door | None yet | Live, facts stale | The single source of truth for users. Version facts generated, not typed. |
| [noto-plugin-template](https://github.com/roobli/noto-plugin-template) | Future ecosystem | MIT | Scaffold for a door not yet open | Keep, clearly labelled, until user-installed plugins ship. |
| [@roobli/canvas](https://github.com/roobli/canvas) | Experiment | MIT | v0, no host | Freeze and label experimental until Noto decides to host canvas documents. |
| [holt](https://github.com/roobli/holt) | Separate companion | MIT | `0.0.1`, unpublished | Outside Noto's story. Decide whether it is a product or a published personal tool. |
| [.github](https://github.com/roobli/.github) | Organization profile and defaults | None | Minimal | Home of the shared contributing, security, conduct and issue-template defaults. |

The boundary that matters most is between Noto and `@roobli/md`. The engine
knows nothing about ProseMirror, windows or vaults, and it should be good
enough that a host which is not Noto can depend on it; this site already does,
in the [engine preview](../guide/engine-preview). Keeping that boundary clean is
what later lets Noto change its editor layer, offer a read-only web reader, or
let other tools share its fidelity guarantee, without a rewrite.
