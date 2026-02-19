import { Card, Text } from '@origin-digital/ods-core'
import { AppShell } from './components/layout/AppShell'
import { Header } from './components/layout/Header'
import { ScenarioSwitcher } from './components/demo/ScenarioSwitcher'
import { HouseScene } from './components/house/HouseScene'
import { ActiveModal } from './components/modals/ActiveModal'
import { useDashboardStore } from './store/useDashboardStore'
import { PRODUCT_COLORS } from './utils/colors'

function ProductLegend() {
  const products = useDashboardStore((s) => s.products)

  return (
    <div className="px-5 py-3">
      <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">
        Your Products
      </p>
      <div className="grid grid-cols-3 gap-2">
        {products.map((product) => {
          const color = product.connected
            ? PRODUCT_COLORS[product.id as keyof typeof PRODUCT_COLORS].active
            : '#C8C8D8'
          return (
            <button
              key={product.id}
              onClick={() => useDashboardStore.getState().selectProduct(product.id)}
              className="transition-all active:scale-95"
            >
              <Card padding="small">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <Text variant="body-small" tone={product.connected ? 'neutral' : 'neutralLight'}>
                    {product.name}
                  </Text>
                </div>
              </Card>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function App() {
  return (
    <AppShell>
      <Header />
      <ScenarioSwitcher />
      <HouseScene />
      <ProductLegend />
      <ActiveModal />
    </AppShell>
  )
}

export default App
