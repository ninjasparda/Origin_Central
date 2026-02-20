import { create } from 'zustand'
import type { Product, ProductId, ScenarioKey, Property } from '../types'
import { INITIAL_PRODUCTS } from '../data/products'
import { SCENARIOS } from '../data/scenarios'
import { INITIAL_PROPERTIES } from '../data/properties'

interface DashboardStore {
  products: Product[]
  selectedProductId: ProductId | null
  activeScenario: ScenarioKey
  properties: Property[]
  activePropertyId: string
  selectProduct: (id: ProductId) => void
  clearSelection: () => void
  setScenario: (key: ScenarioKey) => void
  setActiveProperty: (propertyId: string) => void
  addProperty: (property: Property) => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  products: INITIAL_PRODUCTS.map((p) => ({
    ...p,
    connected: SCENARIOS.find((s) => s.key === 'default')!.connectedIds.includes(p.id),
  })),
  selectedProductId: null,
  activeScenario: 'default',
  properties: INITIAL_PROPERTIES,
  activePropertyId: INITIAL_PROPERTIES[0].id,

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

  setActiveProperty: (propertyId) =>
    set((state) => {
      const property = state.properties.find((p) => p.id === propertyId)
      if (!property) return state
      return {
        activePropertyId: propertyId,
        products: state.products.map((p) => ({
          ...p,
          connected: property.connectedProductIds.includes(p.id),
        })),
        selectedProductId: null,
      }
    }),

  addProperty: (property) =>
    set((state) => ({
      properties: [...state.properties, property],
    })),
}))
