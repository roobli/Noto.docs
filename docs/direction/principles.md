---
title: Principles
description: The rules a change to Noto is judged by, and where Noto stands against each.
---

# Principles

::: info Proposal, under discussion
See the [decision log](./decisions) for what has been agreed.
:::

Eight rules. A change that breaks one needs its reason written down. A change
that serves none of them probably should not be made. Each rule names a test,
and where Noto stands against it as of `v0.0.2-alpha.113`.

## 1. The file is the product

The Markdown file on disk is the truth and Noto is a lens on it. Never rewrite
what the reader did not touch. Never require a sidecar to read a note. Never
keep a note in a form only Noto understands.

**Test.** Open and save without editing gives identical bytes. An edit appears
in `git diff` as that edit and nothing else.

**Today.** Holds, and is enforced by golden fixtures and a reparse proof on
every serialize. The named exception is an edit to the blank lines between
blocks, which falls back to a whole-file write for that save. That trade is
documented and should stay visible rather than be hidden.

## 2. Trust before features

Trust is built in the first minute and spent every day after. A download that
opens only after a Terminal command has lost the first minute. An update
channel called Stable that installs an alpha spends the trust of exactly the
people who asked to be careful.

**Test.** A new user on a clean Mac or Windows machine installs and opens Noto
with no warning dialog. Each update channel delivers only what its name
promises. A save that could lose data is refused, never guessed.

**Today.** Conflict-safe saving and recovery hold. Signing and notarization do
not exist yet. And Stable is broken: dozens of alpha releases are flagged on
GitHub as full releases, and the updater trusts that flag alone, so Stable
currently resolves to `v0.0.2-alpha.109`. Both are first in
[Now](./roadmap#now).

## 3. Defaults are the product

Most people never open Settings. Whatever Noto does before anyone configures it
is what Noto is. Defaults must be right for a new person on their platform and
in their script, not a replica of one person's setup.

**Test.** A first launch on each platform, in a Latin-script and a CJK locale,
looks intentional without touching Settings.

**Today.** The document face is the author's Typora stack, `Songti SC` first.
On macOS, English prose is therefore set in Songti's Latin glyphs; on a machine
with none of the listed faces the stack drops to the generic serif. Fence line
numbers are on because the author's Typora is set that way. Both are good
choices for the author and unexamined ones for everyone else. Proposal:
per-script defaults (a Latin-first stack for Latin locales, the current stack
for CJK), with the author's setup kept as a named preset.

## 4. Deference

The document owns the window. The chrome marks where you are and otherwise
gets out of the way. Nothing moves the text, nothing floats over it, nothing
animates on load.

**Test.** Remove the accent and the app is still fully usable. No control is
visible that cannot act right now.

**Today.** Noto's strongest area; the
[chrome](https://github.com/roobli/Noto/blob/main/docs/design/chrome.md) and
[motion](https://github.com/roobli/Noto/blob/main/docs/design/motion.md)
records are the reference. The risk is additive. Thirteen of the author's
sixteen Typora plugins now have native equivalents, and each brought a
setting, a menu item or a fence type with it. Deference erodes one reasonable
addition at a time, so each addition should argue for itself against this
rule, not against Typora.

## 5. Speed is measured, not claimed

Latency is something a writer feels on the first keystroke. Open, keystroke
and save each get a budget, measured on packaged builds and checked on every
release.

**Test.** Every number on the README and on this site was measured against the
current default engine, and says when.

**Today.** The method is excellent: clocks inside both applications, failed
approaches written down, a split result reported as split. But the headline
numbers predate the switch to `@roobli/md` and have not been re-measured on a
packaged build since. They are better or worse now, and nobody knows which.

## 6. A setting is a decision not yet made

Add a setting where people legitimately differ, such as reading size, width
and theme. Never add one to avoid choosing. Every setting carries a cost: it
must be tested, documented and supported for as long as it exists.

**Test.** Each setting can say who needs it and what happens to someone who
never touches it.

**Today.** Settings is one quiet surface with good grouping: Appearance,
Editor, Markdown, Images, Updates, then Remote and Plugins set lower. Before
the first non-alpha release it is worth one audit of which settings exist
because readers need them and which arrived with a plugin port, such as
uploading images through PicGo.app.

## 7. Native where it counts

Electron is a choice, and the choice creates obligations: platform keyboard
conventions, real menus, title-bar controls that avoid the system's, system
text services, accessibility, installers that look like the platform's own.

**Test.** A VoiceOver user and a Narrator user can open, edit and save a note.
Keyboard-only use reaches every control. The Mac build runs on every Mac that
runs the macOS version it targets.

**Today.** Title-bar avoidance and menus are done with care. Accessibility has
not been audited. The Mac release is Apple silicon only, so an Intel Mac
cannot run Noto at all: Rosetta translates Intel code for Apple silicon, not
the other way round.

## 8. Say only what is true

Noto's documents already have an unusually honest voice: a split performance
result reported as split, platforms described as "proven by machine rather
than by living in them." Keep the voice. Every public claim is either measured
or labelled as intent, and carries its date.

**Test.** No page on this site, no README and no release note states a fact
that is out of date.

**Today.** The voice holds; the facts drift. This site links `v0.0.2-alpha.30`
as the download while the current alpha is `.113`. The README's download table
lists Windows and Linux archives and an Intel Mac build that current releases
do not carry. The home screenshot shows title-bar icons that the chrome record
says were removed.

## A pass over the interface

Not a redesign. Specific observations against the rules above, ordered by how
soon a new person would meet them.

1. **The first launch is the product's first sentence.** Today it is a
   Gatekeeper dialog and a line of shell. Fixing it is engineering (rule 2),
   but its absence should be judged as a design failure, not a release chore.
2. **The empty state can state the promise.** Open folder, Open file and one
   short line is right. That line should be the promise, in the reader's
   words: Noto edits the rendered page and never rewrites what you did not
   touch. The status line's *Exact source preserved* already proves it at
   work; the empty state is where it should be introduced.
3. **The hero image should show the difference.** The current screenshot is
   headings and paragraphs about the author's own vault. It shows nothing a
   plain preview could not. Show a table edited as a table, a formula, a fence
   with its gutter, and the fidelity line. Once in English, once in Chinese.
4. **Typography should follow the script** (rule 3).
5. **Saving automatically deserves a second look.** On macOS, documents save
   themselves; that is the platform's promise. Noto's reasons for leaving it
   off are real: a save on a very large file costs up to seconds, and a
   conflict must be refused rather than resolved silently. Once save cost is
   bounded, the default should be reconsidered. Until then the dirty dot
   remains the right, and only, signal.
6. **Release notes are interface.** Today they read as engine logs: lazy
   empty containers, `MAX_MARK_NEST`. The person reading them in
   Settings → Updates wants to know what changed for them, with the engine
   detail one link away.
7. **File names are interface.** `noto_0.0.2.alpha.113_amd64-0.0.2-alpha.113.deb`
   carries its version twice, in two spellings. The name of the thing someone
   downloads is the first piece of Noto they see.
