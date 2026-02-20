import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import type { PropertyType } from '../../types'

interface HouseSVGProps {
  propertyType?: PropertyType
}

export function HouseSVG({ propertyType }: HouseSVGProps) {
  // Use Lottie animation for mass-market, static SVG for CES
  if (propertyType === 'ces') {
    return (
      <img
        src="/hackathon-static-2.svg"
        alt="Your home"
        className="w-full block"
        draggable={false}
      />
    )
  }

  return (
    <DotLottieReact
      src="/hackathon-animated.lottie"
      loop
      autoplay
      style={{ width: '300%', display: 'block', marginLeft: '-100%' }}
    />
  )
}

