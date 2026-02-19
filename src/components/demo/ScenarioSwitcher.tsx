import { Button } from '@origin-digital/ods-core'
import { useDashboardStore } from '../../store/useDashboardStore'
import { SCENARIOS } from '../../data/scenarios'
import type { ScenarioKey } from '../../types'

export function ScenarioSwitcher() {
  const { activeScenario, setScenario } = useDashboardStore()

  return (
    <div className="px-5 pb-4 pt-3">
      <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
        Demo Scenario
      </p>
      <div className="flex gap-2">
        {SCENARIOS.map((scenario) => {
          const isActive = activeScenario === scenario.key
          return (
            <Button
              key={scenario.key}
              variant={isActive ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setScenario(scenario.key as ScenarioKey)}
              data-id={`scenario-${scenario.key}`}
            >
              {scenario.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
