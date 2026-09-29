---
title: Download
description: The newest Noto build for macOS, Windows and Linux.
---

# Download

<DownloadTiles />

This page is rebuilt from GitHub Releases every few hours, so the links above
are always the newest build rather than whatever was current when someone last
edited it.

## Before the first open

Noto is not yet signed with an Apple Developer ID or a Windows code-signing
certificate, so each system warns once on a fresh download. That is expected.
The [install guide](./guide/install) has the one step each platform needs.

On macOS, from the folder that contains `Noto.app`:

```sh
xattr -cr Noto.app && open Noto.app
```

## What each platform gets

| Platform | Download |
| --- | --- |
| macOS, Apple silicon | a `.zip` holding `Noto.app` |
| macOS, Intel | a `.zip` holding `Noto.app`, in releases after `v0.0.2-alpha.113` |
| Windows, x64 | `NotoSetup-<version>.exe` |
| Debian and Ubuntu, x64 | a `.deb` package |
| Fedora and openSUSE, x64 | an `.rpm` package |

Take the zip for your Mac's chip; Apple menu → About This Mac says which.
An Apple silicon Mac can also run the Intel build, under Rosetta; an Intel Mac
cannot run the Apple silicon one.

## Staying current

Settings → Updates checks GitHub Releases. **Stable**, the default, offers only
full releases; **Testing** includes alphas. Nothing is checked or downloaded
until you ask, unless you turn that on.
