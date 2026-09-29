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
| 2026-09 | Leaving alpha requires two gates: `@roobli/md` on by default, and macOS notarization. Release readiness is signed off by the maintainer who owns it, not declared by whoever cuts the tag. | Maintainers |
| 2026-09 | Nested emphasis is capped at thirty-seven levels on purpose. No release exists only to raise the cap. | Maintainers; `MAX_MARK_NEST` in `src/shared/markdown/v3/pm/from-engine.ts` |
| 2026-09 | Public work lives in the roobli organization. No private note content is ever published; fixtures are synthetic. | Maintainers |

## Open {#open}

### D1. Repair the Stable channel now

Dozens of alpha releases are flagged as full releases on GitHub, so Stable
resolves to `v0.0.2-alpha.109`. Fixing it means editing those releases on
GitHub and changing the updater and release workflow
([Now, item 1](./roadmap#now)).

**Recommendation.** Yes, before anything else. It is the one item on this list
that is actively doing harm.

### D2. What gates the first non-alpha release

- **(a)** The two gates already agreed: engine default-on and macOS
  notarization.
- **(b)** Everything in [Now](./roadmap#now).
- **(c)** (a), plus a repaired Stable channel, current performance numbers,
  and a stated Intel Mac position.

**Recommendation.** (c). A formal release on a Stable channel that serves
alphas would not mean what it says, and an Intel user deserves to know before
downloading. Windows signing and the rest of Now can follow in the next
release.

### D3. The first non-alpha version number

- **`0.0.3`**, continuing the current line.
- **`0.1.0`**, the first minor release of initial development under semver.

**Recommendation.** `0.1.0`. Under semver a `0.0.z` version says that every
release may break anything; `0.1.0` says "first release meant to be used," which
is what this is. Either works with the updater, which compares versions with
semver.

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
