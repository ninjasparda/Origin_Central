import { HouseSVG } from './HouseSVG'
import { ProductHotspot } from './ProductHotspot'
import { useDashboardStore } from '../../store/useDashboardStore'
import { INITIAL_PRODUCTS } from '../../data/products'

interface HouseSceneProps {
  propertyId?: string
}

export function HouseScene({ propertyId }: HouseSceneProps) {
  const { products: storeProducts, properties, selectProduct } = useDashboardStore()

  // If propertyId is provided, compute products for that specific property
  // Otherwise use the store's current products (for backward compatibility)
  const property = propertyId ? properties.find((p) => p.id === propertyId) : undefined
  const products = propertyId
    ? (() => {
        if (!property) return storeProducts
        return INITIAL_PRODUCTS.map((p) => ({
          ...p,
          connected: property.connectedProductIds.includes(p.id),
        }))
      })()
    : storeProducts

  return (
    <div className="relative w-full px-4">
      {/* SVG House illustration */}
      <div className="relative w-full">
        <HouseSVG propertyType={property?.type} />

        {/* Hotspot overlays - absolutely positioned over SVG */}
        {products.map((product) => (
          <ProductHotspot
            key={product.id}
            product={product}
            onClick={() => selectProduct(product.id)}
            showPulse={property?.type === 'mass-market' || !property}
          />
        ))}
      </div>
    </div>
  )
}
