/**
 * Release facts for the site, read from GitHub Releases at build time.
 *
 * Nothing about a version is typed into a page. The deploy workflow rebuilds
 * the site on a schedule, so the download links follow the releases without a
 * commit. A release is a prerelease when GitHub flags it or when its version
 * carries a prerelease component, the same rule the app's update channels use.
 * If GitHub cannot be reached the build still succeeds and the pages link to
 * the releases list instead.
 */
import { defineLoader } from 'vitepress'

export interface ReleaseDownload {
  readonly platform: string
  readonly meta: string
  readonly file: string
  readonly url: string
}

export interface ReleaseFacts {
  readonly ok: boolean
  readonly releasesUrl: string
  readonly newest?: {
    readonly tag: string
    readonly version: string
    readonly prerelease: boolean
    readonly url: string
    readonly published: string
    readonly downloads: readonly ReleaseDownload[]
  }
}

declare const data: ReleaseFacts
export { data }

const REPO = 'roobli/Noto'
const RELEASES_URL = `https://github.com/${REPO}/releases`

interface RawAsset {
  readonly name?: unknown
  readonly browser_download_url?: unknown
}

interface RawRelease {
  readonly tag_name?: unknown
  readonly draft?: unknown
  readonly prerelease?: unknown
  readonly html_url?: unknown
  readonly published_at?: unknown
  readonly assets?: unknown
}

type Parsed = readonly [number, number, number, readonly string[]]

function parseVersion(tag: string): Parsed | null {
  const match = /^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/.exec(tag.trim())
  if (!match) return null
  return [Number(match[1]), Number(match[2]), Number(match[3]), match[4] ? match[4].split('.') : []]
}

/** Semver precedence: negative when a sorts before b. */
function compare(a: Parsed, b: Parsed): number {
  for (let i = 0; i < 3; i += 1) {
    const diff = (a[i] as number) - (b[i] as number)
    if (diff !== 0) return diff
  }
  const [pa, pb] = [a[3], b[3]]
  if (pa.length === 0 || pb.length === 0) return pb.length - pa.length
  for (let i = 0; i < Math.min(pa.length, pb.length); i += 1) {
    const [x, y] = [pa[i], pb[i]]
    if (x === y) continue
    const [nx, ny] = [/^\d+$/.test(x), /^\d+$/.test(y)]
    if (nx && ny) return Number(x) - Number(y)
    if (nx !== ny) return nx ? -1 : 1
    return x < y ? -1 : 1
  }
  return pa.length - pb.length
}

const PLATFORMS: readonly { test: RegExp; platform: string; meta: string }[] = [
  { test: /-macos-arm64\.zip$/, platform: 'macOS', meta: 'Apple silicon · .zip' },
  { test: /^NotoSetup-.*\.exe$/, platform: 'Windows', meta: 'x64 · installer' },
  { test: /\.deb$/, platform: 'Linux', meta: 'Debian / Ubuntu · .deb' },
  { test: /\.rpm$/, platform: 'Linux', meta: 'Fedora / openSUSE · .rpm' },
]

function downloadsFrom(assets: unknown): ReleaseDownload[] {
  if (!Array.isArray(assets)) return []
  const found: ReleaseDownload[] = []
  for (const kind of PLATFORMS) {
    const asset = (assets as RawAsset[]).find(
      (entry) => typeof entry.name === 'string' && kind.test.test(entry.name),
    )
    if (asset && typeof asset.name === 'string' && typeof asset.browser_download_url === 'string') {
      found.push({ platform: kind.platform, meta: kind.meta, file: asset.name, url: asset.browser_download_url })
    }
  }
  return found
}

function formatDate(iso: unknown): string {
  if (typeof iso !== 'string' || !iso) return ''
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso))
}

export default defineLoader({
  async load(): Promise<ReleaseFacts> {
    const offline: ReleaseFacts = { ok: false, releasesUrl: RELEASES_URL }
    try {
      const headers: Record<string, string> = {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'Noto.docs-build',
        'X-GitHub-Api-Version': '2022-11-28',
      }
      if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
      const response = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=100`, {
        headers,
        signal: AbortSignal.timeout(15_000),
      })
      if (!response.ok) return offline
      const releases = (await response.json()) as RawRelease[]
      let best: { raw: RawRelease; tag: string; version: Parsed } | null = null
      for (const raw of releases) {
        if (raw.draft === true || typeof raw.tag_name !== 'string') continue
        const version = parseVersion(raw.tag_name)
        if (!version) continue
        if (!best || compare(version, best.version) > 0) best = { raw, tag: raw.tag_name, version }
      }
      if (!best) return offline
      const { raw, tag, version } = best
      return {
        ok: true,
        releasesUrl: RELEASES_URL,
        newest: {
          tag,
          version: tag.replace(/^v/, ''),
          prerelease: raw.prerelease === true || version[3].length > 0,
          url: typeof raw.html_url === 'string' ? raw.html_url : RELEASES_URL,
          published: formatDate(raw.published_at),
          downloads: downloadsFrom(raw.assets),
        },
      }
    } catch {
      return offline
    }
  },
})
