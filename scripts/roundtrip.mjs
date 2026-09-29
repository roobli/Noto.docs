/**
 * Every page of this site must come back byte for byte from @roobli/md: parse
 * the file, serialize it with every block untouched, compare the bytes.
 *
 * That is the promise Noto makes about a reader's notes, checked on the pages
 * that make it. It runs on every pull request and before every deploy, so the
 * site's own Markdown is part of the engine's evidence.
 */
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { identityUnits, parseDocument, serializeDocument } from '@roobli/md'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'docs')
const skip = new Set(['node_modules', 'dist', 'cache'])

async function* markdownFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* markdownFiles(full)
    else if (entry.name.endsWith('.md')) yield full
  }
}

let checked = 0
const failures = []
for await (const file of markdownFiles(root)) {
  const relative = path.relative(root, file)
  const bytes = new Uint8Array(await readFile(file))
  const parsed = parseDocument(bytes)
  if (parsed.status !== 'parsed') {
    failures.push(`${relative}: parse ${parsed.status} (${parsed.code ?? 'unknown'})`)
    continue
  }
  const saved = serializeDocument(parsed.document, { units: identityUnits(parsed.document) })
  if (saved.status !== 'serialized') {
    failures.push(`${relative}: serialize ${saved.status} (${saved.code ?? 'unknown'})`)
    continue
  }
  if (Buffer.compare(Buffer.from(bytes), Buffer.from(saved.outputBytes)) !== 0) {
    failures.push(`${relative}: ${bytes.length} bytes in, ${saved.outputBytes.length} bytes out`)
    continue
  }
  checked += 1
}

if (failures.length) {
  console.error(`Round trip failed for ${failures.length} page(s):`)
  for (const failure of failures) console.error(`  ${failure}`)
  process.exit(1)
}
console.log(`${checked} pages came back byte for byte from @roobli/md.`)
