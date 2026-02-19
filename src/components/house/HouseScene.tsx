import { HouseSVG } from './HouseSVG'
import { ProductHotspot } from './ProductHotspot'
import { useDashboardStore } from '../../store/useDashboardStore'

export function HouseScene() {
  const { products, selectProduct } = useDashboardStore()

  return (
    <div className="relative w-full px-4">
      {/* SVG House illustration */}
      <div className="relative w-full">
        <HouseSVG />

        {/* Hotspot overlays - absolutely positioned over SVG */}
        {products.map((product) => (
          <ProductHotspot
            key={product.id}
            product={product}
            onClick={() => selectProduct(product.id)}
          />
        ))}
      </div>
    </div>
  )
}
