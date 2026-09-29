---
title: Decisions
description: Open questions about Noto's direction, and the answers once given.
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

## Open {#open}

### D4. Release cadence

Adopt the [three tracks](./roadmap#releases): CI builds on every merge, alphas
at most weekly with written notes, releases per milestone.

**Recommendation.** Yes.

### D5. The one-line description

- Current: "A Markdown editor that edits the rendered document and keeps the
  file byte for byte."
- Proposed headline: **"Edit the page. Keep the file."** with the current line
  kept as the explanation beneath it.

**Recommendation.** The proposal. The current line describes the mechanism;
the headline says why anyone should care, in five words.

### D6. The product line

- `@roobli/canvas`: freeze and label experimental until Noto decides to host
  canvas documents.
- holt: keep outside Noto's story; decide whether it is a supported product or
  a published personal tool, and label it so.
- `@roobli/md`: publish to npm when its contract reaches v1, not before.

**Recommendation.** All three as written.

### D7. Windows signing route

Options include a cloud signing service billed monthly, an open-source signing
program, or a conventional certificate on a hardware token. They differ in
cost, in who holds the key, and in how quickly SmartScreen reputation builds.

**Recommendation.** Decide after pricing and eligibility are checked at the
time of purchase; record the choice and its reasons here.

### D8. Intel Macs

- Ship a universal build (one download, larger), or
- ship a separate Intel build, or
- state in the README, this site and every release that Intel Macs are not
  supported.

**Recommendation.** A universal build if the release workflow can produce one
on Apple silicon runners by cross-compiling; otherwise the explicit statement,
now.

### D9. Documentation languages

English as the working language of every repository; Chinese translations of
the user guides on this site once the English is stable.

**Recommendation.** Yes. holt's README either follows the same rule or records
why it does not.

### D10. License for this site

This repository has no license. Proposal: CC BY 4.0 for the prose and images,
MIT for the site's code, both stated in a `LICENSE` file.

**Recommendation.** Yes.

### D11. Saving automatically

Autosave is off by default because a save on a very large file costs up to
seconds and conflicts must be refused rather than resolved silently.

**Recommendation.** Keep it off for the first non-alpha release. Reopen once
save cost is bounded for large files.

### D12. Retiring the micromark engine

Proposal: remove the escape hatch after two releases on Stable in which no
reported fidelity problem needed it, and with the golden corpus green on the
default engine throughout.

**Recommendation.** Yes, with the criteria agreed now so that removal is a
consequence rather than a debate.

### D13. Scope of the web track

Proposed by the owner: Noto's core runs on the web, and this site is built
with it. The plan is in [Noto on the web](./roadmap#web): W0 and the
groundwork now, W1 (pages drawn by Noto) and W2 (edit a page, get a pull
request with exactly that edit) after the 0.1.0 gate, W3 (Noto for the web as
a product surface) decided only after W2 has been used.

**Recommendation.** Approve W0 through W2 as planned. Keep W3 open.

### D14. License of the web core

The web core is extracted from Noto and is therefore AGPL-3.0-only. That is no
obstacle for this site, whose source is public. It does deter anyone who would
embed the editor in their own product. `@roobli/md` is already MIT and is the
layer meant for other hosts.

**Recommendation.** Keep the editor core AGPL-3.0-only. Revisit only if a
real embedder appears, since relicensing more permissively cannot be undone.
