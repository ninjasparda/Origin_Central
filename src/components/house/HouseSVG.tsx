import { useDashboardStore } from '../../store/useDashboardStore'

const OVERLAYS = {
  solar:          { x: 395,  y: 200, w: 515, h: 320 },
  battery:        { x: 10,   y: 510, w: 215, h: 410 },
  'ev-charger':   { x: 920,  y: 470, w: 616, h: 520 },
  internet:       { x: 570,  y: 0,   w: 310, h: 230 },
  'energy-plan':  { x: 385,  y: 545, w: 190, h: 190 },
  gas:            { x: 210,  y: 710, w: 345, h: 255 },
} as const

type ProductId = keyof typeof OVERLAYS

export function HouseSVG() {
  const products = useDashboardStore((s) => s.products)
  const isActive = (id: ProductId) =>
    products.find((p) => p.id === id)?.connected ?? false

  const ids = Object.keys(OVERLAYS) as ProductId[]

  return (
    <svg
      viewBox="0 0 1536 1024"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      style={{ display: 'block' }}
    >
      <defs>
        {ids.map((id) => {
          const { x, y, w, h } = OVERLAYS[id]
          return (
            <clipPath key={id} id={`clip-${id}`}>
              <rect x={x} y={y} width={w} height={h} />
            </clipPath>
          )
        })}
      </defs>

      {/* Grey-out base — always visible */}
      <image href="/house-base.svg" width="1536" height="1024" />

      {/* Lit-up layer — one clipped copy per product, fades in when active */}
      {ids.map((id) => (
        <image
          key={id}
          href="/house-lit.svg"
          width="1536" height="1024"
          clipPath={`url(#clip-${id})`}
          style={{ opacity: isActive(id) ? 1 : 0, transition: 'opacity 0.5s' }}
        />
      ))}
    </svg>
  )
}
