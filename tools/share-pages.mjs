#!/usr/bin/env node
/**
 * share-pages.mjs — páginas de vista previa para los links compartidos.
 *
 * Por qué: la app usa HashRouter (…/#/catalog/…). WhatsApp, Telegram y
 * Facebook no ejecutan JS ni reciben lo que va después del `#`, así que
 * todos los links mostraban la misma imagen de la plataforma. Este script
 * genera, por cada negocio, sucursal, catálogo, producto y venta flash,
 * una página mínima con SUS etiquetas Open Graph (título, descripción,
 * imagen) que al abrirse redirige a la app:
 *
 *   link compartido  {SITE}/s/catalog/{negocio}/{sucursal}/{catálogo}/product/{slug}/
 *   destino          {SITE}/#/catalog/{negocio}/{sucursal}/{catálogo}/product/{slug}
 *
 * La regla es mecánica: mismo path, `s/` en vez de `#/`.
 *
 * Corre en dos lugares, sin dependencias (solo Node ≥ 18):
 *   1. en el deploy  (scripts/prerender-og.mjs lo importa)
 *   2. cada 15 min en el repo del sitio (GitHub Action, ver
 *      scripts/share-pages.workflow.yml) para que los productos nuevos
 *      tengan vista previa sin esperar a un deploy.
 *
 * CLI:  node share-pages.mjs --out <dir> [--config <share-config.json>]
 *   Config: { siteUrl, supabaseUrl, anonKey } — o por env SITE_URL /
 *   VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. La anon key es pública
 *   (ya viaja en el bundle de la app).
 */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const SHARE_DIR = 's'
const SITE_NAME = 'd1Mano'
const FALLBACK_DESCRIPTION =
  'Ventas mayoristas de primera mano. Productos, precios y novedades en d1Mano.'

/* ──────────────────────────────────────────
 * Datos
 * ────────────────────────────────────────── */

/** Índice de lo compartible (RPC pública cat_get_share_index). Reintenta: la red falla seguido. */
export async function fetchShareIndex({ supabaseUrl, anonKey }, attempts = 3) {
  let lastError
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/rpc/cat_get_share_index`, {
        method: 'POST',
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
          'Content-Type': 'application/json',
        },
        body: '{}',
        signal: AbortSignal.timeout(45_000),
      })
      if (!res.ok) throw new Error(`cat_get_share_index: HTTP ${res.status}`)
      const index = await res.json()
      if (!index || !Array.isArray(index.businesses) || !Array.isArray(index.products)) {
        throw new Error('cat_get_share_index: respuesta con forma inesperada')
      }
      await attachCatalogArt(index, supabaseUrl)
      return index
    } catch (err) {
      lastError = err
      await new Promise((r) => setTimeout(r, 1500 * (i + 1)))
    }
  }
  throw lastError
}

/* ──────────────────────────────────────────
 * Helpers
 * ────────────────────────────────────────── */

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const clip = (text, max = 180) => {
  const clean = String(text ?? '')
    .replace(/\s+/g, ' ')
    .trim()
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean
}

/* ──────────────────────────────────────────
 * Arte del catálogo — su icono sobre su color
 *
 * Un catálogo sin portada pero con icono o color se presenta con eso, en
 * vez de tomar prestada la foto de un producto cualquiera. Se dibuja como
 * SVG 1200×630 y el proxy de imágenes lo entrega como JPEG, que es lo que
 * las apps de mensajería saben mostrar.
 *
 * El dibujo del icono sale del almacén de librerías (bucket icon-libraries,
 * ver scripts/icons/publish-icon-library.mjs); el set propio de la app está
 * publicado ahí como la librería `d1mano`.
 * ────────────────────────────────────────── */
const OWN_ICON_LIBRARY = 'd1mano'
const HEX = /^#[0-9a-f]{6}$/i

function inkOn(hex) {
  const n = parseInt(hex.slice(1), 16)
  const luma = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
  return luma > 0.6 ? '#1e1e1e' : '#ffffff'
}

/** Trozo donde vive un nombre (igual que src/shared/icons/icon-library.ts). */
function shardOf(name, bounds) {
  let lo = 0
  let hi = bounds.length - 1
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1
    if (bounds[mid] <= name) lo = mid
    else hi = mid - 1
  }
  return lo
}

/** SVG 1200×630: icono (o inicial) centrado y el nombre debajo. */
export function catalogArtSvg({ name, accentColor, icon }) {
  const bg = HEX.test(accentColor ?? '') ? accentColor : '#1e1e1e'
  const ink = inkOn(bg)
  const label = name.length > 30 ? `${name.slice(0, 29).trimEnd()}…` : name
  const mark = icon
    ? `<svg x="440" y="105" width="320" height="320" viewBox="${esc(icon.viewBox)}" fill="none" color="${ink}">${icon.body.replace(/currentColor/gi, ink)}</svg>`
    : `<text x="600" y="375" font-size="300" font-weight="900" text-anchor="middle" fill="${ink}" font-family="DejaVu Sans, Arial, sans-serif">${esc(name.trim().charAt(0).toUpperCase())}</text>`
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">` +
    `<rect width="1200" height="630" fill="${bg}"/>` +
    mark +
    `<text x="600" y="530" font-size="58" font-weight="700" text-anchor="middle" fill="${ink}" font-family="DejaVu Sans, Arial, sans-serif">${esc(label)}</text>` +
    `</svg>`
  )
}

/** A cada catálogo sin portada pero con icono o color le cuelga `art` (el SVG).
 *  Si el almacén no responde, el catálogo se queda sin arte y la vista previa
 *  usa lo de antes: nunca tumba la generación. */
export async function attachCatalogArt(index, supabaseUrl) {
  const base = `${supabaseUrl}/storage/v1/object/public/icon-libraries`
  const cache = new Map()
  const getJson = (path) => {
    if (!cache.has(path)) {
      cache.set(
        path,
        fetch(`${base}/${path}`, { signal: AbortSignal.timeout(30_000) }).then((res) => {
          if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`)
          return res.json()
        }),
      )
    }
    return cache.get(path)
  }
  const loadIcon = async (ref) => {
    const at = ref.indexOf(':')
    const libraryId = at > 0 ? ref.slice(0, at) : OWN_ICON_LIBRARY
    const name = at > 0 ? ref.slice(at + 1) : ref
    const { libraries } = await getJson('index.v2.json')
    const library = libraries.find((l) => l.id === libraryId)
    if (!library) return null
    const shard = await getJson(
      `${library.id}/v${library.version}/${shardOf(name, library.bounds)}.json`,
    )
    const entry = shard[name]
    if (!entry) return null
    return typeof entry === 'string'
      ? { body: entry, viewBox: library.viewBox }
      : { body: entry[0], viewBox: entry[1] }
  }

  for (const biz of index.businesses) {
    for (const br of biz.branches ?? []) {
      for (const cat of br.catalogs ?? []) {
        if (cat.cover || (!cat.icon && !HEX.test(cat.accentColor ?? ''))) continue
        let icon = null
        if (cat.icon) {
          try {
            icon = await loadIcon(cat.icon)
          } catch (e) {
            console.warn(`[share-pages] icono ${cat.icon}: ${e.message}`)
          }
        }
        cat.art = catalogArtSvg({ name: cat.name, accentColor: cat.accentColor, icon })
      }
    }
  }
}

/** Imagen de vista previa: JPEG 1200×630 (el formato que todas las apps
 *  muestran; las fotos originales son WebP y de cualquier proporción).
 *  Recorte centrado en lo más llamativo de la foto. */
export function previewImage(src, siteUrl) {
  if (!src || !/^https?:\/\//.test(src)) return `${siteUrl}/icon.png`
  return `https://images.weserv.nl/?url=${encodeURIComponent(src)}&w=1200&h=630&fit=cover&a=attention&output=jpg&q=82`
}

const UNIT_LABEL = { unit: 'unidad', und: 'unidad', kg: 'kg', g: 'g', lb: 'lb', liter: 'L', L: 'L' }

function priceLabel(product) {
  if (product.price == null) return null
  const amount = Number(product.price).toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const unit = UNIT_LABEL[product.unit] ?? product.unit
  return `${product.currency ?? 'CUP'} ${amount}${unit ? ` / ${String(unit).toLowerCase()}` : ''}`
}

/* ──────────────────────────────────────────
 * Entradas: una por cada link compartible
 * ────────────────────────────────────────── */

/** @returns {Array<{path: string, title: string, description: string, image: string|null}>}
 *  `path` es el de la app, sin barra inicial: catalog/{negocio}/… */
export function buildEntries(index) {
  const entries = []
  const firstImageByCatalog = new Map()
  for (const p of index.products) {
    const key = `${p.business}/${p.branch}/${p.catalog}`
    if (p.image && !firstImageByCatalog.has(key)) firstImageByCatalog.set(key, p.image)
  }

  for (const biz of index.businesses) {
    const bizImage = biz.cover ?? biz.logo ?? null
    entries.push({
      path: `catalog/${biz.slug}`,
      title: `${biz.name} — ${SITE_NAME}`,
      description: clip(biz.description) || FALLBACK_DESCRIPTION,
      image: bizImage,
    })

    for (const br of biz.branches ?? []) {
      const branchPath = `catalog/${biz.slug}/${br.slug}`
      const branchImage = br.cover ?? bizImage
      entries.push({
        path: branchPath,
        title: `${br.name} — ${biz.name}`,
        description:
          clip([br.address, biz.description].filter(Boolean).join(' · ')) || FALLBACK_DESCRIPTION,
        image: branchImage,
      })

      for (const cat of br.catalogs ?? []) {
        entries.push({
          path: `${branchPath}/${cat.slug}`,
          title: `${cat.name} — ${biz.name}`,
          description:
            clip(cat.description) || `Catálogo de ${br.name} en ${SITE_NAME}: productos y precios.`,
          /* Lo suyo primero: portada, y si no su icono sobre su color (`art`).
           * Sin identidad, lo de siempre: la foto de su primer producto. */
          image:
            cat.cover ??
            (cat.art
              ? null
              : (firstImageByCatalog.get(`${biz.slug}/${br.slug}/${cat.slug}`) ?? branchImage)),
          art: cat.art ?? null,
        })
      }

      for (const flash of br.flashes ?? []) {
        const count = Number(flash.itemCount ?? 0)
        entries.push({
          path: `${branchPath}/flash/${flash.slug}`,
          title: `⚡ ${String(flash.title).trim()} — ${biz.name}`,
          description:
            clip(flash.description) ||
            `${count} producto${count === 1 ? '' : 's'} en venta flash en ${br.name}.`,
          image: flash.image ?? branchImage,
        })
      }
    }
  }

  const bizBySlug = new Map(index.businesses.map((b) => [b.slug, b]))
  for (const p of index.products) {
    if (!p.slug) continue
    const biz = bizBySlug.get(p.business)
    const price = priceLabel(p)
    entries.push({
      path: `catalog/${p.business}/${p.branch}/${p.catalog}/product/${p.slug}`,
      title: price ? `${String(p.name).trim()} — ${price}` : String(p.name).trim(),
      description:
        clip(p.description) || `Disponible en ${biz?.name ?? SITE_NAME}. Míralo en ${SITE_NAME}.`,
      image: p.image ?? biz?.cover ?? biz?.logo ?? null,
    })
  }
  return entries
}

/* ──────────────────────────────────────────
 * HTML
 * ────────────────────────────────────────── */

/** Página mínima: etiquetas para el crawler + salto a la app para la persona.
 *  El salto es por JS a propósito: los crawlers no lo ejecutan y se quedan
 *  con ESTAS etiquetas (un meta refresh los mandaría al index genérico). */
export function renderSharePage(entry, siteUrl) {
  const target = `${siteUrl}/#/${entry.path}`
  const shareUrl = `${siteUrl}/${SHARE_DIR}/${entry.path}/`
  const image = previewImage(entry.image, siteUrl)
  const title = esc(entry.title)
  const description = esc(entry.description)
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${esc(target)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${esc(shareUrl)}" />
    <meta property="og:image" content="${esc(image)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${title}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${esc(image)}" />
    <script>
      location.replace(${JSON.stringify(target)})
    </script>
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #f7f4f0; color: #1e1e1e; font-family: system-ui, sans-serif; text-align: center; padding: 24px; }
      a { color: #c83a32; font-weight: 700; }
    </style>
  </head>
  <body>
    <main>
      <h1 style="font-size: 20px; margin: 0 0 8px">${title}</h1>
      <p style="margin: 0 0 16px; color: #6b6b6b">${description}</p>
      <a href="${esc(target)}">Abrir en ${SITE_NAME}</a>
    </main>
  </body>
</html>
`
}

/* ──────────────────────────────────────────
 * Escritura
 * ────────────────────────────────────────── */

/** Regenera `<outDir>/s/` completo: lo borra y escribe una página por entrada
 *  (así lo que dejó de existir pierde su página). Devuelve las entradas. */
const ART_FILE = 'preview.svg'

function hashOf(text) {
  let hash = 5381
  for (let i = 0; i < text.length; i++) hash = ((hash << 5) + hash) ^ text.charCodeAt(i)
  return (hash >>> 0).toString(36)
}

export function writeSharePages(index, { outDir, siteUrl }) {
  const entries = buildEntries(index)
  const root = join(outDir, SHARE_DIR)
  rmSync(root, { recursive: true, force: true })
  for (const entry of entries) {
    const file = join(root, entry.path, 'index.html')
    mkdirSync(dirname(file), { recursive: true })
    if (entry.art) {
      /* El arte se publica junto a la página. `v` cambia con el contenido:
       * el proxy y las apps cachean por URL, y así un cambio de icono o de
       * color se ve sin esperar a que caduque nada. */
      writeFileSync(join(root, entry.path, ART_FILE), entry.art)
      entry.image = `${siteUrl}/${SHARE_DIR}/${entry.path}/${ART_FILE}?v=${hashOf(entry.art)}`
    }
    writeFileSync(file, renderSharePage(entry, siteUrl))
  }
  return entries
}

/* ──────────────────────────────────────────
 * CLI
 * ────────────────────────────────────────── */

function readConfig(args) {
  const flag = (name) => {
    const i = args.indexOf(name)
    return i >= 0 ? args[i + 1] : undefined
  }
  const configPath = flag('--config')
  const file =
    configPath && existsSync(configPath) ? JSON.parse(readFileSync(configPath, 'utf8')) : {}
  const config = {
    siteUrl: (process.env.SITE_URL ?? file.siteUrl ?? '').replace(/\/$/, ''),
    supabaseUrl: process.env.VITE_SUPABASE_URL ?? file.supabaseUrl,
    anonKey: process.env.VITE_SUPABASE_ANON_KEY ?? file.anonKey,
    outDir: flag('--out'),
  }
  const missing = Object.entries(config)
    .filter(([, v]) => !v)
    .map(([k]) => k)
  if (missing.length) {
    console.error(`[share-pages] Falta configurar: ${missing.join(', ')}`)
    process.exit(2)
  }
  return config
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const config = readConfig(process.argv.slice(2))
  /* Si la red falla NO se toca nada: las páginas anteriores siguen sirviendo.
   * Borrar primero y fallar después dejaría todos los links sin vista previa. */
  const index = await fetchShareIndex(config)
  const entries = writeSharePages(index, config)
  console.log(
    `[share-pages] ${entries.length} páginas en ${join(config.outDir, SHARE_DIR)} ` +
      `(${index.businesses.length} negocio(s), ${index.products.length} producto(s))`,
  )
}
