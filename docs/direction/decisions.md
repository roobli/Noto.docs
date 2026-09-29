---
title: Decisions
description: What has been decided about Noto's direction, when, and what is still open.
---

# Decisions

A decision is recorded here when it is made, with its date and where it
happened. An open question stays open until someone with the authority to
answer it does. Recommendations are the reviewer's; they are not decisions.

## Decided {#decided}

| Date | Decision | Where |
| --- | --- | --- |
| 2026-09-27 | `@roobli/md` is Noto's default Markdown engine. `NOTO_MARKDOWN_ENGINE=micromark` remains as an escape hatch. | [Noto#282](https://github.com/roobli/Noto/pull/282), shipped in `v0.0.2-alpha.112` |
| 2026-09 | Leaving alpha requires two gates: `@roobli/md` on by default, and macOS notarization. Release readiness is signed off by the maintainer who owns it, not declared by whoever cuts the tag. Extended by D2. | Maintainers |
| 2026-09 | Nested emphasis is capped at thirty-seven levels on purpose. No release exists only to raise the cap. | Maintainers; `MAX_MARK_NEST` in `src/shared/markdown/v3/pm/from-engine.ts` |
| 2026-09 | Public work lives in the roobli organization. No private note content is ever published; fixtures are synthetic. | Maintainers |
| 2026-09-29 | Remove private-vault material from every public tree: design records, test data, local paths, screenshots. | Owner; [Noto#289](https://github.com/roobli/Noto/pull/289), [md#21](https://github.com/roobli/md/pull/21), [holt#3](https://github.com/roobli/holt/pull/3), [canvas#1](https://github.com/roobli/canvas/pull/1) |
| 2026-09-29 | **D1.** Repair the Stable channel now. A version with a prerelease component is a prerelease whatever GitHub says; the release workflow creates and corrects releases from the tag; existing releases are re-flagged. | Owner; [Noto#289](https://github.com/roobli/Noto/pull/289) |
| 2026-09-29 | **D2.** The first non-alpha release requires `@roobli/md` on by default, macOS notarization, a repaired Stable channel, performance numbers measured on the current engine, and a stated Intel Mac position. Windows signing and the rest of [Now](./roadmap#now) may follow in the next release. | Owner |
| 2026-09-29 | **D3.** The first non-alpha version is `0.1.0`. | Owner |
| 2026-09-29 | **D4.** Three release tracks: CI builds on every merge as workflow artifacts; alphas at most weekly, each with written notes, on Testing; releases per milestone, on Stable and Testing. | Owner; [how releases work](./roadmap#releases) |
| 2026-09-29 | **D5.** The headline is **"Edit the page. Keep the file."**, with "A Markdown editor that edits the rendered document and keeps the file byte for byte" beneath it as the explanation. | Owner |
| 2026-09-29 | **D6.** `@roobli/canvas` is frozen and labelled experimental until Noto decides to host canvas documents. holt stays outside Noto's story and is labelled a personal companion, published as is. `@roobli/md` goes to npm when its contract reaches v1, not before. | Owner |
| 2026-09-29 | **D7.** The Windows signing route is chosen after checking price and eligibility at the time of purchase, and recorded here with its reasons. | Owner; choice still to make, see D15 |
| 2026-09-29 | **D8.** Every release builds for Intel Macs as well, and until one does, the pages say so. Refined the same day: a separate Intel zip cross-built on the Apple silicon runner rather than a universal binary, since it is half the download and the updater feed already chooses by architecture. | Owner; [Noto#289](https://github.com/roobli/Noto/pull/289), [Noto#291](https://github.com/roobli/Noto/pull/291) |
| 2026-09-29 | **D9.** English is the working language of every repository. User guides on this site get Chinese translations once the English is stable. A repository whose README is in another language opens with an English summary. | Owner |
| 2026-09-29 | **D10.** This site's prose and images are CC BY 4.0; its code is MIT. | Owner; [`LICENSE`](https://github.com/roobli/Noto.docs/blob/main/LICENSE) |
| 2026-09-29 | **D11.** Saving automatically stays off by default for `0.1.0`, and is reconsidered once the cost of saving a very large file is bounded. | Owner |
| 2026-09-29 | **D12.** The micromark escape hatch is removed after two releases on Stable in which no reported fidelity problem needed it, with the golden corpus green on the default engine throughout. | Owner |
| 2026-09-29 | **D13.** The web track runs as planned: W0 and the groundwork now, W1 and W2 after `0.1.0`. W3, Noto for the web as a product surface, is decided after W2 has been used. | Owner; [Noto on the web](./roadmap#web) |
| 2026-09-29 | **D14.** The editor core stays AGPL-3.0-only, including on the web. `@roobli/md` stays MIT as the layer meant for other hosts. Revisit only if a real embedder appears. | Owner |
| 2026-09-29 | Purge the private material from git history as well as from the current trees, and ask GitHub to drop cached views of the old commits. | Owner |

## Open {#open}

### D15. Windows signing route

Per D7: price a cloud signing service, an open-source signing programme, and a
certificate on a hardware token at the time of purchase, then record the choice
and its reasons here.

### D16. Code of conduct contact

The organization's code of conduct needs a reporting contact, an address or a
named maintainer, before it can be published.
