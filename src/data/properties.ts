import type { Property } from '../types'

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'property-1',
    name: 'Home',
    type: 'mass-market',
    connectedProductIds: ['solar', 'ev-charger', 'energy-plan', 'gas'],
  },
  {
    id: 'property-2',
    name: 'Beach House',
    type: 'ces',
    connectedProductIds: ['solar', 'battery', 'energy-plan'],
  },
]

