export type ProductId =
  | 'solar'
  | 'battery'
  | 'ev-charger'
  | 'internet'
  | 'energy-plan'
  | 'gas'

export type ScenarioKey = 'all-on' | 'partial' | 'all-off'

export interface UsageDataPoint {
  label: string
  value: number
  unit: string
}

export interface ProductStats {
  primaryMetric: string
  primaryLabel: string
  secondaryMetric?: string
  secondaryLabel?: string
  savings?: string
  usageData: UsageDataPoint[]
  chartUnit: string
}

export interface CrossSellOffer {
  tagline: string
  headline: string
  bullets: string[]
  ctaLabel: string
  saving?: string
}

export interface Product {
  id: ProductId
  name: string
  icon: string
  connected: boolean
  colors: {
    active: string
    inactive: string
    pulse: string
  }
  hotspotPosition: {
    top: string
    left: string
    width: string
    height: string
  }
  svgGroupId: string
  stats: ProductStats
  crossSellOffer: CrossSellOffer
}

export interface Scenario {
  key: ScenarioKey
  label: string
  connectedIds: ProductId[]
}
