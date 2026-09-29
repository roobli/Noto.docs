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
| Windows, x64 | `NotoSetup-<version>.exe` |
| Debian and Ubuntu, x64 | a `.deb` package |
| Fedora and openSUSE, x64 | an `.rpm` package |

Intel Macs are not supported by current releases. The macOS build is for Apple
silicon, and Rosetta runs Intel apps on Apple silicon, not the other way round.

## Staying current

Settings → Updates checks GitHub Releases. **Stable**, the default, offers only
full releases; **Testing** includes alphas. Nothing is checked or downloaded
until you ask, unless you turn that on.
