---
title: Roadmap
description: Three horizons for Noto, the gate between each, how releases work, and what Noto will not build.
---

# Roadmap

::: info Proposal, under discussion
Every item here is a proposal until the [decision log](./decisions) records
it. The two gates already agreed for leaving alpha are `@roobli/md` on by
default (done in `v0.0.2-alpha.112`) and macOS notarization (not done).
:::

Three horizons, each ending in a gate rather than a date. Work moves to the
next horizon when the gate is met, not when the calendar says so.

## Now: make it trustworthy {#now}

**Gate:** the first non-alpha release. It ships when the items below are done,
and not before. Which of them are hard requirements is decision
[D2](./decisions#open).

1. **Stable means stable.**
   - Correct the prerelease flag on every `v*-alpha.*` release on GitHub.
   - Make the updater refuse any version with a semver prerelease component on
     the Stable channel, whatever GitHub says. This covers both the in-app
     check and the `electron-updater` path, which reads GitHub's "latest
     release" and is misled the same way.
   - Create the GitHub release in the release workflow, with the prerelease
     flag derived from the tag, so a hand-made release cannot drift again.
2. **Signed and notarized on macOS.**
   - Apple Developer Program membership and a Developer ID Application
     certificate, held by the organization rather than a personal account if
     possible.
   - Notarize with `notarytool` using an App Store Connect API key, which is
     revocable and not tied to one person's Apple ID and two-factor prompts.
     Staple the ticket. Verify with `spctl --assess` and a launch from
     quarantine on a clean machine.
   - Entitlements: remove `disable-library-validation`, then
     `allow-unsigned-executable-memory`, one per build, each verified by a
     notarized launch from quarantine, as the
     [signing review](https://github.com/roobli/Noto/blob/main/docs/architecture/signing-review.md)
     already prescribes.
   - Retire the first-open instructions only after a notarized build passes
     that check.
3. **Signed on Windows.** SmartScreen is the same first-minute problem on the
   other platform. Choose a signing route ([D7](./decisions#open)).
4. **Every Mac, or a clear statement.** Ship an Intel or universal build, or
   say plainly that Intel Macs are unsupported ([D8](./decisions#open)).
   Silence is the one wrong answer.
5. **Numbers that are current.** Re-measure open, keystroke and save on
   packaged builds with `@roobli/md` as the default, against the same Typora
   and corpus, and replace the README table. Keep the old table in the
   measurement record with its date.
6. **An honest front door.** Download links and version facts on this site
   generated from the Releases API at build time. Screenshots retaken on the
   current chrome, with the differentiators on screen, in English and Chinese.
   The README's download table matched to what releases actually carry.
7. **Release notes for people.** A `CHANGELOG.md` in
   [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) form, written for
   the person updating; engine detail links to `@roobli/md`'s own changelog.

## Next: make it Noto's own {#next}

**Gate:** a release a stranger would recommend to a friend without caveats.

1. **Defaults for everyone.** Per-script typography, a reviewed set of
   defaults, the author's setup kept as a preset
   ([rule 3](./principles#_3-defaults-are-the-product)).
2. **Accessibility.** VoiceOver and Narrator through open, edit, save, quick
   open and Settings; keyboard reach for every control; contrast checked in
   both themes.
3. **One engine.** Agree the criteria for retiring the micromark escape hatch
   ([D12](./decisions#open)), then remove it. Two parsers are two sets of bugs,
   two golden baselines and a second question on every review.
4. **Open time.** The last packaged measurement had Typora 2.6 times faster on
   a 525 KB file. Close that gap with the new engine, or explain it with new
   numbers.
5. **Settings audit** ([rule 6](./principles#_6-a-setting-is-a-decision-not-yet-made)).
6. **The writing loop**, in the order a writer meets it: paste, undo, input
   method composition, spell check, find, export. Each checked against
   [the Typora record](https://github.com/roobli/Noto/blob/main/docs/design/typora-gap.md),
   and only where it serves writing and reading.

## Later: open the doors carefully {#later}

**Gate:** none until Next is done. These are directions, not commitments.

1. **User-installed plugins**, through the isolated runtime that is already
   built: a plugins folder, a package digest, an install surface and a
   versioned API. This is when the
   [plugin template](https://github.com/roobli/noto-plugin-template) becomes
   a product.
2. **`@roobli/md` on npm** with a v1 contract, so other hosts can share
   Noto's fidelity guarantee.
3. **A read-only web reader** on the same engine this site already runs, for
   sharing a note or browsing a folder. Not editing in the browser.
4. **Canvas documents**, only if Noto decides to host them and only through
   the sandbox. Until then `@roobli/canvas` waits.

## Not on the roadmap {#no}

Saying no is the other half of a roadmap. These are good ideas that belong to
other products.

- Accounts, sync, or a Noto cloud. Files already sync through whatever the
  reader uses.
- Real-time collaboration.
- Mobile apps.
- A writing assistant inside the editor. What Noto offers people who work with
  agents is fidelity and the local [remote control](../guide/remote-control)
  API, not a chat pane.
- Databases, block references and Notion-style pages.
- A full diagrams.net editor inside Noto.
- Deeper nesting for its own sake. Thirty-seven levels of nested emphasis is
  past anything a person writes. The cap is a decision, not a gap, and no
  release will exist only to raise it.

## How releases work {#releases}

| Track | Meaning | Cadence | Update channel |
| --- | --- | --- | --- |
| CI build | Every merge to `main`, kept as workflow artifacts | Continuous | None |
| Alpha (`…-alpha.n`) | A user-visible change worth testing | At most weekly, with notes | Testing |
| Release | Passed the current horizon's gate | Per milestone | Stable and Testing |

For context: 113 alphas were tagged between 5 and 28 September 2026, 23 of
them in the last three days. At that rate the version number carries no
information, and anyone on Testing is asked to update several times a day. A
build is not a release. The table keeps the engineering pace and gives the
version number its meaning back. The first non-alpha version number is
decision [D3](./decisions#open).
