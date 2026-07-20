import sharp from 'sharp';
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';

const svg = readFileSync('public/favicon.svg');

async function pngFromSvg(size, out, background) {
  let pipeline = sharp(svg, { density: 384 }).resize(size, size);
  if (background) {
    pipeline = pipeline.flatten({ background });
  }
  await pipeline.png().toFile(out);
  console.log('wrote', out);
}

await pngFromSvg(32, 'public/favicon-32.png', null);
await pngFromSvg(48, 'public/favicon-48.png', null);
await pngFromSvg(192, 'public/icon-192.png', null);
await pngFromSvg(512, 'public/icon-512.png', null);
await pngFromSvg(180, 'public/apple-touch-icon.png', {
  r: 255,
  g: 255,
  b: 255,
  alpha: 1,
});

const sizes = [16, 32, 48];
const buffers = await Promise.all(
  sizes.map((s) => sharp(svg, { density: 384 }).resize(s, s).png().toBuffer()),
);

function createIco(pngBuffers, dims) {
  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = [];
  for (let i = 0; i < count; i++) {
    const w = dims[i] >= 256 ? 0 : dims[i];
    const h = dims[i] >= 256 ? 0 : dims[i];
    const size = pngBuffers[i].length;
    entries.push({ w, h, size, offset });
    offset += size;
  }
  const buf = Buffer.alloc(offset);
  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2);
  buf.writeUInt16LE(count, 4);
  let entryOffset = 6;
  for (const e of entries) {
    buf.writeUInt8(e.w, entryOffset);
    buf.writeUInt8(e.h, entryOffset + 1);
    buf.writeUInt8(0, entryOffset + 2);
    buf.writeUInt8(0, entryOffset + 3);
    buf.writeUInt16LE(1, entryOffset + 4);
    buf.writeUInt16LE(32, entryOffset + 6);
    buf.writeUInt32LE(e.size, entryOffset + 8);
    buf.writeUInt32LE(e.offset, entryOffset + 12);
    entryOffset += 16;
  }
  for (let i = 0; i < count; i++) {
    pngBuffers[i].copy(buf, entries[i].offset);
  }
  return buf;
}

writeFileSync('public/favicon.ico', createIco(buffers, sizes));
console.log('wrote public/favicon.ico');

for (const f of [
  'public/_logo-icon-probe.png',
  'public/_icon-512.png',
  'public/_icon-center.png',
]) {
  try {
    unlinkSync(f);
  } catch {
    // ignore
  }
}
