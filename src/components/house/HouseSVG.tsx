import { useDashboardStore } from '../../store/useDashboardStore'
import { PRODUCT_COLORS } from '../../utils/colors'

export function HouseSVG() {
  const products = useDashboardStore((s) => s.products)

  const getColor = (id: keyof typeof PRODUCT_COLORS) => {
    const product = products.find((p) => p.id === id)
    return product?.connected
      ? PRODUCT_COLORS[id].active
      : PRODUCT_COLORS[id].inactive
  }

  const solarColor = getColor('solar')
  const batteryColor = getColor('battery')
  const evColor = getColor('ev-charger')
  const internetColor = getColor('internet')
  const energyColor = getColor('energy-plan')
  const gasColor = getColor('gas')

  const isActive = (id: keyof typeof PRODUCT_COLORS) =>
    products.find((p) => p.id === id)?.connected ?? false

  return (
    <svg
      viewBox="0 0 400 460"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      style={{ display: 'block' }}
    >
      <defs>
        {/* Sky gradient — daylight blue */}
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8E6F7" />
          <stop offset="100%" stopColor="#E8F4FD" />
        </linearGradient>

        {/* Ground gradient — green grass */}
        <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5CB85C" />
          <stop offset="100%" stopColor="#4CAF50" />
        </linearGradient>

        {/* Solar shimmer */}
        <linearGradient id="solarShimmer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={solarColor} stopOpacity="0.6" />
          <stop offset="40%" stopColor={solarColor} stopOpacity="1" />
          <stop offset="100%" stopColor={solarColor} stopOpacity="0.6" />
          {isActive('solar') && (
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-1 0"
              to="1 0"
              dur="3s"
              repeatCount="indefinite"
            />
          )}
        </linearGradient>

        {/* Wall gradient — warm white */}
        <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FAFAF8" />
          <stop offset="100%" stopColor="#F5F0E8" />
        </linearGradient>

        {/* Roof gradient — warm grey */}
        <linearGradient id="roofGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9E9E9E" />
          <stop offset="100%" stopColor="#757575" />
        </linearGradient>

        {/* Battery glow */}
        <filter id="batteryGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip for house */}
        <clipPath id="roofClip">
          <polygon points="80,180 200,60 320,180" />
        </clipPath>
      </defs>

      {/* Sky background */}
      <rect width="400" height="460" fill="url(#skyGrad)" />

      {/* Clouds */}
      <g opacity="0.9">
        <ellipse cx="60" cy="45" rx="30" ry="16" fill="white" />
        <ellipse cx="45" cy="50" rx="20" ry="14" fill="white" />
        <ellipse cx="80" cy="52" rx="22" ry="12" fill="white" />
      </g>
      <g opacity="0.8">
        <ellipse cx="320" cy="35" rx="28" ry="14" fill="white" />
        <ellipse cx="305" cy="40" rx="18" ry="12" fill="white" />
        <ellipse cx="340" cy="42" rx="20" ry="11" fill="white" />
      </g>

      {/* Ground */}
      <rect x="0" y="360" width="400" height="100" fill="url(#groundGrad)" />

      {/* Ground line */}
      <line x1="0" y1="360" x2="400" y2="360" stroke="#4CAF50" strokeWidth="1" />

      {/* Driveway */}
      <polygon points="120,360 160,360 175,420 105,420" fill="#D0CBC2" />
      <line x1="140" y1="360" x2="140" y2="420" stroke="#BFB8B0" strokeWidth="1" strokeDasharray="6 4" />

      {/* House walls */}
      <rect x="80" y="180" width="240" height="180" fill="url(#wallGrad)" rx="2" stroke="#E0D8CC" strokeWidth="1" />

      {/* Wall detail lines */}
      <line x1="80" y1="220" x2="320" y2="220" stroke="#E8E0D8" strokeWidth="0.5" />
      <line x1="80" y1="260" x2="320" y2="260" stroke="#E8E0D8" strokeWidth="0.5" />
      <line x1="80" y1="300" x2="320" y2="300" stroke="#E8E0D8" strokeWidth="0.5" />
      <line x1="80" y1="340" x2="320" y2="340" stroke="#E8E0D8" strokeWidth="0.5" />

      {/* Roof */}
      <polygon
        points="70,185 200,55 330,185"
        fill="url(#roofGrad)"
        stroke="#616161"
        strokeWidth="1.5"
      />

      {/* Roof ridge */}
      <line x1="200" y1="55" x2="200" y2="185" stroke="#616161" strokeWidth="0.5" strokeDasharray="4 3" />

      {/* Roof tiles pattern */}
      {[70, 85, 100, 115, 130, 145, 160].map((y, row) => (
        Array.from({ length: 8 - row }, (_, col) => (
          <line
            key={`tile-${row}-${col}`}
            x1={70 + col * 37 + row * 18.5 + 18.5}
            y1={y + 15}
            x2={70 + col * 37 + row * 18.5 + 18.5 - 9}
            y2={y}
            stroke="#616161"
            strokeWidth="0.4"
            opacity="0.6"
          />
        ))
      ))}

      {/* Chimney */}
      <rect x="260" y="90" width="30" height="60" fill="#8D6E63" stroke="#795548" strokeWidth="1" />
      <rect x="256" y="86" width="38" height="8" fill="#795548" stroke="#6D4C41" strokeWidth="1" />
      {/* Smoke puffs */}
      <circle cx="275" cy="76" r="4" fill="#BDBDBD" opacity="0.5" />
      <circle cx="270" cy="64" r="5" fill="#BDBDBD" opacity="0.3" />
      <circle cx="278" cy="52" r="6" fill="#BDBDBD" opacity="0.2" />

      {/* Front door */}
      <rect x="168" y="290" width="44" height="70" rx="22" fill="#8D6E63" stroke="#795548" strokeWidth="1.5" />
      <rect x="171" y="293" width="38" height="64" rx="19" fill="#A1887F" />
      <circle cx="202" cy="327" r="3" fill="#FFD54F" />
      <line x1="202" y1="327" x2="202" y2="335" stroke="#FFC107" strokeWidth="1" />

      {/* Windows - left */}
      <rect x="95" y="205" width="55" height="45" rx="4" fill="#B3E5FC" stroke="#90CAF9" strokeWidth="1.5" />
      <rect x="98" y="208" width="22" height="39" rx="2" fill="#E1F5FE" />
      <rect x="125" y="208" width="22" height="39" rx="2" fill="#E1F5FE" />
      {/* Window frame cross */}
      <line x1="95" y1="227" x2="150" y2="227" stroke="#90CAF9" strokeWidth="1" />
      <line x1="122" y1="205" x2="122" y2="250" stroke="#90CAF9" strokeWidth="1" />
      {/* Window glow for energy plan */}
      <rect
        x="98"
        y="208"
        width="22"
        height="39"
        rx="2"
        fill={energyColor}
        opacity={isActive('energy-plan') ? 0.3 : 0}
        style={{ transition: 'opacity 0.7s, fill 0.7s' }}
      />
      <rect
        x="125"
        y="208"
        width="22"
        height="39"
        rx="2"
        fill={energyColor}
        opacity={isActive('energy-plan') ? 0.3 : 0}
        style={{ transition: 'opacity 0.7s, fill 0.7s' }}
      />

      {/* Windows - right */}
      <rect x="250" y="205" width="55" height="45" rx="4" fill="#B3E5FC" stroke="#90CAF9" strokeWidth="1.5" />
      <rect x="253" y="208" width="22" height="39" rx="2" fill="#E1F5FE" />
      <rect x="280" y="208" width="22" height="39" rx="2" fill="#E1F5FE" />
      <line x1="250" y1="227" x2="305" y2="227" stroke="#90CAF9" strokeWidth="1" />
      <line x1="277" y1="205" x2="277" y2="250" stroke="#90CAF9" strokeWidth="1" />
      <rect
        x="253"
        y="208"
        width="22"
        height="39"
        rx="2"
        fill={energyColor}
        opacity={isActive('energy-plan') ? 0.3 : 0}
        style={{ transition: 'opacity 0.7s, fill 0.7s' }}
      />
      <rect
        x="280"
        y="208"
        width="22"
        height="39"
        rx="2"
        fill={energyColor}
        opacity={isActive('energy-plan') ? 0.3 : 0}
        style={{ transition: 'opacity 0.7s, fill 0.7s' }}
      />

      {/* ===== SOLAR PANELS group ===== */}
      <g id="solar-panels" style={{ transition: 'all 0.7s' }}>
        {/* Panel frames */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect
              x={108 + i * 36}
              y={90 + i * 16}
              width="34"
              height="22"
              rx="2"
              fill={solarColor}
              opacity="0.9"
              style={{ transition: 'fill 0.7s' }}
            />
            {/* Cell grid */}
            <line
              x1={108 + i * 36 + 11}
              y1={90 + i * 16}
              x2={108 + i * 36 + 11}
              y2={90 + i * 16 + 22}
              stroke="white"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1={108 + i * 36 + 22}
              y1={90 + i * 16}
              x2={108 + i * 36 + 22}
              y2={90 + i * 16 + 22}
              stroke="white"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1={108 + i * 36}
              y1={90 + i * 16 + 11}
              x2={108 + i * 36 + 34}
              y2={90 + i * 16 + 11}
              stroke="white"
              strokeWidth="1"
              opacity="0.5"
            />
            {/* Shimmer overlay on active */}
            {isActive('solar') && (
              <rect
                x={108 + i * 36}
                y={90 + i * 16}
                width="34"
                height="22"
                rx="2"
                fill="url(#solarShimmer)"
                opacity="0.3"
              />
            )}
          </g>
        ))}
        {/* Sun when active */}
        {isActive('solar') && (
          <g opacity="0.9">
            <circle cx="360" cy="40" r="20" fill="#FFD54F" opacity="0.9" />
            <circle cx="360" cy="40" r="14" fill="#FFEB3B" opacity="0.95" />
            <line x1="360" y1="10" x2="360" y2="4" stroke="#FFD54F" strokeWidth="2" />
            <line x1="360" y1="76" x2="360" y2="70" stroke="#FFD54F" strokeWidth="2" />
            <line x1="330" y1="40" x2="324" y2="40" stroke="#FFD54F" strokeWidth="2" />
            <line x1="396" y1="40" x2="390" y2="40" stroke="#FFD54F" strokeWidth="2" />
            <line x1="339" y1="19" x2="334" y2="14" stroke="#FFD54F" strokeWidth="2" />
            <line x1="381" y1="61" x2="386" y2="66" stroke="#FFD54F" strokeWidth="2" />
            <line x1="339" y1="61" x2="334" y2="66" stroke="#FFD54F" strokeWidth="2" />
            <line x1="381" y1="19" x2="386" y2="14" stroke="#FFD54F" strokeWidth="2" />
          </g>
        )}
      </g>

      {/* ===== BATTERY UNIT group ===== */}
      <g id="battery-unit" style={{ transition: 'all 0.7s' }}>
        {/* Battery housing */}
        <rect
          x="298"
          y="255"
          width="36"
          height="80"
          rx="4"
          fill={batteryColor}
          opacity="0.9"
          style={{ transition: 'fill 0.7s' }}
        />
        {/* Battery terminal */}
        <rect x="310" y="250" width="12" height="6" rx="2" fill={batteryColor} opacity="0.7" />
        {/* Battery segments */}
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x="302"
            y={262 + i * 18}
            width="28"
            height="14"
            rx="2"
            fill="white"
            opacity="0.3"
          />
        ))}
        {/* Charge indicator */}
        {isActive('battery') && (
          <>
            <rect x="302" y="262" width="28" height="14" rx="2" fill={batteryColor} opacity="0.5" />
            <rect x="302" y="280" width="28" height="14" rx="2" fill={batteryColor} opacity="0.5" />
            <rect x="302" y="298" width="28" height="14" rx="2" fill={batteryColor} opacity="0.35" />
            {/* Lightning bolt */}
            <path
              d="M318 265 L312 277 L317 277 L311 291 L322 275 L317 275 Z"
              fill="white"
              opacity="0.9"
            />
          </>
        )}
        {/* Label */}
        <text x="316" y="347" textAnchor="middle" fontSize="8" fill={batteryColor} opacity="0.8">
          BATT
        </text>
      </g>

      {/* ===== EV CAR group ===== */}
      <g id="ev-car" style={{ transition: 'all 0.7s' }}>
        {/* Car body */}
        <rect x="20" y="320" width="120" height="45" rx="8" fill={evColor} opacity="0.85" style={{ transition: 'fill 0.7s' }} />
        {/* Car roof */}
        <rect x="38" y="298" width="84" height="28" rx="12" fill={evColor} opacity="0.75" style={{ transition: 'fill 0.7s' }} />
        {/* Windscreen */}
        <rect x="44" y="302" width="32" height="20" rx="4" fill="#E3F2FD" opacity="0.8" />
        {/* Rear window */}
        <rect x="86" y="302" width="28" height="20" rx="4" fill="#E3F2FD" opacity="0.8" />
        {/* Wheels */}
        <circle cx="48" cy="366" r="13" fill="#424242" />
        <circle cx="48" cy="366" r="8" fill="#616161" />
        <circle cx="48" cy="366" r="3" fill={evColor} opacity="0.8" />
        <circle cx="112" cy="366" r="13" fill="#424242" />
        <circle cx="112" cy="366" r="8" fill="#616161" />
        <circle cx="112" cy="366" r="3" fill={evColor} opacity="0.8" />
        {/* Headlights */}
        <rect x="20" y="328" width="8" height="6" rx="2" fill={isActive('ev-charger') ? '#FFF9C4' : '#BDBDBD'} opacity="0.9" />
        <rect x="20" y="341" width="8" height="6" rx="2" fill={isActive('ev-charger') ? '#FFF9C4' : '#BDBDBD'} opacity="0.9" />
        {/* Taillights */}
        <rect x="132" y="328" width="8" height="6" rx="2" fill={isActive('ev-charger') ? '#FF3333' : '#BDBDBD'} opacity="0.7" />
        {/* Charge port */}
        <rect x="20" y="337" width="5" height="8" rx="1" fill="#E0E0E0" stroke={evColor} strokeWidth="1" opacity="0.9" />
        {/* Charge cable when active */}
        {isActive('ev-charger') && (
          <>
            <line x1="15" y1="341" x2="5" y2="341" stroke={evColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="5" y1="341" x2="5" y2="360" stroke={evColor} strokeWidth="2" strokeLinecap="round" />
            <rect x="2" y="356" width="6" height="8" rx="1" fill={evColor} opacity="0.8" />
          </>
        )}
        {/* EV charging bolt */}
        {isActive('ev-charger') && (
          <path
            d="M78 308 L72 319 L77 319 L71 330 L83 316 L78 316 Z"
            fill="white"
            opacity="0.9"
          />
        )}
      </g>

      {/* ===== WIFI ICON group ===== */}
      <g id="wifi-icon" style={{ transition: 'all 0.7s' }}>
        {/* Antenna/router on roof */}
        <rect x="308" y="155" width="6" height="20" rx="2" fill={internetColor} opacity="0.9" style={{ transition: 'fill 0.7s' }} />
        <rect x="302" y="173" width="18" height="8" rx="2" fill={internetColor} opacity="0.85" style={{ transition: 'fill 0.7s' }} />
        {/* Wifi arcs */}
        <path
          d="M296 160 Q311 146 326 160"
          stroke={internetColor}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity={isActive('internet') ? 0.9 : 0.4}
          style={{ transition: 'stroke 0.7s, opacity 0.7s' }}
        />
        <path
          d="M300 153 Q311 141 322 153"
          stroke={internetColor}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity={isActive('internet') ? 0.7 : 0.3}
          style={{ transition: 'stroke 0.7s, opacity 0.7s' }}
        />
        <path
          d="M304 147 Q311 138 318 147"
          stroke={internetColor}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity={isActive('internet') ? 0.5 : 0.2}
          style={{ transition: 'stroke 0.7s, opacity 0.7s' }}
        />
        {/* Signal dot */}
        <circle cx="311" cy="162" r="3" fill={internetColor} opacity={isActive('internet') ? 0.9 : 0.4} style={{ transition: 'fill 0.7s, opacity 0.7s' }} />
      </g>

      {/* ===== SMART METER group ===== */}
      <g id="smart-meter" style={{ transition: 'all 0.7s' }}>
        {/* Meter box */}
        <rect x="172" y="258" width="56" height="32" rx="3" fill={energyColor} opacity="0.2" style={{ transition: 'fill 0.7s' }} />
        <rect x="175" y="261" width="50" height="26" rx="2" fill="#F5F5F5" opacity="0.9" />
        {/* Digital display */}
        <rect x="178" y="264" width="44" height="14" rx="1" fill={energyColor} opacity={isActive('energy-plan') ? 0.3 : 0.05} style={{ transition: 'fill 0.7s' }} />
        {/* Reading digits */}
        {isActive('energy-plan') && (
          <text x="200" y="274" textAnchor="middle" fontSize="7" fill="#424242" fontFamily="monospace" opacity="0.9">
            18.4 kWh
          </text>
        )}
        {/* LEDs */}
        <circle cx="183" cy="282" r="2" fill={isActive('energy-plan') ? energyColor : '#BDBDBD'} opacity="0.9" />
        <circle cx="190" cy="282" r="2" fill={isActive('energy-plan') ? '#22C55E' : '#BDBDBD'} opacity="0.9" />
        {/* Lightning bolt icon */}
        <path
          d="M208 263 L204 270 L207 270 L203 279 L212 269 L209 269 Z"
          fill={energyColor}
          opacity={isActive('energy-plan') ? 0.8 : 0.3}
          style={{ transition: 'opacity 0.7s' }}
        />
      </g>

      {/* ===== GAS PIPES group ===== */}
      <g id="gas-pipes" style={{ transition: 'all 0.7s' }}>
        {/* Main gas pipe */}
        <rect x="168" y="360" width="12" height="35" rx="3" fill={gasColor} opacity="0.8" style={{ transition: 'fill 0.7s' }} />
        {/* Horizontal pipe */}
        <rect x="150" y="375" width="30" height="8" rx="3" fill={gasColor} opacity="0.8" style={{ transition: 'fill 0.7s' }} />
        {/* Pipe joints */}
        <circle cx="168" cy="375" r="5" fill={gasColor} opacity="0.9" style={{ transition: 'fill 0.7s' }} />
        <circle cx="150" cy="379" r="4" fill={gasColor} opacity="0.7" style={{ transition: 'fill 0.7s' }} />
        {/* Gas meter box */}
        <rect x="143" y="380" width="20" height="15" rx="2" fill="#F5F5F5" stroke={gasColor} strokeWidth="1" opacity="0.85" style={{ transition: 'stroke 0.7s' }} />
        {/* Flame icon */}
        {isActive('gas') && (
          <path
            d="M153 392 C153 389 156 387 156 384 C157 386 157 388 158 389 C159 387 158 385 158 383 C160 385 161 388 160 391 C159 393 157 394 155 394 C153 394 153 393 153 392 Z"
            fill={gasColor}
            opacity="0.9"
          />
        )}
        {/* Pipe going left underground */}
        <path
          d="M150 379 Q130 379 125 395"
          stroke={gasColor}
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
          style={{ transition: 'stroke 0.7s' }}
        />
      </g>

      {/* House shadow/foundation */}
      <rect x="70" y="358" width="260" height="4" rx="2" fill="#4CAF50" opacity="0.6" />

      {/* Trees */}
      <g opacity="0.9">
        {/* Left tree */}
        <rect x="340" y="315" width="8" height="50" fill="#795548" />
        <ellipse cx="344" cy="308" rx="20" ry="28" fill="#388E3C" />
        <ellipse cx="344" cy="300" rx="14" ry="20" fill="#4CAF50" />
        {/* Right tree (small) */}
        <rect x="375" y="335" width="6" height="28" fill="#795548" />
        <ellipse cx="378" cy="328" rx="14" ry="18" fill="#388E3C" />
      </g>

      {/* Grass patches */}
      <ellipse cx="200" cy="362" rx="80" ry="6" fill="#4CAF50" opacity="0.5" />
      <ellipse cx="340" cy="362" rx="40" ry="5" fill="#4CAF50" opacity="0.4" />
    </svg>
  )
}
