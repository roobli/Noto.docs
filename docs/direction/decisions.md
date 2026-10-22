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
| 2026-09-27 | `@roobli/md` is Noto's default Markdown engine. `NOTO_MARKDOWN_ENGINE=micromark` remains as an escape hatch. | [Noto#282](https://github.com/roobli/Noto/pull/282), shipped in `v0.0.2-alpha.112`; the escape hatch was removed on 2026-10-17, below |
| 2026-09 | Leaving alpha requires two gates: `@roobli/md` on by default, and macOS notarization. Release readiness is signed off by the maintainer who owns it, not declared by whoever cuts the tag. Extended by D2, which was amended on 2026-10-17. | Maintainers |
| 2026-09 | Nested emphasis is capped at thirty-seven levels on purpose. No release exists only to raise the cap. | Maintainers; `MAX_MARK_NEST` in `src/shared/markdown/v3/pm/from-engine.ts` |
| 2026-09 | Public work lives in the roobli organization. No private note content is ever published; fixtures are synthetic. | Maintainers |
| 2026-09-29 | Remove private-vault material from every public tree: design records, test data, local paths, screenshots. | Owner; [Noto#289](https://github.com/roobli/Noto/pull/289), [md#21](https://github.com/roobli/md/pull/21), [holt#3](https://github.com/roobli/holt/pull/3), [canvas#1](https://github.com/roobli/canvas/pull/1) |
| 2026-09-29 | **D1.** Repair the Stable channel now. A version with a prerelease component is a prerelease whatever GitHub says; the release workflow creates and corrects releases from the tag; existing releases are re-flagged. | Owner; [Noto#289](https://github.com/roobli/Noto/pull/289) |
| 2026-09-29 | **D2.** The first non-alpha release requires `@roobli/md` on by default, macOS notarization, a repaired Stable channel, performance numbers measured on the current engine, and a stated Intel Mac position. Windows signing and the rest of [Now](./roadmap#now) may follow in the next release. Amended on 2026-10-17, below. | Owner |
| 2026-09-29 | **D3.** The first non-alpha version is `0.1.0`. Superseded on 2026-10-17 by the amendment to D2. | Owner |
| 2026-09-29 | **D4.** Three release tracks: CI builds on every merge as workflow artifacts; alphas at most weekly, each with written notes, on Testing; releases per milestone, on Stable and Testing. | Owner; [how releases work](./roadmap#releases) |
| 2026-09-29 | **D5.** The headline is **"Edit the page. Keep the file."**, with "A Markdown editor that edits the rendered document and keeps the file byte for byte" beneath it as the explanation. | Owner |
| 2026-09-29 | **D6.** `@roobli/canvas` is frozen and labelled experimental until Noto decides to host canvas documents. holt stays outside Noto's story and is labelled a personal companion, published as is. `@roobli/md` goes to npm when its contract reaches v1, not before. | Owner |
| 2026-09-29 | **D7.** The Windows signing route is chosen after checking price and eligibility at the time of purchase, and recorded here with its reasons. | Owner; chosen in D15 |
| 2026-09-29 | **D8.** Every release builds for Intel Macs as well, and until one does, the pages say so. Refined the same day: a separate Intel zip cross-built on the Apple silicon runner rather than a universal binary, since it is half the download and the updater feed already chooses by architecture. | Owner; [Noto#289](https://github.com/roobli/Noto/pull/289), [Noto#291](https://github.com/roobli/Noto/pull/291) |
| 2026-09-29 | **D9.** English is the working language of every repository. User guides on this site get Chinese translations once the English is stable. A repository whose README is in another language opens with an English summary. | Owner |
| 2026-09-29 | **D10.** This site's prose and images are CC BY 4.0; its code is MIT. | Owner; [`LICENSE`](https://github.com/roobli/Noto.docs/blob/main/LICENSE) |
| 2026-09-29 | **D11.** Saving automatically stays off by default for the first release outside alpha (`0.0.3`), and is reconsidered once the cost of saving a very large file is bounded. | Owner |
| 2026-09-29 | **D12.** The micromark escape hatch is removed after two releases on Stable in which no reported fidelity problem needed it, with the golden corpus green on the default engine throughout. Overtaken on 2026-10-17, below. | Owner |
| 2026-09-29 | **D13.** The web track runs as planned: W0 and the groundwork now, W1 and W2 after `0.1.0`. W3, Noto for the web as a product surface, is decided after W2 has been used. Gate re-pointed on 2026-10-20, below. | Owner; [Noto on the web](./roadmap#web) |
| 2026-09-29 | **D14.** The editor core stays AGPL-3.0-only, including on the web. `@roobli/md` stays MIT as the layer meant for other hosts. Revisit only if a real embedder appears. | Owner |
| 2026-09-29 | Purge the private material from git history as well as from the current trees, and ask GitHub to drop cached views of the old commits. | Owner |
| 2026-09-29 | **D15.** Windows builds are signed through the [SignPath Foundation](https://signpath.org/) programme for open-source projects: free, the key held in their HSM, signing driven from the release workflow on GitHub Actions. Azure Artifact Signing was ruled out on eligibility, which is limited to individuals in the US and Canada and to businesses in the US, Canada, the EU and the UK. A certificate on a hardware token remains the fallback. | Owner; the application is the next step |
| 2026-10-17 | **D2, amended.** The first release outside alpha is `0.0.3`, and it ships unsigned: ad-hoc signed and not notarized on macOS, not code-signed on Windows, with the first-open steps on the release page. macOS notarization, Windows signing and the repeated Typora comparison move to the first signed release; they are deferred, not dropped. The release workflow allows an unsigned full release only through an explicit flag that warns in the run. Supersedes D3. | Owner; [Noto#328](https://github.com/roobli/Noto/pull/328), [`RELEASING.md`](https://github.com/roobli/Noto/blob/main/RELEASING.md) |
| 2026-10-17 | Until builds are signed, the app installs no update itself on any platform. A found update opens its download on the release page. **0.0.3 predates this decision:** its packaged app can install an update after the reader presses Download. Turning installs back on is one reviewed change in the release that first carries real signatures. | Review of `0.0.3`; [Noto#329](https://github.com/roobli/Noto/pull/329) |
| 2026-10-17 | `prosemirror-view` is pinned to exactly `1.42.3`, because the sparse document view relies on its internals. The editor checks their shape at startup and, if the check fails, renders without the sparse view rather than guessing. | Review of `0.0.3`; [Noto#330](https://github.com/roobli/Noto/pull/330) |
| 2026-10-17 | Saves are not compared byte for byte with a full serialization, since untouched blocks reuse their original bytes and a full serialization normalizes them, so the two differ by design. Instead a round-trip property test edits a large note at random, saves it, and requires the saved file to parse back to the document in the editor. | Review of `0.0.3`; [Noto#333](https://github.com/roobli/Noto/pull/333) |
| 2026-10-17 | The micromark escape hatch and the old markdown pipelines behind it are removed ahead of D12's two-release criterion; micromark and mdast stay where the default engine uses them. | Review of `0.0.3`; [Noto#332](https://github.com/roobli/Noto/pull/332) |
| 2026-10-20 | **D13, amended.** D13 gated W1 and W2 on `0.1.0`, which was then the first release outside alpha and the one that carried the signing gate. That release became `0.0.3` and shipped unsigned, with signing moved to the first signed release. The web track's gate follows the signing: W1 and W2 come after the first signed release, meaning macOS builds signed with an Apple Developer ID and notarized, the Windows installer signed with a code-signing certificate, and only then in-app install turned back on ([Noto#329](https://github.com/roobli/Noto/pull/329)). The groundwork may continue before it. | Owner; [Noto on the web](./roadmap#web) |
| 2026-10-20 | **Git changes in Noto.** When the open folder is in a git repository, Noto shows what changed in your notes since the last commit; it is never a git client. It ships as three pull requests in order: marks in the file tree for modified, new and deleted notes; a read-only line beside changed blocks of an open note, whose popover shows that block as committed; and reverting a block as an ordinary editor change that can be undone and saves through the normal path, with revert cases added to the round-trip property test. Noto reads git through the system `git` command and only reads: it never writes to `.git`, so no staging, committing, branching, stashing, blame or network. No new panel, no side-by-side view, no diffs of files that are not Markdown. At most one setting, to show git changes, on by default. Without `git` or a repository the feature is absent, with no error or prompt. | Owner |

## Open {#open}

### D16. Code of conduct contact

The organization's code of conduct needs a reporting contact, an address or a
named maintainer, before it can be published.
