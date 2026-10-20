# Install and first open

The newest build is on the [Download](../download) page, and every build is on
the [releases page](https://github.com/roobli/Noto/releases). The current
release is **0.0.3**, the first outside alpha, published on 17 October 2026.
Alphas continue between releases and are labelled.

0.0.3 ships unsigned on purpose: on macOS it is ad-hoc signed and not
notarized, and on Windows the installer is not code-signed. Until Noto is
signed with an Apple Developer ID and notarized (and an equivalent Windows
certificate), each OS will warn once the first time you open a download. That
is expected. Follow the steps below so the first launch is smooth.

## macOS

Mac builds come as a zip; there is no `.dmg` yet.

1. Download `Noto-<version>-macos-arm64.zip` for Apple silicon, or
   `Noto-<version>-macos-x64.zip` for an Intel Mac. The Intel zip is in
   releases after `v0.0.2-alpha.113`; before that, an Intel Mac has no build
   it can run.
2. Unzip. You should get `Noto.app` (move it to `/Applications` if you like).
3. **First open** — pick one:

   **Right-click → Open** (or Control-click → Open), then confirm **Open**.

   Or in Terminal, from the folder that contains `Noto.app`:

   ```sh
   xattr -cr Noto.app && open Noto.app
   ```

### What the dialogs mean

| Dialog | What to do |
| --- | --- |
| **"Noto" cannot be opened because Apple cannot check it for malicious software** / **unidentified developer** | Right-click → Open once, or run the `xattr` line above. After that, double-click works. |
| **"Noto" is damaged and can't be opened** | Re-download the zip from the current release (avoid an old cached copy). Then run `xattr -cr Noto.app` and try Right-click → Open. |

True notarization (no Gatekeeper prompt) needs an Apple Developer identity on
the release machine. Until then, the warning on first open is normal.

## Windows

1. Download `NotoSetup-<version>.exe`.
2. Run the installer. If SmartScreen says **Windows protected your PC**, click
   **More info**, then **Run anyway**.
3. Finish the installer and launch Noto from the Start menu.

## Linux

- **Debian / Ubuntu:** `sudo apt install ./noto_<version>_amd64.deb` (exact
  filename varies by tag; check the release assets).
- **Fedora / openSUSE:** `sudo rpm -i noto-<version>-….rpm`

No code signing is required on typical Linux desktops for these packages.

## In-app updates

Packaged builds can check GitHub Releases from **Settings → Updates**:

- **Stable** (default) — formal releases only
- **Testing** — includes prerelease alphas

Check-on-launch is off by default. Until builds are signed, Noto does not
install an update itself on any platform: a found update opens its download on
the release page, and you install it as above. That holds from the first
release after 0.0.3
([roobli/Noto#329](https://github.com/roobli/Noto/pull/329)), which also hides
the setting to download automatically. An unsigned app replacing itself
silently is exactly what the system's first-open warnings exist to stop.

## After install

See [Using Noto](./using) for the day-to-day shortcuts and the vault rail.
