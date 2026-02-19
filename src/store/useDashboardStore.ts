import { create } from 'zustand'
import type { Product, ProductId, ScenarioKey } from '../types'
import { INITIAL_PRODUCTS } from '../data/products'
import { SCENARIOS } from '../data/scenarios'

interface DashboardStore {
  products: Product[]
  selectedProductId: ProductId | null
  activeScenario: ScenarioKey
  selectProduct: (id: ProductId) => void
  clearSelection: () => void
  setScenario: (key: ScenarioKey) => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  products: INITIAL_PRODUCTS.map((p) => ({
    ...p,
    connected: SCENARIOS.find((s) => s.key === 'partial')!.connectedIds.includes(p.id),
  })),
  selectedProductId: null,
  activeScenario: 'partial',

  selectProduct: (id) => set({ selectedProductId: id }),

  clearSelection: () => set({ selectedProductId: null }),

  setScenario: (key) =>
    set((state) => {
      const scenario = SCENARIOS.find((s) => s.key === key)!
      return {
        activeScenario: key,
        products: state.products.map((p) => ({
          ...p,
          connected: scenario.connectedIds.includes(p.id),
        })),
        selectedProductId: null,
      }
    }),
}))
