import { Sheet } from '@origin-digital/ods-core'
import { useDashboardStore } from '../../store/useDashboardStore'
import { ProductDetailModal } from './ProductDetailModal'
import { CrossSellModal } from './CrossSellModal'

export function ActiveModal() {
  const { products, selectedProductId, clearSelection } = useDashboardStore()
  const product = products.find((p) => p.id === selectedProductId)

  return (
    <Sheet
      id="product-sheet"
      title={product?.name ?? ''}
      open={!!selectedProductId}
      onClose={clearSelection}
    >
      {product && (
        product.connected
          ? <ProductDetailModal product={product} />
          : <CrossSellModal product={product} />
      )}
    </Sheet>
  )
}
