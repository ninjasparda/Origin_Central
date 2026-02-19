import { motion } from 'framer-motion'
import type { Product } from '../../types'

interface ProductHotspotProps {
  product: Product
  onClick: () => void
}

export function ProductHotspot({ product, onClick }: ProductHotspotProps) {
  const { hotspotPosition, connected, colors, name } = product

  return (
    <button
      onClick={onClick}
      aria-label={`${name} - ${connected ? 'active, tap for details' : 'inactive, tap for offer'}`}
      className="absolute flex items-center justify-center focus:outline-none"
      style={{
        top: hotspotPosition.top,
        left: hotspotPosition.left,
        width: hotspotPosition.width,
        height: hotspotPosition.height,
      }}
    >
      {/* Pulse ring for active products */}
      {connected && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: `2px solid ${colors.pulse}`,
            borderRadius: '50%',
          }}
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Invisible tap target with subtle hover effect */}
      <motion.div
        className="w-full h-full rounded-lg"
        style={{
          backgroundColor: connected ? `${colors.active}10` : 'transparent',
        }}
        whileHover={{
          backgroundColor: `${colors.active}20`,
          scale: 1.05,
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.15 }}
      />
    </button>
  )
}
