# Install and first open

The newest build is on the [Download](../download) page, and every build is on
the [releases page](https://github.com/roobli/Noto/releases). The current line
is **0.0.2-alpha**; alphas are labelled. The first release outside alpha will be
0.1.0.

Until Noto is signed with an Apple Developer ID and notarized (and an equivalent
Windows certificate), each OS will warn once the first time you open a
download. That is expected. Follow the steps below so the first launch is
smooth.

## macOS

1. Download `Noto-<version>-macos-arm64.zip`. Current releases are for Apple
   silicon only: an Intel Mac cannot run them, since Rosetta runs Intel apps on
   Apple silicon and not the other way round.
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

Check-on-launch and auto-download are off by default.

## After install

See [Using Noto](./using) for the day-to-day shortcuts and the vault rail.
