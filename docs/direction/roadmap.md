---
title: Roadmap
description: Three horizons for Noto, the gate between each, how releases work, and what Noto will not build.
---

# Roadmap

::: info Adopted 2026-09-29
The owner adopted this roadmap on 2026-09-29; each decision behind it is in
the [decision log](./decisions#decided). The first release outside alpha is
`0.1.0`.
:::

Three horizons, each ending in a gate rather than a date. Work moves to the
next horizon when the gate is met, not when the calendar says so.

## Now: make it trustworthy {#now}

**Gate:** `0.1.0`, the first release outside alpha. Per
[D2](./decisions#decided) it requires `@roobli/md` on by default (done in
`v0.0.2-alpha.112`) and the items marked **gate** below. The unmarked items
may follow in the next release.

1. **Stable means stable.** Gate. In review:
   [roobli/Noto#289](https://github.com/roobli/Noto/pull/289).
   - Correct the prerelease flag on every `v*-alpha.*` release on GitHub.
   - Make the updater refuse any version with a semver prerelease component on
     the Stable channel, whatever GitHub says. This covers both the in-app
     check and the `electron-updater` path, which reads GitHub's "latest
     release" and is misled the same way.
   - Create the GitHub release in the release workflow, with the prerelease
     flag derived from the tag, so a hand-made release cannot drift again.
2. **Signed and notarized on macOS.** Gate.
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
   other platform. Signing through the SignPath Foundation's open-source
   programme ([D15](./decisions#decided)); the application comes first.
4. **Every Mac.** Gate, met in the release workflow
   ([D8](./decisions#decided)): each release builds an Intel zip beside the
   Apple silicon one, and the update feed lists both.
5. **Numbers that are current.** Gate. Re-measure open, keystroke and save on
   packaged builds with `@roobli/md` as the default, against the same Typora
   and corpus, and replace the README table. Keep the old table in the
   measurement record with its date.
6. **An honest front door.** Done, pending merge: download links and version
   facts on this site are generated from the Releases API at build time;
   screenshots are retaken on the current chrome against a synthetic vault, in
   English and Chinese; the README's download table matches what releases
   carry. A macOS retake of the screenshots is still wanted before `0.1.0`.
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
3. **One engine.** Retire the micromark escape hatch once the agreed criteria
   are met ([D12](./decisions#decided)): two releases on Stable with no
   fidelity problem that needed it. Two parsers are two sets of bugs,
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
3. **Noto on the web**, in the [track below](#web).
4. **Canvas documents**, only if Noto decides to host them and only through
   the sandbox. Until then `@roobli/canvas` waits.

## Noto on the web {#web}

Proposed by the owner and adopted as [D13](./decisions#decided): run Noto's core
in the browser, and build this site with it. The site stops describing Noto
and starts being made of it, so every page is evidence for the claim it makes.

### Why it is within reach

Measured on `v0.0.2-alpha.113`:

- The Markdown pipeline (`src/shared/markdown/v3`) touches Node in one place:
  a `createHash` call for a sha256 in `document.ts`.
- The editor (`src/renderer/editor/noto`, about 11,500 lines) never calls the
  desktop bridge. It imports ProseMirror, Prism, KaTeX and shared code, and two
  small renderer helpers.
- `@roobli/md` already runs in the browser on this site.
- What is desktop-only is the file layer in the main process: reading, block
  records, the save that refuses on conflict, recovery, the workspace and
  plugins.

So the work is a boundary, not a rewrite.

### One core, two hosts

```
          @roobli/md (MIT)
          parse · split · reparse · serialize
                 │
          Noto core (AGPL)
          schema · engine IR → ProseMirror · editor
          document styles · byte-exact save assembly
                 │
      ┌──────────┴────────────┐
  Desktop host             Web host
  Electron main: files,    fetch: read-only pages
  block records,           File System Access:
  recovery, workspace,     a local folder
  plugins                  GitHub: an edit becomes
                           a pull request
```

Groundwork, which also helps the desktop app:

1. **Hashing that runs anywhere.** Replace `node:crypto` in the shared layer
   with a synchronous sha256 that runs in any JavaScript runtime.
2. **A named host boundary.** What `App` hands the editor today becomes a
   `NotoHost` interface: read bytes, save bytes against a base hash, resolve an
   asset, resolve a wiki link, open a link. The desktop implements it with the
   preload APIs it already has.
3. **A web build of the core** from the Noto repository, a library entry
   consumed here by tag the way `@roobli/md` is. No monorepo migration until a
   second consumer needs one.

### Phases

| Phase | What ships | When |
| --- | --- | --- |
| **W0** | The engine preview on the engine Noto ships, and a check on every pull request and deploy that each page of this site comes back byte for byte from `@roobli/md`. The site's own pages become part of the engine's evidence. | Done |
| **W1** | Pages drawn by Noto. This site's Markdown is rendered by the Noto core, with the app's schema, typography and node views, inside VitePress's shell, which stays for navigation and search. Server-render what the schema can for first paint; mount the read-only editor for exact visuals. | After `0.1.0` |
| **W2** | Edit this page, keep the file. Every page gets *Edit in Noto*: the page becomes editable in the browser, and saving assembles the file exactly as the desktop does and opens a pull request. The diff is the edit and nothing else. This is the pitch, demonstrated on every page. | After W1 |
| **W3** | Noto for the web: a local folder through the File System Access API, or a public repository read-only. A second product surface, which needs its own case. | Decided after W2 has been used |

The groundwork may run while the gate waits on certificates. Nothing in this
track ships ahead of `0.1.0`, and none of it is a cloud: no accounts, no sync,
no hosted notes.

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
version number its meaning back. The first release outside alpha will be
`0.1.0` ([D3](./decisions#decided)).
