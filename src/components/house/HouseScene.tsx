import { Heading,Stack, Text } from '@origin-digital/ods-core'
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
    <div className="relative w-full">
      {/* SVG House illustration */}
      <div className="relative w-full">
        <HouseSVG propertyType={property?.type} />

        {/* Greeting overlay - top left corner */}
        <div className="absolute top-4 left-5 z-10">
            <Stack space="small">
                <Heading variant="h3" component="p">
                    Good morning,
                </Heading>
                <Heading variant="h2" component="p">Sam</Heading>
            </Stack>


        </div>

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
