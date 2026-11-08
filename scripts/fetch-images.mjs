// Downloads every photo listed in scripts/images.json into public/images/ (several sizes each).
// Runs automatically before `npm run dev` and `npm run build`. Files that already exist are skipped,
// so you can also drop your own photos in public/images/ using the same names (e.g. wharf-1600.jpg).
import { mkdir, writeFile, access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { readFile } from 'node:fs/promises'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'public', 'images')
const manifest = JSON.parse(await readFile(join(root, 'scripts', 'images.json'), 'utf8'))
await mkdir(out, { recursive: true })

const exists = (p) => access(p).then(() => true, () => false)
const jobs = Object.entries(manifest).flatMap(([key, { id, widths }]) =>
  widths.map((w) => ({ file: join(out, `${key}-${w}.jpg`), name: `${key}-${w}.jpg`,
    url: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&fm=jpg&w=${w}&q=85` })))

let got = 0, skipped = 0, failed = []
for (const j of jobs) {
  if (await exists(j.file)) { skipped++; continue }
  try {
    const r = await fetch(j.url)
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    await writeFile(j.file, Buffer.from(await r.arrayBuffer()))
    got++; console.log('downloaded', j.name)
  } catch (e) { failed.push(`${j.name} (${e.message})`) }
}
console.log(`images: ${got} downloaded, ${skipped} already present, ${failed.length} failed`)
if (failed.length) {
  console.error('\nCould not download:\n  ' + failed.join('\n  ') + '\nCheck your internet connection and run: npm run images')
  process.exit(1)
}
