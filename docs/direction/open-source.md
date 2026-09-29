---
title: Open source
description: The standard for documents, templates and contribution across roobli repositories, and where each stands.
---

# Open source

::: info Adopted 2026-09-29
The standard was adopted on 2026-09-29. The audit and the order of work below
say where each repository stands.
:::

Every roobli repository is public, so every document in them is part of the
product. A stale README misleads as surely as a broken button, and a missing
issue template costs the same hour on every bug report. This page sets one
standard for all of them and records where each stands.

## The standard

| File | What it is for | Where it lives |
| --- | --- | --- |
| `README.md` | What it is, its status, how to install, one example, the license. A landing page, not a changelog. | Each repository |
| `LICENSE` | The terms, as a file GitHub can detect. | Each repository |
| `CHANGELOG.md` | What changed, for the person upgrading, in [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) form. | Each repository that ships |
| `CONTRIBUTING.md` | Setup, the check that must pass, conventions, where a change belongs. | Organization default, extended per repository where needed |
| `SECURITY.md` | How to report privately. | Organization default |
| `CODE_OF_CONDUCT.md` | [Contributor Covenant](https://www.contributor-covenant.org/) 2.1. | Organization default |
| Issue forms | A bug form asking for version, platform, steps and a minimal file; a feature form asking for the problem rather than the solution. | Organization default; Noto overrides with its own fields |
| Pull request template | What and why, how it was verified, which docs changed, screenshots for anything visible. | Organization default |
| CI | The repository's own verify command on every pull request. | Each repository |

GitHub applies community health files from the organization's
[`.github`](https://github.com/roobli/.github) repository to every repository
that has none of its own, so most of this is written once.

## Where each repository stands

| Repository | README | LICENSE | CHANGELOG | CI | What needs attention |
| --- | --- | --- | --- | --- | --- |
| Noto | Yes | AGPL-3.0-only | No; release bodies only | Unit, then packaged end-to-end on three platforms | Download table and performance note corrected in [#289](https://github.com/roobli/Noto/pull/289); a changelog is still missing. |
| @roobli/md | A phase log | MIT | No; history lives in the README's status section | Yes | README should read as a library landing page; the phase history belongs in a changelog. |
| Noto.docs | Yes | CC BY 4.0 for prose, MIT for code | No | A pull request check: every page round-trips byte for byte, and the site builds | Release facts now generated at build time and the engine preview on `v0.1.19`; several guides still duplicate pages in the Noto repository. |
| @roobli/canvas | Good, labelled experimental | MIT | No | Yes | Frozen until Noto hosts canvas documents (D6). |
| holt | English summary, then Chinese | MIT | No | None | Labelled a personal companion (D6); needs a CI workflow. |
| noto-plugin-template | Good | MIT | No | None | A template should typecheck against the API it targets. |
| .github | — | — | — | — | Contributing, security, issue forms and a pull request template now cover every repository; the code of conduct waits on a contact (D16). |

## How documentation is organized

Four kinds of document, four homes. The split follows who is reading.

| Kind | Reader | Home |
| --- | --- | --- |
| Guides: install, using, theming, plugins, remote control | People using Noto | This site, [/guide/](../guide/install) |
| Direction: positioning, principles, roadmap, decisions | Anyone deciding what Noto should be | This site, /direction/ |
| Design records: why the chrome is this way, measurements, engine design | Contributors | Each repository's `docs/` |
| Reference: plugin manifest, engine contract, remote API | Plugin and host authors | Generated from source where possible |

The rules that keep them accurate:

1. **One source per fact.** Where a guide exists both here and in the Noto
   repository, one is the source and the other points to it. Today install,
   plugins, theming and remote control exist in both places, and three of the
   four have already diverged.
2. **Records are curated, not appended.** A design record that grows by one
   clause per change stops being readable; some paragraphs in the current
   performance and engine records now list dozens of fixture names in a
   single sentence. When a record outgrows its reader, summarize it and move
   the detail to a dated archive.
3. **Every changing fact carries its date or version.** "As of
   `v0.0.2-alpha.113`" costs a few words and saves a wrong answer.
4. **Generated beats typed.** Version numbers, download links and API tables
   come from their source at build time wherever the tooling allows.
5. **Nothing from a private vault.** No note content, titles, folder names,
   paths or third-party hosts derived from anyone's personal notes. Fixtures
   are synthetic; screenshots use a demo folder.
6. **English first, Chinese second.** English is the working language of
   every public repository. User guides get a Chinese translation once the
   English is stable, because many of the people Noto is for write in
   Chinese ([D9](./decisions#decided)).

## Order of work

1. Organization defaults in `.github`: done, except the code of conduct,
   which waits on a reporting contact (D16).
2. Noto: a changelog; the README's download and performance sections made
   true.
3. `@roobli/md`: the README rewritten as a library landing page; a changelog
   built from the phase history.
4. This site: generated version facts, the current engine and a license are
   done; the guides are still to be deduplicated with the Noto repository.
5. canvas and holt are labelled (D6), and holt's README opens in English
   (D9). The plugin template still needs a typecheck against the API it
   targets.
