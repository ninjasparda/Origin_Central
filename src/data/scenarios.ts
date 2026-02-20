import type { Scenario } from '../types'

export const SCENARIOS: Scenario[] = [
  {
    key: 'all-on',
    label: 'All On',
    connectedIds: ['solar', 'battery', 'ev-charger', 'internet', 'energy-plan', 'gas'],
  },
  {
    key: 'partial',
    label: 'Partial',
    connectedIds: ['solar', 'ev-charger', 'energy-plan', 'gas'],
  },
  {
    key: 'all-off',
    label: 'New Customer',
    connectedIds: [],
  },
  {
    key: 'default',
    label: 'Default',
    connectedIds: ['solar', 'ev-charger', 'energy-plan', 'gas'],
  },
]
