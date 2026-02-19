import type { UsageDataPoint } from '../../types'

interface UsageChartProps {
  data: UsageDataPoint[]
  unit: string
  activeColor: string
}

export function UsageChart({ data, unit, activeColor }: UsageChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1)
  const barWidth = 100 / (data.length * 2 - 1)

  return (
    <div className="w-full">
      <svg viewBox="0 0 200 80" width="100%" className="overflow-visible">
        <defs>
          <linearGradient id={`barGrad-${unit}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={activeColor} stopOpacity="1" />
            <stop offset="100%" stopColor={activeColor} stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((frac) => (
          <line
            key={frac}
            x1="0"
            y1={60 - frac * 55}
            x2="200"
            y2={60 - frac * 55}
            stroke="#333350"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />
        ))}

        {/* Bars */}
        {data.map((point, i) => {
          const barH = (point.value / maxValue) * 55
          const x = i * barWidth * 2
          const isLast = i === data.length - 1

          return (
            <g key={i}>
              <rect
                x={`${x}%`}
                y={60 - barH}
                width={`${barWidth}%`}
                height={barH}
                rx="2"
                fill={isLast ? `url(#barGrad-${unit})` : activeColor}
                opacity={isLast ? 1 : 0.5}
              />
              {/* Value label on last bar */}
              {isLast && (
                <text
                  x={`${x + barWidth / 2}%`}
                  y={60 - barH - 3}
                  textAnchor="middle"
                  fontSize="5"
                  fill={activeColor}
                  opacity="0.9"
                >
                  {point.value}
                </text>
              )}
            </g>
          )
        })}

        {/* X-axis labels */}
        {data.map((point, i) => (
          <text
            key={i}
            x={`${i * barWidth * 2 + barWidth / 2}%`}
            y="72"
            textAnchor="middle"
            fontSize="6"
            fill="#9B9BB5"
          >
            {point.label}
          </text>
        ))}

        {/* Unit label */}
        <text x="200" y="72" textAnchor="end" fontSize="6" fill="#9B9BB5" opacity="0.7">
          {unit}
        </text>
      </svg>
    </div>
  )
}
